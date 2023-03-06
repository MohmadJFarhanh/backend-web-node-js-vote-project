import { Router } from "express";
import * as authController from './controller/auth.controller.js';

const router = Router();

// sign up
router.post("/addUser",authController.signup);

// confirm email
router.get('/confirmEmail/:token',authController.confirmEmail);

// sign in
router.get("/signin",authController.signin);

// recover account
router.get('/recoveraccount',authController.recoverAccount);

// recover chick code
router.get('/recoveraccount/checkcode',authController.recoverAccountCheckCode);

// recover set new password 
router.patch('/recoveraccount/newpassword/:token',authController.recoverAccountSetNewPassword);



export default router;

