const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const supabase = require("../supabase/supabase")

const markerSchema = Joi.object({
    coordinate: Joi.object({
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    }).required(),
    marker_title: Joi.string().required(),
    marker_image: Joi.string().uri().required(),
    operating_hours: Joi.object({
      term: Joi.string().required(),
      vacation: Joi.string().required(),
    }).required(),
    stall_count: Joi.number().required(),
  });

const getInfo = async (req, res) => {
    const { data, error } = await supabase
        .from('test')
        .select('*')

    console.log("Data:", data)
    res.json(data);
}

const getMarkers = async (req, res) => {
    res.json('Hello World!');
};

const addMarker = async (marker) => {

    const {value, error} = markerSchema.validate(marker);
    console.log("This is the Request body",marker)
    if (error){
        console.log("Error:", error);
        return res.status(400).json({ error: "Invalid marker" });
    }
    // Table params
    //const {marker_image, stall_count, operating_hours, marker_title, coordinate, description} = value;
    //
    // Insert new information 
    console.log("This is the validated body values", value);

    const { data, errors } = await supabase
        .from('markers')
        .insert(value)
}

const addMarkers = async (req, res) => {

    const markers = req.body
    const addMarkerPromises = markers.map(marker => addMarker(marker))
    Promise.all(addMarkerPromises)
    
}


module.exports = {
    getMarkers,
    getInfo,
    addMarkers,
    addMarker
};