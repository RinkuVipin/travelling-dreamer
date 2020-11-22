const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const fs = require("fs");

const getPlaceCoordinates = require("../utils/PlaceCoordinates");
const HttpError = require("../models/http-error");
const PlaceSchema = require("../schema/placesSchema");
const UserSchema = require("../schema/usersSchema");
const usersSchema = require("../schema/usersSchema");

/* -----------------------------------------
Get Place Details by specifing placeId
----------------------------------------- */
const getPlaceById = async (req, res, next) => {
  const placeId = req.params.plId;
  let resultPlace;

  try {
    resultPlace = await PlaceSchema.findById(placeId);
  } catch (e) {
    const error = new HttpError("Oops. Cannot retrieve the places", 500);
    return next(error);
  }

  if (!resultPlace) {
    const error = new HttpError("Oops! Cannot Find that Place.", 404);
    return next(error);
  }

  res.json({ place: resultPlace.toObject({ getters: true }) });
};

/* --------------------------------------------
Get Created Place Details by specifing UserId
----------------------------------------------- */

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.usId;

  let resultPlaces;

  try {
    resultPlaces = await PlaceSchema.find({ creatorId: userId });
  } catch (e) {
    const error = new HttpError(
      "Oops. Cannot retrieve the places created by the user",
      500
    );
    return next(error);
  }

  // if (!resultPlaces.length) {
  //   const error = new HttpError("Oops! Cannot Find the Users Place.", 404);
  //   return next(error);
  // }

  res.json({
    places: resultPlaces.map((place) => place.toObject({ getters: true })),
  });
};

/* --------------------------------------------
Create a new Place
----------------------------------------------- */

const createNewPlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("Please Enter Valid Data", 422));
  }

  const { title, description, creatorId, address } = req.body;

  let coordinates;
  try {
    coordinates = await getPlaceCoordinates(address);
  } catch (error) {
    return next(error);
  }

  const newPlace = new PlaceSchema({
    title,
    description,
    address,
    image: req.file.path,
    creatorId: req.userData.userId,
    location: coordinates,
  });

  let creatorUser;

  try {
    creatorUser = await UserSchema.findById(creatorId);
  } catch (e) {
    const error = new HttpError("Oops! User cannot be Found", 500);
    return next(error);
  }

  if (!creatorUser) {
    const error = new HttpError("Oops! User cannot be Found", 404);
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newPlace.save({ session: session });
    creatorUser.places.push(newPlace);
    await creatorUser.save({ session: session });
    await session.commitTransaction();
  } catch (e) {
    console.log(e);
    const error = new HttpError("Oops! Cannot add the Place", 500);
    return next(error);
  }

  res.status(200).json({ places: newPlace });
};

/* --------------------------------------------
Updating a existing Place
----------------------------------------------- */

const updatePlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new HttpError("Oops! Cannot Find the Users Place.", 422);
    return next(error);
  }

  const placeId = req.params.plId;
  const { title, description } = req.body;
  let resultPlace;

  try {
    resultPlace = await PlaceSchema.findById(placeId);
  } catch (e) {
    const error = new HttpError("Oops! Cannot Find the Place to Update.", 500);
    return next(error);
  }

  if (resultPlace.creatorId.toString() !== req.userData.userId) {
    const error = new HttpError(
      "Sorry! You are not authorized to edit this place",
      401
    );
    return next(error);
  }

  resultPlace.title = title;
  resultPlace.description = description;

  try {
    await resultPlace.save();
  } catch (e) {
    const error = new HttpError("Oops! Cannot Update the Place.", 500);
    return next(error);
  }

  res.status(200).json({
    updatedPlace: resultPlace.toObject({ getters: true }),
  });
};

/* --------------------------------------------
Deleting a existing Place
----------------------------------------------- */

const deletePlace = async (req, res, next) => {
  const placeId = req.params.plId;

  let deletedPlace;

  try {
    deletedPlace = await PlaceSchema.findById(placeId).populate("creatorId");
  } catch (e) {
    const error = new HttpError("Oops! Cannot Find the Place to Delete.", 500);
    return next(error);
  }

  if (!deletedPlace) {
    const error = new HttpError("Oops! Cannot Delete the Place.", 422);
    return next(error);
  }

  if (deletedPlace.creatorId.id !== req.userData.userId) {
    const error = new HttpError(
      "Sorry! You are not authorized to remove this place",
      401
    );
    return next(error);
  }

  const imagePath = deletedPlace.image;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await deletedPlace.remove({ session: session });
    deletedPlace.creatorId.places.pull(deletedPlace);
    await deletedPlace.creatorId.save({ session: session });
    await session.commitTransaction();
  } catch (e) {
    const error = new HttpError("Oops! Deleting Process Failed", 500);
    return next(error);
  }

  fs.unlink(imagePath, () => {
    console.log("Something went wrong while deleting the image.");
  });
  res.status(200).json({
    message: "Requested Place is been deleted.",
  });
};

//EXPORTS
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createNewPlace = createNewPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
