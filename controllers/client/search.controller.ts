import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /search/result
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;
  if (!keyword) {
    res.send("Vui long gui kem keyword");
  }
  const find = {};
  const keywordRegex = new RegExp(keyword, "i");

  const songs = await Song.find({
    title: keywordRegex,
    deleted: false,
    status: "active",
  }).select("avatar title singerId like slug");

  for (const song of songs) {
    const singer = await Singer.findOne({
      _id: song.singerId,
      deleted: false,
    }).select("fullName");
    song["singer"] = singer;
  }

  res.render("./client/pages/search/result", {
    pageTitle: "Kết quả tìm kiếm",
    songs: songs,
  });
};
