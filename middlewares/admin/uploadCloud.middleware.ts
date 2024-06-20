import { NextFunction, Response, Request } from "express";
import { uploadToCloudinary } from "../../helpers/uploadtoCloud.helper";

export const uploadSingle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req["file"]) {
    const link = await uploadToCloudinary(req["file"].buffer);
    req.body[req["file"].fieldname] = link;
    next();
  } else {
    next();
  }
};
