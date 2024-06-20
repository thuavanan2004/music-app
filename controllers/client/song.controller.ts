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

    if (!topic) {
      return res.status(404).send("Không tìm thấy chủ đề");
    }

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
      if (singer) {
        song["singerName"] = singer.fullName;
      }
    }

    res.render("./client/pages/songs/index", {
      pageTitle: "Bài hát",
      songs: songs,
      topic: topic,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Đã xảy ra lỗi");
  }
};

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slugSong: string = req.params.slugSong;

  const song = await Song.findOne({
    slug: slugSong,
    deleted: false,
    status: "active",
  });

  if (!song) {
    return res.status(404).send("Không tồn tại bài hát");
  }

  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false,
  }).select("fullName");

  if (!singer) {
    return res.status(404).send("Không tồn tại ca sĩ");
  }

  const topic = await Topic.findOne({
    _id: song.topicId,
    deleted: false,
  }).select("title");

  if (!topic) {
    return res.status(404).send("Không tồn tại chủ đề");
  }

  const favoriteSong = await FavoriteSong.findOne({
    userId: "",
    songId: song.id,
  });

  song["favorite"] = favoriteSong ? true : false;

  res.render("client/pages/songs/detail", {
    pageTitle: song.title,
    song: song,
    singer: singer,
    topic: topic,
  });
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

    if (!song) {
      return res.status(404).send("Không tìm thấy bài hát");
    }

    const updateLike =
      status == "like" ? (song.like || 0) + 1 : (song.like || 0) - 1;

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
    console.log(error);
    return res.status(500).send("Đã xảy ra lỗi");
  }
};

// [GET] /songs/favorite
export const favorite = async (req: Request, res: Response) => {
  try {
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
        _id: song?.singerId,
        deleted: false,
      }).select("fullName");
      if (song) {
        item["song"] = song;
      }
      if (singer) {
        item["singer"] = singer;
      }
    }

    res.render("./client/pages/songs/favorite", {
      pageTitle: "Bài hát yêu thích",
      favoriteSongs: favoriteSongs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Đã xảy ra lỗi");
  }
};
// [PATCH] /songs/favorite/:status/:songId
export const favoritePatch = async (req: Request, res: Response) => {
  const status = req.params.status;
  const songId = req.params.songId;

  if (status == "favorite") {
    const favoriteSong = new FavoriteSong({
      userId: "",
      songId: songId,
    });
    await favoriteSong.save();
  } else {
    await FavoriteSong.deleteOne({
      userId: "",
      songId: songId,
    });
  }

  res.json({
    code: 200,
    message:
      status == "favorite" ? "Đã thêm vào yêu thích" : "Đã xóa yêu thích",
  });
};
