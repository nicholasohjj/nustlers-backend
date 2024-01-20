const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const supabase = require("../supabase/supabase")

const itemSchema = Joi.object({
    item_id: Joi.string().required(),   
    item_name: Joi.string().required(),
    item_image: Joi.string().uri().required(),
    item_price: Joi.number().positive().required(),
});

//Trial get info
// const getInfo = async (req, res) => {
//     const { data, error } = await supabase
//         .from('test')
//         .select('*')

//     console.log("Data:", data)
//     res.json(data);
// }

const getItems = async (req, res) => {
    const {data, error} =  await supabase  
        .from('items')
        .select('*')

    res.json(data)
};

const addItem = async (item) => {

    const {value, error} = itemSchema.validate(item);
    console.log("This is the Request body",item)
    if (error){
        console.log("Error:", error);
        return res.status(400).json({ error: "Invalid item" });
    }
    // Table params
    //const {marker_image, stall_count, operating_hours, marker_title, coordinate, description} = value;
    //
    // Insert new information 
    console.log("This is the validated body values", value);

    const { data, errors } = await supabase
        .from('items')
        .insert(value)
}

const addItems = async (req, res) => {

    const items = req.body
    const addItemPromises = items.map(item => addItem(item))
    Promise.all(addItemPromises)

}


module.exports = {
    getItems,
    addItems,
    addItem
};