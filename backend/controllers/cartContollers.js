import userModel from "../models/userModel.js"

// //add products to user cart
// const addToCart=async(req,res)=>{
//   try {
    
//     const {userId,itemId,size} =req.body

//     const userData=await userModel.findById(userId)
//     let cartData =await userData.cartData;

//     if(cartData[itemId]){
//         if(cartData[itemId][size]){
//             cartData[itemId][size] +=1
//         }else{
//             cartData[itemId][size]=1
//         }
//     }else{
//        cartData[itemId]={}
//        cartData[itemId][size]=1 
//     }
 
//     await userModel.findByIdAndUpdate(userId,{cartData})

//     res.json({success:true,message:"Added To Cart"})

//   } catch (error) {
//     console.log(error);
//     res.json({success:false,message:error.message})
    
//   }
// }



const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        // Validate the input
        if (!itemId || !size) {
            return res.status(400).json({ success: false, message: 'Item ID and size are required' });
        }

        // Find the user
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Initialize cart data if not present
        let cartData = userData.cartData || {};

        // Add the item to the cart
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // Increase quantity
            } else {
                cartData[itemId][size] = 1; // Add size if not present
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1; // Add item with size
        }

        // Save updated user data
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: 'Added to cart successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error, try again later' });
    }
};



// //update user cart
// const updateCart=async(req,res)=>{
     

//     try {
//         const{userId,itemId,size,quantity} =req.body
    
//         const userData=await userModel.findById(userId)
//         let cartData =await userData.cartData || {}
        
//          cartData[itemId][size]=quantity
    
//          await userModel.findByIdAndUpdate(userId,{cartData})
    
//          res.json({success:true,message:"Cart Updated"})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})
//     }
// }


const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        // Validate input
        if (!userId || !itemId || !size || typeof quantity !== 'number') {
            return res.status(400).json({ success: false, message: "Invalid input parameters" });
        }

        // Fetch user data
        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cartData if undefined
        const cartData = userData.cartData || {};

        // Initialize item in cartData if it doesn't exist
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        // Update the size and quantity for the item
        cartData[itemId][size] = quantity;

        // Update the user's cartData in the database
        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        res.json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



// //get user cart data
// const getUserCart=async(req,res)=>{

//     try {
        
//         const{userId} =req.body
         
//         const userData=await userModel.findById(userId)
//         let cartData =await userData.cartData ||{}
   
//         res.json({success:true,cartData})


//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})
//     }

// }

const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Fetch user data
        const userData = await userModel.findById(userId);

        // Check if user exists
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get cart data
        const cartData = userData.cartData || {};

        res.json({ success: true, cartData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export{addToCart,updateCart,getUserCart}