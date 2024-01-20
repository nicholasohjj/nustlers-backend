const Joi = require("joi");
const {v4 : uuidv4} = require("uuid");
const supabase = require("../supabase/supabase");

const stallSchema = Joi.object({
  stall_id : Joi.string().required(),
  stall_name : Joi.string().required(),
  stall_cuisine : Joi.string().required(),
  stall_image : Joi.string().uri().required(),
  items_ids : Joi.number().positive().required(),
});

// Trial get info
//  const getInfo = async (req, res) => {
//      const { data, error } = await supabase
//          .from('test')
//          .select('*')

//     console.log("Data:", data)
//     res.json(data);
// }

const getStalls = async (req, res) => {
  const {data, error} = await supabase.from("stalls").select("*");

  res.json(data);
};

const addStall = async (stall) => {
  // try{
  const {value, error} = stallSchema.validate(stall);
  console.log("This is the Request body", stall);
  // }
  if (error) {
    console.log("Error:", error);
    // return res.status(400).json({ error: "Invalid stall" });
  }
  // Table params
  // const {marker_image, stall_count, operating_hours, marker_title,
  // coordinate, description} = value;
  //
  // Insert new information
  console.log("This is the validated body values", value);

  const {data, errors} = await supabase.from("stalls").insert(value);
};

const addStalls = async (req, res) => {
  try {
    const stalls = req.body;
    const addStallPromises = stalls.map((stall) => addStall(stall));
    Promise.all(addStallPromises);
  } catch {
    return res.status(400).json({error : "Invalid stall"});
  }
};

module.exports = {
  getStalls,
  addStalls,
  addStall,
};
