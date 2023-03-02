import { test, expect } from "vitest";
import { roomScheduleController } from "../controller/roomSchedule.controller";

test("getRoomSchedule", async () => {
  const res = await roomScheduleController.fetchRoomSchedules();
  console.log(res);
  expect(res).toBe("");
});
