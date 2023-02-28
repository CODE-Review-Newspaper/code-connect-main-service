import express from "express";

export const app = express();

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.send("works")
})

