import mongoose, { models, Schema } from "mongoose";
import slugify from "slugify";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
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
  { timestamps: true }
);

ProductSchema.pre("save", async function () {

  if (!this.isModified("title") && this.slug) {
    return;
  }

  let baseSlug = slugify(this.title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });

  let uniqueSlug = baseSlug;
  let counter = 1;

  const ProductModel = this.constructor as mongoose.Model<any>;

  while (
    await ProductModel.findOne({
      slug: uniqueSlug,
      _id: { $ne: this._id },
    })
  ) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = uniqueSlug;
});

export const Product =
  models.Product || mongoose.model("Product", ProductSchema);