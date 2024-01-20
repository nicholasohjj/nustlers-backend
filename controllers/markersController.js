const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const supabase = require("../supabase/supabase");

const markerSchema = require("../schema");

const getMarkers = async (req, res) => {
  const { data, error } = await supabase.from("markers").select("*");

  res.json(data);
};

const addMarker = async (marker) => {
  const { value, error } = markerSchema.validate(marker);
  console.log("This is the Request body", marker);
  if (error) {
    console.log("Error:", error);
    return res.status(400).json({ error: "Invalid marker" });
  }

  console.log("This is the validated body values", value);

  const { data, errors } = await supabase.from("markers").insert(value);
};

const addMarkers = async (req, res) => {
  const markers = req.body;
  const addMarkerPromises = markers.map((marker) => addMarker(marker));
  Promise.all(addMarkerPromises);
};

module.exports = {
  getMarkers,
  addMarkers,
  addMarker,
};
