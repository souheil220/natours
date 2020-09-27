const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

// eslint-disable-next-line prettier/prettier
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(new AppError(`No document found with that ID`, 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

// eslint-disable-next-line prettier/prettier
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      return next(new AppError(`No document found with that ID`, 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    });
  });

// eslint-disable-next-line prettier/prettier
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: document,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const document = await query;
    //const tour = await Tour.findOne({_id: req.params.id});
    if (!document) {
      return next(new AppError(`No Tour found with that ID`, 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    });
  });

// eslint-disable-next-line prettier/prettier
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //to allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    //EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sorting()
      .limiting()
      .paginating();
    const document = await features.query;
    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      result: document.length,
      data: {
        data: document,
      },
    });
  });
