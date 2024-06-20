import { Request, Response } from "express";
import filter from "../../helpers/filter.helper";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/system";
import unidecode from "unidecode";
import { paginationHelper } from "../../helpers/pagination.helper";

// [GET] /topics
export const index = async (req: Request, res: Response) => {
  try {
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
    const countRecord = await Topic.countDocuments(find);
    const objectPagination = paginationHelper(req, countRecord);

    const filterStatus = filter(req);

    const topics = await Topic.find(find)
      .skip(objectPagination.skipPage)
      .limit(objectPagination.limitPage);

    res.render("admin/pages/topics/index", {
      pageTitle: "Quản lý chủ đề",
      topics: topics,
      filterStatus: filterStatus,
      keyword: req.query.keyword || "",
      objectPagination: objectPagination,
    });
  } catch (error) {
    res.status(500).send("Không thể truy cập!");
  }
};

// [PATCH] /topics/change-multi
export const changeMulti = async (req: Request, res: Response) => {
  try {
    const type = req.body.type;
    const ids = req.body.ids.split(",");

    switch (type) {
      case "delete-all":
        await Topic.updateMany(
          {
            _id: { $in: ids },
          },
          {
            deleted: true,
          }
        );
        break;
      case "inactive":
        await Topic.updateMany(
          {
            _id: { $in: ids },
          },
          {
            status: type,
          }
        );
        break;
      case "active":
        await Topic.updateMany(
          {
            _id: { $in: ids },
          },
          {
            status: type,
          }
        );
        break;
      case "remove-all":
        await Topic.deleteMany({
          _id: { $in: ids },
        });
        break;
      case "recall-all":
        await Topic.updateMany(
          {
            _id: { $in: ids },
          },
          {
            deleted: false,
          }
        );
        break;
      default:
        break;
    }
    req.flash("success", "Cập nhật trạng thái chủ đề thành công!");
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

// [PATCH] /topics/change-status/:status/:id
export const changeStatus = async (req: Request, res: Response) => {
  try {
    const status = req.params.status;
    const id = req.params.id;
    await Topic.updateOne(
      {
        _id: id,
      },
      {
        status: status,
      }
    );
    req.flash("success", "Cập nhật trạng thái chủ đề thành công!");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Cập nhật trạng thái chủ đề không thành công!");
    console.log(error);
  }
};

// [GET] /topics/create
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/topics/create", {
    pageTitle: "Tạo mới chủ đề",
  });
};

// [POST] /topics/create
export const createPost = async (req: Request, res: Response) => {
  try {
    const record = new Topic(req.body);
    await record.save();
    res.redirect(`/${systemConfig.prefixAdmin}/topics`);
  } catch (error) {
    res.status(500).send("Tạo mới chủ đề không thành công!");
  }
};

// [GET] /topics/edit/:id
export const edit = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const topic = await Topic.findOne({
      _id: id,
      deleted: false,
    });

    res.render("admin/pages/topics/edit", {
      pageTitle: "Chỉnh sửa chủ đề",
      topic: topic,
    });
  } catch (error) {
    res.status(500).send("Không thể truy cập trang chỉnh sửa chủ đề!");
  }
};

// [PATCH] /topics/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Topic.updateOne(
      {
        _id: id,
      },
      req.body
    );
    req.flash("success", "Chỉnh sửa chủ đề thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/topics`);
  } catch (error) {
    res.status(500).send("Chỉnh sửa chủ đề không thành công!");
  }
};
// [GET] /topics/detail/:id
export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const topic = await Topic.findOne({
      _id: id,
      deleted: false,
    });

    res.render("admin/pages/topics/detail", {
      pageTitle: topic.title,
      topic: topic,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// [PATCH] /topics/delete/:id
export const deletePatch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Topic.updateOne(
      {
        _id: id,
        deleted: false,
      },
      {
        deleted: true,
      }
    );
    req.flash("success", "Xóa sản phẩm thành công!");
    res.redirect("back");
  } catch (error) {
    res.status(500).send(error);
  }
};

// [GET] /topics/trash
export const trash = async (req: Request, res: Response) => {
  try {
    const find = {
      deleted: true,
    };
    if (req.query.keyword) {
      const keyword = `${req.query.keyword}`.trim();
      const keywordRegex = new RegExp(keyword, "i");

      const unidecodeKeyword = unidecode(keyword);
      const keywordSlug = unidecodeKeyword.replace(/\s+/g, "-");
      const keywordSlugRegex = new RegExp(keywordSlug, "i");

      find["$or"] = [{ title: keywordRegex }, { slug: keywordSlugRegex }];
    }
    const countRecord = await Topic.countDocuments(find);
    const objectPagination = paginationHelper(req, countRecord);

    const topics = await Topic.find(find)
      .skip(objectPagination.skipPage)
      .limit(objectPagination.limitPage);

    res.render("admin/pages/topics/trash", {
      pageTitle: "Chủ đề đã xóa",
      topics: topics,
      objectPagination: objectPagination,
      keyword: req.query.keyword,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// [DELETE] /topics/remove/:id
export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Topic.deleteOne({
      _id: id,
    });
    req.flash("success", "Chủ đề đã được xóa vĩnh viễn!");
    res.redirect("back");
  } catch (error) {
    res.status(500).send(error);
  }
};

// [PATCH] /topics/remove/:id
export const recall = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Topic.updateOne(
      {
        _id: id,
      },
      {
        deleted: false,
      }
    );
    req.flash("success", "Thu hồi sản phẩm thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/topics`);
  } catch (error) {
    res.status(500).send(error);
  }
};
