const axios = require('axios');
const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parse-string-as-array')

module.exports = {
  async index(req, res) {
    const devs = await Dev.find()

    return res.json(devs)
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body

    const dev = await Dev.findOne({ github_username })

    if (dev) return res.json("This user alredy exists")

    const response = await axios.get(`https://api.github.com/users/${github_username}`)

    const { name = login, avatar_url, bio } = response.data

    const techsArray = parseStringAsArray(techs)

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }

    const newDev = await Dev.create({ github_username, name, avatar_url, bio, techs: techsArray, location })

    return res.json(newDev)
  }
}
