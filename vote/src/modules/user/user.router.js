import { Router } from "express";
import * as userController from './controller/user.controller.js';
import { auth } from './../../middleware/auth.js';
import { myMulter } from "../../services/multer.js";
// import { HME } from './../../services/multer.js';
const router = Router();
// show user info
router.get('/profile',auth('public'),userController.profile);
// upload profile pic
router.patch('/profilePic',auth('public'),myMulter('image').single('image'),userController.profilePic);
// delete user
router.delete('/deleteuser',auth('public'),userController.deleteUser);
export default router;

