import expressAsyncHandler from 'express-async-handler'
// import User from "../models/userModel"
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @route api/user/login
// public access
// post
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
// post register a user
// api/users
const registerUser = expressAsyncHandler(async(req,res) => {
  const {name,email,password} = req.body;
  const userExists = await User.findOne({email})

  if(userExists){
    res.status(400)
    throw new Error("user already exists")
  }
  const user = await User.create({name,email,password})

  if(user){
    res.status(201).json({ _id:user._id,
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
      token:generateToken(user._id)})
  }else{
    res.status(400)
    throw new Error("invalid user data")
  }

})

// get user profile
// GET api/user/profile
// private
const getUserProfile = expressAsyncHandler( async(req,res) =>{
 

  const user = await User.findById(req.user._id)
  if(user){
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
    })
  }
  else{
    res.status(404)
    throw new Error('user not found')
  }
})


// update profile
// PUT api/user/profile
// private
const updateUserProfile = expressAsyncHandler( async(req,res) =>{
 

  const user = await User.findById(req.user._id)
  if(user){
   user.name = req.body.name || user.name,
   user.email = req.body.email || user.email
   if(req.body.password){
    user.password = req.body.password
   }
   const updatedUser = await user.save()
   
   res.json({
    _id:updatedUser._id,
    name:updatedUser.name,
    email:updatedUser.email,
    isAdmin:updatedUser.isAdmin,
    token: generateToken(updatedUser._id)
  })
  }
  else{
    res.status(404)
    throw new Error('user not found')
  }
})

export {authUser  , getUserProfile,registerUser,updateUserProfile}