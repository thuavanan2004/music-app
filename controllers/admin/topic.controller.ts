import { Request, Response } from "express";
import filter from "../../helpers/filter.helper";
import Topic from "../../models/topic.model";
import unidecode from "unidecode";

export const index = async (req: Request, res: Response) => {
  const find = {
    deleted: false,
  };
  if (req.query.status) {
    find["status"] = req.query.status;
  }
  if (req.query.keyword) {
    const keyword = `${req.query.keyword}`.trim();
    const unidecodeKeyword = unidecode(keyword);
    const unidecodeSlug = unidecodeKeyword.replace(/\s+/g, "-");
    const unidecodeRegex = new RegExp(`${unidecodeSlug}`, "i");
    const regexKeyword = new RegExp(`${keyword}`, "i");

    find["$or"] = [{ title: regexKeyword }, { slug: unidecodeRegex }];
  }

  const filterStatus = filter(req);

  const topics = await Topic.find(find);

  res.render("admin/pages/topics/index", {
    pageTitle: "Quản lý chủ đề",
    topics: topics,
    filterStatus: filterStatus,
    keyword: req.query.keyword,
  });
};
