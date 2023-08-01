const mongoose = require("mongoose");

let musicSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    thumbnail: String,
    duration: String,
    url: String,
    genre: String,
    musicId: String,
    commentsCount: String,
    likes: String,
    playCount: String,
    publishedAt: Date,
    author: {
      name: String,
      username: String,
      url: String,
      avatarURL: String,
      verified: Boolean,
      followers: Number,
      following: Number,
    },
    streamUrl: String,
  },
  {
    timestamps: true,
  }
);
let Music = new mongoose.model("rooms", musicSchema);

module.exports = Music;
