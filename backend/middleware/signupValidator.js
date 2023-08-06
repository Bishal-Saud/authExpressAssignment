exports.signUpValidator = (req,res,next)=>{
    const{name,email,username,password,bio} = req.body;
    if(req.body && name && email && password && bio && username){
        next()
    }else{
        res.status(404).send({msg:"all Input Fields are required"})
    }
}

// module.exports = {signUpValidator};