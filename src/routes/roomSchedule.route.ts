import { Router, Response, Request, json } from "express";
import { roomScheduleController } from "../controller/roomSchedule.controller";

export const roomScheduleRouter = Router()
roomScheduleRouter.use(json())

roomScheduleRouter.get("/events", async (req, res) => {
  const test = await roomScheduleController.fetchRoom()
  console.log(JSON.stringify( test.data))
  res.send(test.data)
})
