import mongoose, { models, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cuttedPrice: {
      type: Number,
       required: false,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
    },
    image: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

export const Product =
  models.Product || mongoose.model("Product", ProductSchema);
