import { Request, Response } from "express";
import Singer from "../../models/singer.model";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import FavoriteSong from "../../models/favorite-song.model";

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

// [PATCH] /songs/feelings/:status/:idSong
export const feelings = async (req: Request, res: Response) => {
  try {
    const { status, idSong } = req.params;
    const song = await Song.findOne({
      _id: idSong,
      deleted: false,
      status: "active",
    });
    const updateLike = status == "like" ? song.like + 1 : song.like - 1;

    await Song.updateOne(
      {
        _id: idSong,
        deleted: false,
        status: "active",
      },
      {
        like: updateLike,
      }
    );
    res.json({
      code: 200,
      like: updateLike,
    });
  } catch (error) {
    res.json({
      code: 400,
      error: error,
    });
  }
};

// [GET] /songs/favorite
export const favorite = async (req: Request, res: Response) => {
  const favoriteSongs = await FavoriteSong.find({
    deleted: false,
  });
  for (const item of favoriteSongs) {
    const song = await Song.findOne({
      _id: item.songId,
      deleted: false,
      status: "active",
    }).select("-lyrics");
    const singer = await Singer.findOne({
      _id: song.singerId,
      deleted: false,
    }).select("fullName");
    item["song"] = song;
    item["singer"] = singer;
  }

  res.render("./client/pages/songs/favorite", {
    pageTitle: "Bài hát yêu thích",
    favoriteSongs: favoriteSongs,
  });
};

// [PATCH] /songs/favorite/:status/:idSong
export const favoritePatch = async (req: Request, res: Response) => {
  try {
    const { status, idSong } = req.params;
    if (status == "favorite") {
      const favoriteSong = new FavoriteSong({
        userId: "",
        songId: idSong,
      });
      await favoriteSong.save();
    } else {
      await FavoriteSong.deleteOne({
        userId: "",
        songId: idSong,
      });
    }
    res.json({
      code: 200,
      message:
        status == "favorite" ? "Đã thêm vào yêu thích" : "Đã xóa yêu thích",
    });
  } catch (error) {
    res.json({
      code: 400,
      error: error,
    });
  }
};
