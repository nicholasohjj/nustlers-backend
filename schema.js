const Joi = require("joi");
const phoneRegex = /^[89][0-9]{7}$/;

const markerSchema = Joi.object({
    marker_id: Joi.string(),
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

const stallSchema = Joi.object({
  stall_id: Joi.string(),
  coordinate: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).required(),
  stall_image: Joi.string().uri().required(),
  stall_name: Joi.string().required(),
  items_ids: Joi.array().items(Joi.string()), // Updated line
});

const itemSchema = Joi.object({
  item_id: Joi.string(),
  item_name: Joi.string().required(),
  item_image: Joi.string().uri().required(),
  item_price: Joi.number().positive().required(),
});

const statusSchema = Joi.object({
  cancelled: Joi.boolean().required(),
  collected: Joi.boolean().required(),
  completed: Joi.boolean().required(),
  delivered: Joi.boolean().required(),
  paid: Joi.boolean().required(),
  refunded: Joi.boolean().required()
});

const destinationSchema = Joi.object({
  coordinate: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).required(),
  title: Joi.string().required(),
});

const transactionSchema = Joi.object({
    transaction_id: Joi.string(),
    stall: stallSchema.required(),
    items_ids: Joi.array().items(Joi.string()), // Updated line
    max_items: Joi.number().positive().required(),
    queuer_id: Joi.string().required(),
    queuer_mobile: Joi.number().required(),
    queuer_name: Joi.string().required(),
    buyer_id: Joi.string().allow(null),
    buyer_mobile: Joi.number().allow(null),
    buyer_name: Joi.string().allow(null),
    status: statusSchema.required(),
    feePerItem: Joi.number().required(),
    total_cost: Joi.number().required(),
    destination: destinationSchema.required(), // Simplified usage
    tm_created: Joi.date(),
    tm_updated: Joi.date(),
});


module.exports = {
    markerSchema,
    transactionSchema,
    stallSchema
}