const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const supabase = require("../supabase/supabase");
const { stallSchema } = require("../schema");

const getStalls = async (req, res) => {
  try {
    const { data, error } = await supabase.from("stalls").select("*");
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStallsById = async (req, res) => {
  const { ids } = req.body;
  // Optional: Add validation for ids here
  try {
    const { data, error } = await supabase
      .from("stalls")
      .select("*")
      .in("stall_id", ids);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addStall = async (req, res) => {
  const { value, error } = stallSchema.validate(req.body);
  if (error) {
    console.log("Error:", error);
    return res.status(400).json({ error: "Invalid stall" });
  }
  try {
    const { data, errors } = await supabase.from("stalls").insert(value);
    if (errors) throw errors;
    res.json({ message: "Stall added successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getStalls,
  getStallsById,
};
