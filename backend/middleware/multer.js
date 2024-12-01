import multer from "multer";

const storage=multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload =multer({storage})

export default upload

// import multer from "multer";
// import fs from "fs";

// const storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         const uploadPath = 'uploads/';
//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath);
//         }
//         callback(null, uploadPath);
//     },
//     filename: function (req, file, callback) {
//         callback(null, Date.now() + '-' + file.originalname); // Add timestamp for uniqueness
//     }
// });

// const upload = multer({ storage });

// export default upload; // Ensure this line exists

