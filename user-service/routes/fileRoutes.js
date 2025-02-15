const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {ProfilePictureUpload, ProfilePictureGet} = require('../controller/fileController')
router.route('/:username')
    .post(ProfilePictureUpload)
    .get(ProfilePictureGet)
module.exports = router