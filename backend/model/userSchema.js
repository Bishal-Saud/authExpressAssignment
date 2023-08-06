const mongoose = require("mongoose");
// const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [20, "Name must be less than 20 char"],
    minLength: [5, "Name must be more than 5 char"],
    trim: true,
  },
  username : {
    type:String,
   required:true,
   unique:true,
},
  email: {
    type: String,
    required: [true, "Email is required"],
    unique:[true,"Already registered"],
    lowercase:true,
    unique:true,

  },
  password: {
    type: String,
    select:false
  },
  bio : {
    type:String,
    required:true
},

},
{timestamps:true}
);

//Hash password before saving to the database
userSchema.pre('save',async function(next){
//If password is not modified than do not hash it
if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password,10)
  return next();
})

// FIXME: Check if these methods are working as expected
userSchema.methods={
  //Method for generating the jwt token
  jwtToken(){
    return JWT.sign(
      {id:this._id,email:this.email},
      process.env.SECRET,
      {expiresIn:'24h'} //24 hours

    )
  }

}

const userModel= mongoose.model("user", userSchema);
module.exports = userModel