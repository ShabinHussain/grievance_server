//middleware is used to verify jsonwebtoken
const jwt = require('jsonwebtoken')


const jwtmiddleware =(req,res,next) =>{

   //logic
    console.log('Inside jwt middleware');
    //access token
    console.log(req.headers);
    
    const token = req.headers["authorization"].split(' ')[1] 

    //verify
    try{
        const jwtResponse = jwt.verify(token,'supersecretkey')
        console.log(jwtResponse);
        req.payload= jwtResponse.userId 
        next()  
        
    }catch(error){
        res.status(401).json('Authorization failed ...please login',error)
    }

   

}

module.exports = jwtmiddleware


{/*const jwt = require('jsonwebtoken');

const jwtmiddleware = (req, res, next) => {
    console.log('Inside jwt middleware');
    console.log(req.headers);

    // Check if the Authorization header is present
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Split the header to get the token
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token missing from Authorization header' });
    }

    try {
        // Verify the token
        const jwtResponse = jwt.verify(token, 'supersecretkey');
        console.log(jwtResponse);
        
        // Attach the user ID to the request object
        req.payload = jwtResponse.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authorization failed, please login', error: error.message });
    }
};

module.exports = jwtmiddleware;*/}
