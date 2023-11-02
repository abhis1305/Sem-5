const mongoose=require("mongoose")

const connectDB = async () => {
    try {
      // Compass Link 
     await mongoose.connect("mongodb+srv://abhisinghp13:13052004@tripduniya.npwi3ii.mongodb.net/");
      console.log('Mongodb connected');
    } catch (error) {
      console.log('Mongodb Server Issue');
    }
  };

module.exports = connectDB;