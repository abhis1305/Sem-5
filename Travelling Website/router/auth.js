const express = require("express")
const router = express.Router()
//const jwt = require("jsonwebtoken")
//const bcrypt = require("bcryptjs")
//const LogInCollection = require("../models/signupSchema")
const cookieParser =require("cookie-parser")


router.get('/', (req, res) => {res.render('index')})
router.get('/signup', (req, res) => { res.render('signup') })
router.get('/signin', (req, res) => {res.render('signin')})
// router.get('/booking', (req, res) => {console.log(req.cookies.jwt);res.render('booking')})
// router.get('/contact', (req, res) => {res.render('contact')})


// router.post('/signup', async (req, res) => {
//     const {email,password,cpass}=req.body

//     if (!email || !password || !cpass ) {
//     return res.status (422).json({ error: "Plz filled the field properly" });
//     }

//     try {
//     const userExist = await LogInCollection.findOne({ email: email });
//     if (userExist) {
//     return res.status(422).json({ error: "Email already Exist" });
//     }
//     const user = new LogInCollection({email,password, cpass });
//     // Hashing
    
//     await user.save();


//    // res.status (201).json({ message: "user registered successfuly" });
//     res.status(201).render("index")
//     } 
//     catch (err) {
//     console.log(err);
//     }
// })


// router.post('/login', async (req, res) => {

//     try {
//         let token
//         const check = await LogInCollection.findOne({ email:req.body.email})

//         if (check.password === req.body.password) {
//             res.status(201).render("index", { naming: `${req.body.password}+${req.body.email}` })
//         }

//         else {
//             res.send("incorrect password")
//         }
        
//         token = await check.generateAuthToken()
//         console.log("token");
//     } 
//     catch (e) {
//         res.send("incorrect email")
//     }
// })


module.exports = router