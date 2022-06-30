import express  from 'express';
import routerFun  from "./routerFunc.js";

const router = express.Router();

router.get("/movies", routerFun.movies);


router.post("/login", routerFun.loginUser);


router.post("/signUp", routerFun.signUpUser);

router.post("/bookTicket", routerFun.bookTicket);


export default router;
