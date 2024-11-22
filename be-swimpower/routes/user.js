const express = require('express')
const users = express.Router()
const UserModel = require("../models/UserModel")
const multer = require("multer")



module.exports = users