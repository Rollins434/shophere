import express from 'express';
import { protect } from '../middleware/authmiddleware.js';
const router = express.Router();

import {authUser, getUserProfile,registerUser, updateUserProfile} from '../controller/userController.js'


router.route('/').post(registerUser)
router.post("/login",authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)


export default router