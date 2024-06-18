import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import unidecode from "unidecode";

// [GET] /search/result
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;
  const unidecodeText: string = unidecode(keyword);
  const keywordSlug = unidecodeText.replace(/\s+/g, "-");
  const keywordSlugRegex = new RegExp(keywordSlug, "i");

  const keywordRegex = new RegExp(keyword, "i");
  const songsDetail = [];
  if (keyword) {
    const songs = await Song.find({
      $or: [{ slug: keywordSlugRegex }, { title: keywordRegex }],
      deleted: false,
      status: "active",
    }).select("avatar title singerId like slug");

    for (const song of songs) {
      const singer = await Singer.findOne({
        _id: song.singerId,
        deleted: false,
      }).select("fullName");

      songsDetail.push({
        id: song.id,
        avatar: song.avatar,
        title: song.title,
        like: song.like,
        slug: song.slug,
        singer: {
          fullName: singer.fullName,
        },
      });
    }
  }

  const type = req.params.type;
  if (type == "result") {
    res.render("./client/pages/search/result", {
      pageTitle: "Kết quả tìm kiếm",
      songs: songsDetail,
    });
  } else {
    res.json({
      code: 200,
      songs: songsDetail,
    });
  }
};
