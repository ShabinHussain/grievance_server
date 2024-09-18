const admins = require("../modal/adminModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



//adminregister 
exports.adminRegisterController = async(req,res)=>{
    const{username,email,password} = req.body
   try {
    const existingAdmin = await admins.findOne({email})
    if(existingAdmin){
        res.status(406).json("account already existing")
    }
    else{
        //use bcrypt for password hashing 
        const salt = await bcrypt.genSalt(8)
        hashedpassword = await bcrypt.hash(password,salt)
        req.body.password = hashedpassword
        const newAdmin = new admins(req.body)
    
    
        await newAdmin.save() //saving to backend
        res.status(200).json(newAdmin)

    }

   

    
   } catch (error) {

    res.status(401).json(`registration failed due to ${error}`)
    
   }

    
}


//adminlogin
exports.adminLoginController = async(req,res)=>{
    const{email, password} = req.body
    try {
        const existingAdmin = await admins.findOne({email})
        if(existingAdmin){
            console.log(existingAdmin);

            const pswd_match = await bcrypt.compare(password,existingAdmin.password)

            if(pswd_match){
                const token = jwt.sign({userId:existingAdmin._id},'supersecretkey')
          
            
            res.status(200).json({existingAdmin,token})

            }else{
                res.status(404).json('invalid password')
            }
            
            
        }else{
            console.log('no exisiting Admin');
            res.status(404).json('invalid emailid or password')
        }
        
    } catch (error) {
        res.status(401).json(error)
        
    }
}