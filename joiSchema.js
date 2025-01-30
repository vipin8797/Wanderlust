const Joi = require('joi');

const listingJoiSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required().messages({
            "string.empty": "Title is required",
            "any.required": "Title is required"
        }),
        description: Joi.string().required().messages({
            "string.empty": "Description is required",
            "any.required": "Description is required"
        }),
        image: Joi.object({
            filename: Joi.string().default("listingimage"),
            url: Joi.string().uri().allow("").default("https://plus.unsplash.com/premium_photo-1669748157617-a3a83cc8ea23?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VhJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D").messages({
                "string.uri": "Invalid image URL"
            })
        }).default({}),
        price: Joi.number().min(0).required().messages({
            "number.base": "Price must be a number",
            "number.min": "Price must be a positive value",
            "any.required": "Price is required"
        }),
        location: Joi.string().required().messages({
            "string.empty": "Location is required",
            "any.required": "Location is required"
        }),
        country: Joi.string().required().messages({
            "string.empty": "Country is required",
            "any.required": "Country is required"
        })
    }).required()
});

module.exports = {listingJoiSchema};
