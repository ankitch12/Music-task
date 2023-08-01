const Music = require('../schema/musicSchema')
const SoundCloud = require('soundcloud-scraper')
const { SOUNDCLOUD_KEY } = require('../../config')
const { resp } = require('../utility/resp')

const client = new SoundCloud.Client(SOUNDCLOUD_KEY)

exports.addMusic = async (req, res) => {
  try {
    const isExist = await Music.findOne({
      musicId: req.body.musicId,
    })
    if (isExist) {
      return resp.taken(res, '')
    }
    const music = await Music.create(req.body)
    return resp.success(res, '', music)
  } catch (error) {
    return resp.fail(res, '')
  }
}
exports.updateMusic = async (req, res) => {
  try {
    const isUpdated = await Music.findByIdAndUpdate(req.body._id, req.body)
    if (!isUpdated) {
      return resp.notFound(res, 'Music not found')
    }
    return resp.success(res, '')
  } catch (error) {
    return resp.fail(res, '')
  }
}
exports.deleteMusic = async (req, res) => {
  try {
    const isDeleted = await Music.findByIdAndDelete(req.body._id, req.body)
    if (!isDeleted) {
      return resp.notFound(res, 'Music not found')
    }
    return resp.success(res, '')
  } catch (error) {
    return resp.fail(res, '')
  }
}
exports.searchMusic = async (req, res) => {
  try {
    const searchKeyword = req.query.search
    const searchQuery = { $regex: searchKeyword, $options: 'i' }
    const allSavedMusic = await Music.find({
      $or: [
        { title: searchQuery },
        { author: searchQuery },
        { description: searchQuery },
      ],
    })
    if (allSavedMusic.length > 0) {
      resp.success(res, '', allSavedMusic)
    }
    const results = await client.search(searchKeyword)
    if (!results.length > 0) {
      return resp.unknown(res, 'Invalid query')
    }
    const promises = results.map(async (firstResult) => {
      const trackInfo = await client.getSongInfo(firstResult.url)
      const structuredData = {
        title: trackInfo.title,
        description: trackInfo.description,
        thumbnail: trackInfo.thumbnail,
        duration: trackInfo.duration,
        url: trackInfo.embedURL,
        genre: trackInfo.genre,
        musicId: trackInfo.id,
        commentsCount: trackInfo.commentsCount,
        likes: trackInfo.likes,
        playCount: trackInfo.playCount,
        publishedAt: trackInfo.publishedAt,
        author: trackInfo.author,
        streamUrl: trackInfo.streams.hls,
      }
      const updatedMusic = await Music.findOneAndUpdate(
        { musicId: structuredData.musicId },
        structuredData,
        { upsert: true, new: true }
      ).lean(true)
      return updatedMusic
    })
    const data = await Promise.allSettled(promises)
    const resolvedPromises = data
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value)
    if (!allSavedMusic.length > 0) {
      return resp.success(res, '', resolvedPromises)
    }
  } catch (error) {
    return resp.fail(res, '')
  }
}
