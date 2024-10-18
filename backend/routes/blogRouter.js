const express = require('express');
const multer = require('multer')

const router = express.Router();
const blogController = require('../controllers/blogController')

const authContoller = require('../middlewares/authMiddleware')
const cloudinary = require('../utils/claudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary');



// const storage = multer.diskStorage({
//     'destination': 'uploads',
//     filename:(req,file,cb) =>{
//         cb(null,`${Date.now()}-${file.originalname}`)
//     }
// })



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: '',
        public_id: (req, file) => {
            console.log('Uploading file to Cloudinary:', file.originalname);
            return `${Date.now()}-${file.originalname}`;
        }
    }
});



const upload = multer({'storage': storage});

router
.route('/posts')
.get(blogController.getPosts);

router
.route('/post/:id')
.get(authContoller.protect,blogController.getPost);

router
.route('/addPost')
.post(authContoller.protect,upload.single('image'),blogController.addPost);

router
.route('/editPost/:id')
.patch(authContoller.protect,upload.single('image'),blogController.editPost)

router
.route('/delete/:id')
.delete(authContoller.protect,blogController.deleteAPost)





module.exports = router;
