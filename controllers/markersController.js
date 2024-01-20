const Joi = require("joi");
const supabase = require("../supabase/supabase");
const markerSchema = require("../schema");

const getMarkers = async (req, res) => {
  try {
    const { data, error } = await supabase.from("markers").select("*");
    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve markers" });
  }
};

const addMarker = async (marker) => {
  const { value, error } = markerSchema.validate(marker);
  if (error) {
    console.log("Validation Error:", error.details);
    throw new Error("Invalid marker data");
  }

  const { data, errors } = await supabase.from("markers").insert([value]);
  if (errors) throw errors;

  return data;
};

const addMarkers = async (req, res) => {
  try {
    const markers = req.body;
    const results = await Promise.all(markers.map((marker) => addMarker(marker)));
    res.json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getMarkers,
  addMarkers,
  addMarker,
};
