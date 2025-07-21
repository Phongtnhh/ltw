const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  contentHtml: String, 
  author: String,
  thumbnail: String,
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  deleted: { type: Boolean, default: false },
  deletedAt: Date
    }, 
    { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema, "news");
