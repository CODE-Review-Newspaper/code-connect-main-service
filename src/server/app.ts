import express from "express";
import { roomScheduleRouter } from "../routes/roomSchedule.route";

export const app = express();

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.send("works");
});

app.use(roomScheduleRouter);
