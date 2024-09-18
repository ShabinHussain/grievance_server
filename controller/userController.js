const users = require("../modal/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//register 
exports.registerController = async(req,res)=>{
    const{username,email,password} = req.body
   try {
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json("account already existing")
    }
    else{
        //use bcrypt for password hashing 
        const salt = await bcrypt.genSalt(8)
        hashedpassword = await bcrypt.hash(password,salt)
        req.body.password = hashedpassword
        const newUser = new users(req.body)
    
    
        await newUser.save() //saving to backend
        res.status(200).json(newUser)

    }

   

    
   } catch (error) {

    res.status(401).json(`registration failed due to ${error}`)
    
   }

    
}

//login
exports.loginController = async(req,res)=>{
    const{email, password} = req.body
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            console.log(existingUser);

            const pswd_match = await bcrypt.compare(password,existingUser.password)

            if(pswd_match){
                const token = jwt.sign({userId:existingUser._id},'supersecretkey')
          
            
            res.status(200).json({existingUser,token})

            }else{
                res.status(404).json('invalid password')
            }
            
            
        }else{
            console.log('no exisiting user');
            res.status(404).json('invalid emailid or password')
        }
        
    } catch (error) {
        res.status(401).json(error)
        
    }
}

//edit profile
exports.editProfileController = async(req,res)=>{
    const userId = req.payload

    const {username,email,password,profile} = req.body

    const profileImage = req.file? req.file.filename: profile

       
    try {

        const userProfile = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,profile:profileImage      //title:title etc

        },{new:true})      //new:true to send new data 

        await userProfile.save()
        res.status(200).json(userProfile)
        
    } catch (error) {
        res.status(401).json(error)

    }
}


