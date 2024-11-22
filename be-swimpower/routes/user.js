const express = require('express')
const user = express.Router()
const UserModel = require("../models/UserModel")
const multer = require("multer")
const cloudStorage = require("../middleware/updateUserImageCloudinaryMiddleware")
const ValidateUserBody = require('../middleware/validateUserBody')
const cloud = multer({ storage : cloudStorage })




module.exports = user