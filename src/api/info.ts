import Express from "express";
import fetchData from "./fetchData.js";
import { renderCard } from "../scripts/drawCard/card.js";

export default async (req: Express.Request, res: Express.Response) => {
  const { user, date } = req.query;

  let userInfo = undefined

  user && (userInfo = await fetchData(user as string, date))

  if(userInfo){
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(renderCard(userInfo));
  }
}