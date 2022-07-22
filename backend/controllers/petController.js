const Pet = require("../models/petModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


exports.createLostFoundPet = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const pet = await Pet.create(req.body);

  res.status(201).json({
    success: true,
    pet,
  });


});

exports.getAllLostFoundPet = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;
  const petsCount = await Pet.countDocuments();

  const apiFeature = new ApiFeatures(Pet.find(), req.query)
    .search()
    .filter();

  let pet = await apiFeature.query;

  let filteredPetsCount = pet.length;

  apiFeature.pagination(resultPerPage);

  pet = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    pet,
    petsCount,
    resultPerPage,
    filteredPetsCount,
  });
});

exports.getLostFoundPetDetails = catchAsyncErrors(async (req, res, next) => {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return next(new ErrorHandler("Pet not found", 404));
    }
  
    res.status(200).json({
      success: true,
      pet,
    });
});

exports.updateLostFoundPet = catchAsyncErrors(async (req, res, next) => {
    let pet = Pet.findById(req.params.id);
    if (!pet) {
      return next(new ErrorHandler("Pet not found", 404));
    }
  
    pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      pet,
    });
});

exports.deleteLostFoundPet = catchAsyncErrors(async (req, res, next) => {
    let pet = Pet.findById(req.params.id);
  
    if (!pet) {
      return next(new ErrorHandler("Pet not found", 404));
    }
  
    await pet.remove();
  
    res.status(200).json({
      success: true,
      message: "Delete pet successful!",
    });
  });
