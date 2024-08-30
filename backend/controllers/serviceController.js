import Service from "../model/serviceModel.js";

export const getAllServices = async (req, res, next) => {
  const services = await Service.find();
  res.status(200).json({
    status: "success",
    data: {
      services,
    },
  });
};
