const Joi = require("joi");
const phoneRegex = /^[89][0-9]{7}$/;

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

const transactionSchema = Joi.object({
  // stall: stallSchema.required(),
  // items: Joi.array().items(itemSchema).min(0).required(),
  max_items: Joi.number().positive().required(),
  queuer_id: Joi.string().required(),
  queuer_mobile: Joi.string().pattern(phoneRegex).required(),
  queuer_name: Joi.string().required(),
  buyer_id: Joi.string().allow(null),
  buyer_mobile: Joi.string().pattern(phoneRegex).allow(null),
  buyer_name: Joi.string().required(),
  // status: statusSchema.required(),
  fee: Joi.number().positive().required(),
  total_cost: Joi.number().positive().required(),
  // destination: Joi.object(destinationSchema).required(),
  tm_created: Joi.date(),
  tm_updated: Joi.date(),
});

module.exports = {
  markerSchema,
  transactionSchema,
};
