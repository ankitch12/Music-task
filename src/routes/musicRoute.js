const express = require("express");
const { Joi, celebrate } = require("celebrate");
const musicController = require("../controller/music");

const router = express.Router();

router.post(
  "/add-music",
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      thumbnail: Joi.string().required(),
      duration: Joi.string().required(),
      embedURL: Joi.string().required(),
      genre: Joi.string().required(),
      musicId: Joi.string().required(),
      commentsCount: Joi.string().required(),
      likes: Joi.string().required(),
      playCount: Joi.string().required(),
      publishedAt: Joi.date().required(),
      author: {
        name: Joi.string().required(),
        username: Joi.string().required(),
        avatarURL: Joi.string().required(),
        verified: Joi.boolean().required(),
        followers: Joi.number().required(),
        following: Joi.number().required(),
      },
      streamUrl: Joi.string().required(),
    }),
  }),
  musicController.addMusic
);
router.post(
  "/update-music",
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string().required(),
      title: Joi.string(),
      description: Joi.string(),
      thumbnail: Joi.string(),
      duration: Joi.string(),
      embedURL: Joi.string(),
      genre: Joi.string(),
      musicId: Joi.string(),
      commentsCount: Joi.string(),
      likes: Joi.string(),
      playCount: Joi.string(),
      publishedAt: Joi.boolean(),
      author: {
        name: Joi.string(),
        username: Joi.string(),
        url: Joi.string(),
        avatarURL: Joi.string(),
        verified: Joi.boolean(),
        followers: Joi.number(),
        following: Joi.number(),
      },
      streamUrl: Joi.string(),
    }),
  }),
  musicController.searchMusic
);
router.post(
  "/delete-music",
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string().required(),
    }),
  }),
  musicController.searchMusic
);
router.get(
  "/music-listing",
  celebrate({
    query: Joi.object().keys({
      search: Joi.string().required(),
    }),
  }),
  musicController.searchMusic
);
module.exports = router;
