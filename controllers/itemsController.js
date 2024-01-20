const Joi = require("joi");
const supabase = require("../supabase/supabase");
const { itemSchema } = require("../schema");

const getItems = async (req, res) => {
  try {
    const { data, error } = await supabase.from("items").select("*");
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItemsById = async (req, res) => {
  const { ids } = req.body;
  // Optional: Add validation for ids here
  try {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .in("item_id", ids);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addItem = async (req, res) => {
  const { value, validationError } = itemSchema.validate(req.body);
  if (validationError) {
    console.log("Validation Error:", validationError);
    return res.status(400).json({ error: "Invalid item" });
  }

  try {
    const { data, insertError } = await supabase.from("items").insert(value);
    if (insertError) throw insertError;
    res.json({ message: "Item added successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getItems,
  getItemsById
};
