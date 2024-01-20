const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const supabase = require("../supabase/supabase");
const { canteenSchema } = require("../schema");

const getCanteens = async (req, res) => {
  try {
    const { data, error } = await supabase.from("canteens").select("*");
    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ message: "No canteens found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCanteenById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("canteens")
      .select("*")
      .eq("canteen_id", id);
    if (error) throw error;
    if (data.length === 0) {
      return res.status(404).json({ message: "No canteens found" });
    }
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCanteens,
  getCanteenById,
};