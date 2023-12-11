import { Request, Response } from "express";
import addBanner from "../services/add-banner-service";
import handleControllerError from "../../errors/handle-controller-error";
import errors from "../../errors/errors";

export default async (req: Request, res: Response) => {
  try {
    const banner = req.body.banner;
    const { authorization } = req.headers;
    if (
      !(
        banner &&
        typeof banner.productID === "string" &&
        typeof banner.title === "string" &&
        typeof banner.description === "string" &&
        typeof banner.imageURL === "string"
      )
    ) {
      console.log('req:', req.body.banner);
      
      return res.status(400).send({
        addBannerRequestsBodyStructure: {
          banner: {
            productID: "string",
            title: "string",
            description: "string",
            imageURL: "string",
            note: "optional - string",
          },
        },
      });
    }
    banner.note ||= "";
    // get the user from token
    banner.authorID = "some id";
    const newBanner = await addBanner(banner, authorization as string);
    res.send(newBanner);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === errors.bannerExistForProduct
    ) {
      return res.status(400).send(
        "there is no product with the specified productID\
            you can only create banner for an existing product"
      );
    }
    if (error instanceof Error && error.message === errors.productIDNotExist) {
      return res
        .status(400)
        .send(
          "banner with this productID already exist. you cant create more than one"
        );
    }
    handleControllerError(req, res, error);
  }
};
