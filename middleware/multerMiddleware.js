//multer
//import multer
const multer = require('multer')

//store file
const storage = multer.diskStorage({ 
    //where the file is stored
    destination:(req,file,callback)=>{
      callback(null,'./uploads') 
    },
    //by which name the file should be stored
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)//setting file name

    }
})

const fileFilter =(req,file,callback) =>{
    //logic
    if(file.mimetype=='image/png' || file.mimetype=='image/jpg' || file.mimetype=='image/jpeg'){  
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error('only png,jpeg,jpg files are accepted'))
    }
}

const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig

