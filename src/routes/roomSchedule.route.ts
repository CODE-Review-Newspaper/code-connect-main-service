import { Router, Response, Request, json } from "express";
import { roomScheduleController } from "../controller/roomSchedule.controller";
import { OAuth2Client } from "google-auth-library";
import {
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from "../secrets";

const oauthclient = new OAuth2Client(GOOGLE_CLIENT_ID);

export const roomScheduleRouter = Router();
roomScheduleRouter.use(json());

roomScheduleRouter.get("/events", async (req, res) => {
  const header = req.headers;

  const authorization = req.headers.authorization;

  if (authorization == null) res.status(401).send("Unauthenticated");

  const [error, userInfo] = await validateGoogleAuth(header.idtoken as string);

  if (error != null) res.status(403).send("Unauthorized");

  res.status(200).send("Success");

  // const [error, roomSchedule] = await roomScheduleController.fetchRoomSchedules()

  // if (error != null)
  //   console.log(error)
  // res.send(roomSchedule)
});

const validateGoogleAuth = async (idToken: string) => {
  try {
    const ticket = await oauthclient.verifyIdToken({
      idToken: idToken,
      audience: [
        GOOGLE_CLIENT_ID!,
        GOOGLE_IOS_CLIENT_ID!,
        GOOGLE_ANDROID_CLIENT_ID!,
      ],
    });
    const payload = ticket.getPayload();
    const userId = payload!["sub"];
    return [null, payload] as const;
  } catch (error) {
    return [error, null] as const;
  }
};
