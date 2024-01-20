const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const supabase = require("../supabase/supabase");

const canteenSchema = Joi.object({
  canteen_id: Joi.string().required(),
  canteen_name: Joi.string().required(),
  canteen_stalls_id: Joi.string().required(),
  canteen_image: Joi.string().uri().required(),
});

// Trial get info
//  const getInfo = async (req, res) => {
//      const { data, error } = await supabase
//          .from('test')
//          .select('*')

//     console.log("Data:", data)
//     res.json(data);
// }

const getCanteens = async (req, res) => {
  const { data, error } = await supabase.from("canteens").select("*");

  res.json(data);
};

const addCanteen = async (canteen) => {
  const { value, error } = canteenSchema.validate(canteen);
  console.log("This is the Request body", canteen);
  if (error) {
    console.log("Error:", error);
    // sorry nicoh im commenting this out
    // return res.status(400).json({ error: "Invalid canteen" });
  }
  // Table params
  // const {marker_image, stall_count, operating_hours, marker_title,
  // coordinate, description} = value;
  //
  // Insert new information
  console.log("This is the validated body values", value);

  const { data, errors } = await supabase.from("canteens").insert(value);
};

const addCanteens = async (req, res) => {
  const canteens = req.body;
  const addCanteenPromises = canteens.map((canteen) => addCanteen(canteen));
  Promise.all(addCanteenPromises);
};

module.exports = {
  getCanteens,
  addCanteens,
  addCanteen,
};
