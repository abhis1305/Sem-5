const mongoose=require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const logInSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpass:{
        type:String,
        required:true
    },
    tokens: [
        {
            token:{
                type:String,
                required:true
                }
        }
    ]
})



// PASSWORD Hasing

logInSchema.pre('save',async function (next){
     if(this.isModified("password")){
       // const passwordHash = await bcrypt.hash(password,10)
       // console.log("pass is ${this.password}");
        this.password = await bcrypt.hash(this.password,10)
       // console.log('pass is ${this.password}');
     //   this.cpass = undefined
        this.cpass = await bcrypt.hash(this.cpass,10)
     }
    next()
})

// We are generating Token
logInSchema.methods.generateAuthToken = async function () {
    try {
        // const token = jwt.sign({_id: this._id }, process.env.SECRET_KEY);
      //  console.log(this._id);
        const token = jwt.sign({_id: this._id.toString()}, process.env.KEY);
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token
    } catch (err) {
        res.send("error part" + err)
      //  console.log("error part" + err)
    }
} 
//Signup_info
const LogInCollection=new mongoose.model('Signup_info',logInSchema)

module.exports=LogInCollection