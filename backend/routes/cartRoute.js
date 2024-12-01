import express, { Router } from 'express'
import { getUserCart,addToCart,updateCart } from '../controllers/cartContollers.js'
import authUser from '../middleware/auth.js'


//now we will create router
const cartRouter=express.Router()

cartRouter.post('/get',authUser,getUserCart)
cartRouter.post('/add',authUser,addToCart)
cartRouter.post('/update',authUser,updateCart)

export default cartRouter