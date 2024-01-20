const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const supabase = require("../supabase/supabase")

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

module.exports = {
    getMarkers,
    getInfo
};