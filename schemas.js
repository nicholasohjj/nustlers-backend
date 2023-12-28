const Joi = require('joi');

const itemSchema = Joi.object({
    item_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().integer().required(),
    total_price: Joi.number().required()
});

const statusSchema = Joi.object({
    paid: Joi.boolean().required(),
    collected: Joi.boolean().required(),
    cancelled: Joi.boolean().required(),
    refunded: Joi.boolean().required(),
    completed: Joi.boolean().required(),
    delivered: Joi.boolean().required()
});

const pickUpPointSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    location: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required()
    }).required()
});

const transactionSchema = Joi.object({
    location_id: Joi.string().required(),
    stall_id: Joi.string().required(),
    items: Joi.array().items(itemSchema).required(),
    queuer_id: Joi.string().required(),
    queuer_mobile: Joi.string().required(),  // You might want to add regex for phone number validation
    buyer_id: Joi.string().required(),
    buyer_mobile: Joi.string().required(),  // Similarly, regex for phone number validation
    status: statusSchema,
    fee: Joi.number().required(),
    total_cost: Joi.number().required(),
    pick_up_point: Joi.array().items(pickUpPointSchema).required()
});

module.exports = {
    transactionSchema
}