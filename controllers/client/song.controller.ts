import { Request, Response } from "express";
import Singer from "../../models/singer.model";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";

// [GET] /songs/:slugTopic
export const index = async (req: Request, res: Response) => {
  try {
    const slugTopic = req.params.slugTopic;
    const topic = await Topic.findOne({
      slug: slugTopic,
      deleted: false,
    });

    const songs = await Song.find({
      topicId: topic.id,
      deleted: false,
      status: "active",
    }).select("title avatar singerId like slug");
    for (const song of songs) {
      const singer = await Singer.findOne({
        _id: song.singerId,
        deleted: false,
      });
      song["singerName"] = singer.fullName;
    }

    res.render("./client/pages/songs/index", {
      pageTitle: "Bài hát",
      songs: songs,
      topic: topic,
    });
  } catch (error) {
    console.log(error);
    return;
  }
};

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  try {
    const slugSong = req.params.slugSong;
    const song = await Song.findOne({
      slug: slugSong,
      deleted: false,
    });
    const topic = await Topic.findOne({
      _id: song.topicId,
      deleted: false,
    }).select("title");

    const singer = await Singer.findOne({
      _id: song.singerId,
      deleted: false,
    }).select("fullName");

    res.render("./client/pages/songs/detail", {
      pageTitle: topic.title,
      song: song,
      topic: topic,
      singer: singer,
    });
  } catch (error) {
    console.log(error);
  }
};
