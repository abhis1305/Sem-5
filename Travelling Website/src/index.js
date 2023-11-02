const dotenv = require("dotenv")
const express = require("express")
const path = require("path")
const app = express()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser =require("cookie-parser")
const auth = require("../middleware/auth")

// Connection Of Schema Files
const LogInCollection = require("../models/signupSchema")
const Contact_Us = require("../models/contactSchema")
const Booking = require("../models/bookingSchema")

// Connection Of MongoDB File
const connectDB = require("../db/conn");

//mongodb connection
connectDB();

 dotenv.config({ path: './.env' })
const port = process.env.PORT 

// Link the router file
 app.use(require("../router/auth"))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))

app.get('/booking', auth , (req, res) => {
    res.render('booking')})

app.get('/contact',auth, (req, res) => {
    res.render('contact')})

app.get('/logout',auth, async(req, res) => {
    try{

        // DELETETING COOKIES FOR ONE DEVICE
         req.user.tokens = req.user.tokens.filter((currElement) => {
             return currElement.token != req.token
             })

        // DELETETING COOKIES FOR ALL DEVICE
        // req.user.tokens = []

         res.clearCookie("jwt")
         console.log("Logout Done");
         await req.user.save()
         res.render("signin")
    }
    catch (error){
        res.status(500).send(error)
    }
    // res.render('contact')
})



//console.log(process.env.KEY);

// app.post('/signup', async (req, res) => {

//     const data={
//         email: req.body.email,
//         password: req.body.password,
//         cpass: req.body.cpass
//     }  

//     const checking = await LogInCollection.findOne({ email:req.body.email })

//    try{
//     if (checking.email === req.body.email)  {
//      //   res.send("email exits")
//         return res.status(422).json({ error: "Email already Exist" });
//     }
//     else{
//         await LogInCollection.insertMany([data])
//         res.status (201).json({ message: "user registered successfuly" });
//         res.status(201).render("index")
//     }
//    }
// //    catch{
// //     // res.send("wrong inputs")
// //     await LogInCollection.insertMany([data])
// //    }
  
    
//     catch (err) {
//     console.log(err);
//     }

// //     res.status(201).render("index", {
// //         naming: req.body.email
// //     })
//  })

// OG SIGNUP ROUTE

app.post('/signup', async (req, res) => {
    const {email,password,cpass}=req.body


    if (!email || !password || !cpass ) {
    return res.status (422).json({ error: "Plz filled the field properly" });
    }

    try {
    const userExist = await LogInCollection.findOne({ email: email });
    if (userExist) {
    return res.status(422).json({ error: "Email already Exist" });
    }else if(password != cpass){
        return res.status(422).json({ error: "Pass are Not Matching" });
    }
    else{
        const user = new LogInCollection({email,password, cpass });


        // TOKEN SYSTEM

   // console.log("part" + user )
    const token = await user.generateAuthToken()
  //  console.log("part" + token);

//   res.cookie(name,value,[options])
  res.cookie("jwt", token)
 // console.log(cookie)

    await user.save();


   // res.status (201).json({ message: "user registered successfuly" });
    res.status(201).render("signin")
    } 
    } 
    catch (err) {
    console.log(err);
    }
})



// app.post("/signup", async (req, res) =>{
//     try {
//         const password = req.body.password;
//         const cpass = req.body.cpass;

//         if(password === cpass) {
//     const registerEmployee = new Register({
//         email: req.body.email,
//         password: req.body.password,
//         cpass: req.body.cpass
//     })
//     const LogInCollection = await LogInCollection.save();
//     res.status (201).render("index");
//     }else{
//     res.send("password are not matching")
//     }
//     } catch (error) {
//     res.status(400).send(error);
//     }
//     })







// OG LOGIN POST ROUTE DONT TOUCHE IT


// app.post('/login', async (req, res) => {

//     try {
//         const check = await LogInCollection.findOne({ email:req.body.email})

//         if (check.password === req.body.password) {
//             res.status(201).render("index", { naming: `${req.body.password}+${req.body.email}` })
//         }

//         else {
//             res.send("incorrect password")
//         }
//     } 
//     catch (e) {
//         res.send("incorrect email")
//     }
// })


app.post('/signin', async (req, res) => {

    try {
        const {email,password}=req.body
        const check = await LogInCollection.findOne({ email:email})
        

        const isMatch = await bcrypt.compare(password, check.password)


        // Middleware

        const token = await check.generateAuthToken()
     //   console.log("part are" + token);


      res.cookie("jwt", token)

    //  console.log(req.cookies.jwt);

        if (isMatch) {
            res.status(201).render("index", { naming: `${req.body.password}+${req.body.email}` })
        }

        else {
            res.send("incorrect password")
        }
    } 
    catch (e) {
        res.send("incorrect email")
    }
})


// app.post("/login", async(req, res) =>{
//     try {
//     const email = req.body.email;
//     const password = req.body.password;

//     const useremail = await Register.findOne({email:email});

//     if(useremail.password === password) {
//     res.status (201).render("index");
//     }else{
//     res.send("invalid login Details");
//     }
//     } catch (error) {
//     res.status (400).send("invalid login Details")
//     }
//     })





app.post('/contact', async (req, res) => {
    
    const data={
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        messgage: req.body.messgage
    }

     await Contact_Us.insertMany([data])

     res.render("index")
 })



 app.post('/booking', async (req, res) => {
    
    const data={
        visitor_name: req.body.visitor_name,
        visitor_email: req.body.visitor_email,
        visitor_phone: req.body.visitor_phone,
        total_adults: req.body.total_adults,
        total_children: req.body.total_children,
        checkin: req.body.checkin,
        checkout: req.body.checkout,
        pacakage_preference: req.body.pacakage_preference,
        visitor_message: req.body.visitor_message
    }

     await Booking.insertMany([data])

      res.render("index")
  })



// const jwt =require("jsonwebtoken")

// const createToken = async()=>{
//     const token = await jwt.sign({_id:"653de4a52ca064c61d7081c6"}, "MYNAMEISABHISHEKSINGHILIVEINULHASNAGAR")
//     console.log(token)

//     const userVer = await jwt.verify(token, "MYNAMEISABHISHEKSINGHILIVEINULHASNAGAR")
//     console.log(userVer)
// }

// createToken()

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
})

