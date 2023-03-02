import axios from "axios";
import { prisma } from "../connection/connection";
import dayjs from "dayjs";

const accessToken = "ya29.a0AVvZVsqRx3eeQ1sbDS1tFblCeUdKWJ0zDYrkrV1gWTcNoSmHOVhglufS6SDkEFi_2aP_eq5bnGEKIWG-Mig6X5bvavJWeRBAy7VBEdG86et1ZOkHFhN4cBn6qczsJNqIyY9NPVUXewBYS3-wN8VFAOMgeLGqTVU5aCgYKAYMSARMSFQGbdwaIArSNZ93wJYVIWQ7gQjl8_A0167"



export const roomScheduleController = {
  fetchRoom: async () => {
    const url = 'https://www.googleapis.com/calendar/v3/freeBusy'
    const data = {
      items: [
        {
          id: 'c_1889sg0kntgi2hllj05ckqp121enm@resource.calendar.google.com'
        }
      ],
      timeMin: dayjs(),
      timeMax: dayjs().add(1, "day")
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    }
    const res = await axios.post(url, data, config)
    return res
  }

}