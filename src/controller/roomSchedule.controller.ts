import axios, { AxiosError } from "axios";
import { prisma } from "../connection/connection";
import dayjs from "dayjs";
import {
  GetGoogleResourceSchedulesRequest,
  GoogleResourceScheduleResponse,
} from "../data/google.data";
import { BookableRoomEntity, rooms } from "../data/rooms.data";
import { ROOM_SCHEDULES_FETCH_TIME_DAYS } from "../data/time.data";

const data: GetGoogleResourceSchedulesRequest = {
  items: [
    {
      id: "c_1889sg0kntgi2hllj05ckqp121enm@resource.calendar.google.com",
    },
  ],
  timeMin: dayjs().startOf("day").toDate(),
  timeMax: dayjs().endOf("day").add(7, "days").toDate(),
};

// https://developers.google.com/oauthplayground/?code=4/0AWtgzh6R-thF5uiC62xpwh-6zxcyJ3Lr85ctV8sINOu0JzaSOmy_W-rI3vqWSQMf4gVs0A&scope=https://www.googleapis.com/auth/calendar
const accessToken =
  "ya29.a0AVvZVspQDusLx1wLR05DvZvYyHi6imDy3zht75VlPkmK7wojhyUDksV-mInQCxcwQo0-meSBaynjVhJp5vy9nJPDiOu5kmoYim-wVeD9qiiHVYrC_Lq5ndy_syfEft8c5OdtHMW-DNCQA738EZo_Rtfwqs4ysv0aCgYKAU0SARASFQGbdwaI7N-aNoVHgkKoTNByG0Oz_w0166";

export const roomScheduleController = {
  fetchRoomSchedules: async () => {
    let numOk = 0;
    let numErrors = 0;

    const newRooms = await Promise.all(
      Object.entries(rooms).map(async ([key, room]) => {
        if (!(room.type === "ROOM" && ["BOOKABLE"].includes(room.bookable))) {
          return [key, room] as const;
        }

        const newBody: GetGoogleResourceSchedulesRequest = {
          items: [
            {
              id: (room as BookableRoomEntity).email,
            },
          ],
          timeMin: dayjs().startOf("day").toDate(),
          timeMax: dayjs()
            .endOf("day")
            .add(ROOM_SCHEDULES_FETCH_TIME_DAYS, "days")
            .toDate(),
        };
        const [error, busyTimes] =
          await roomScheduleController._checkRoomAvailability(newBody);

        if (error != null) {
          numErrors++;
          console.error(error.response.data);
          return [key, room] as const;
        }
        const newRoom = {
          ...room,
          busyTimes,
        };
        numOk++;

        return [key, newRoom] as const;
      })
    );
    const newRoomsObj = Object.fromEntries(newRooms);

    if (numOk === 0 && numErrors > 0) {
      console.error("failed to getBusyTimeOfRooms");

      return [new Error(), newRoomsObj] as const;
    }
    return [null, newRoomsObj] as const;
  },
  _checkRoomAvailability: async (data: any) => {
    const url = "https://www.googleapis.com/calendar/v3/freeBusy";

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const res = await axios.post(url, data, config);

      const roomData: GoogleResourceScheduleResponse = res.data;

      const email = data.items[0].id;

      const roomCalendar = roomData?.calendars?.[email];

      if (roomCalendar == null)
        return [`Failed to find calendar for room: "${email}"`, null] as const;

      const roomBusyTimes = roomCalendar.busy;

      return [null, roomBusyTimes] as const;
    } catch (error: any) {
      return [error, null] as const;
    }
  },
};
