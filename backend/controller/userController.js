import expressAsyncHandler from 'express-async-handler'
// import User from "../models/userModel"
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @route api/user/login
// public access
 const authUser = expressAsyncHandler( async(req,res) =>{
   const {email,password} = req.body
  const user = await User.findOne({email:email})
  if(user && (await user.matchPassword(password))){
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
      token:generateToken(user._id)
    })
  } else{
    res.status(401)
    throw new Error("invalid email or password")
  }
})

// get user profile
// GET api/user/profile
// private
const getUserProfile = expressAsyncHandler( async(req,res) =>{
 
  res.send('success')
})


export {authUser  , getUserProfile}