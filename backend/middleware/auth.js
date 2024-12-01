 import jwt from'jsonwebtoken'
 import userModel from '../models/userModel.js';

// const authUser =async(req,res,next)=>{

//     const {token} =req.headers;

//     if(!token){
//         return res.json({success:false,message:'Not Authorized Login Again'})
//     }

//     try {

//         const token_decode=jwt.verify(token,process.env.JWT_SECRET)
//         req.body.userId =token_decode.userId
//         next()

        
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})
        
//     }
// }

// export default authUser


const authUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized. Please log in.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); // Debugging
        req.body.userId = decoded.id; // Attach userId to request

        const userData = await userModel.findById(req.body.userId); // Check database
        if (!userData) {
            console.error(`User not found for ID: ${req.body.userId}`); // Debugging
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(400).json({
            success: false,
            message: error.name === 'TokenExpiredError'
                ? 'Session expired. Please log in again.'
                : 'Invalid token. Please log in again.',
        });
    }
};

export default authUser

