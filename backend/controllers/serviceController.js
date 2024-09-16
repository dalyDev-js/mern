import Service from "../model/serviceModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllServices = catchAsync(async (req, res, next) => {
  const services = await Service.find();
  res.status(200).json({
    status: "success",
    data: {
      services,
    },
  });
});

export const createService = catchAsync(async (req, res, next) => {
  console.log("hello");
  const newService = await Service.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      service: newService,
    },
  });
});

export const getService = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(
      new AppError(`No service Found with this id : ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      service,
    },
  });
});

export const updateService = catchAsync(async (req, res, next) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    return next(
      new AppError(`No service Found with this id : ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      service,
    },
  });
});

export const deleteService = catchAsync(async (req, res, next) => {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) {
    return next(
      new AppError(`No service Found with this id : ${req.params.id}`, 404)
    );
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

const searchService = catchAsync(async (req, res, next) => {
  const keyword = req.query.keyword;
  const conditions = {};
  if (keyword) {
    conditions.title = { $regex: ".*" + keyword + ".*", $options: "i" };
  }
  const services = await Service.find(conditions);
  res.status(200).json(services);
});
