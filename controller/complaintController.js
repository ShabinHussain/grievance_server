/*const complaints = require('../modal/complaintModel');

exports.addComplaintController = async(req,res)=>{
    console.log('inside addComplaintcontroller');
    const userId = req.payload
    console.log(userId);
    const{name,email,phone,address,time,location,description,resolution,comment,date} = req.body 
    const documents = req.file.filename
    try {
        
            const newComplaint = new complaints({
                name,email,phone,address,time,location,description,documents,resolution,comment,date,userId
            })
            await newComplaint.save()
            res.status(200).json(newComplaint)
     
        
    } catch (error) {
        res.status(401).json(error)
        
    }


}*/


// /controllers/complaintController.js

const complaints = require('../modal/complaintModel');
const { sendMail } = require('../emailService');
const mongoose = require('mongoose');



exports.addComplaintController = async (req, res) => {
  console.log('inside addComplaintController');
  const userId = req.payload;
  console.log(userId);
  const { name, email, phone, address, time, location, description, resolution, comment, date } = req.body;
  const documents = req.file.filename;

  try {
    const newComplaint = new complaints({
      name, email, phone, address, time, location, description, documents, resolution, comment, date, userId
    });
    await newComplaint.save();

    // Send an email notification
    const subject = 'New Grievance Submitted';
    const text = `A new grievance has been submitted by ${name}.`;
    const html = `<p>A new grievance has been submitted by <strong>${name}</strong>.</p>`;
    await sendMail('superhero@example.com', subject, text, html); // Replace with actual recipient

    res.status(200).json(newComplaint);
  } catch (error) {
    res.status(401).json(error);
  }
};

{/*exports.userComplaintController = async(req,res)=>{
  const userId = req.payload
  console.log(userId);

  try {
      const userComplaint = await complaints.find({userId})
      if(userComplaint){
          res.status(200).json(userComplaint)
      }
      else{
          res.status(406).json('No Project Added Yet')
      }
      
  } catch (error) {
      res.status(401).json(error)
  }
}*/}


exports.userComplaintController = async (req, res) => {
  const userId = req.payload;
  console.log("User ID:", userId);

  try {
    if (!userId) {
      return res.status(400).json("User ID not provided");
    }

    const userComplaint = await complaints.find({userId});

    if (userComplaint.length > 0) {
      res.status(200).json(userComplaint);
    } else {
      res.status(200).json([]); // Return an empty array
    }

  } catch (error) {
    console.error("Error fetching complaints:", error); // Log the error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

{/*
exports.userComplaintController = async (req, res) => {
  const userId = req.payload; // Ensure this is the same type as in MongoDB
  console.log("User ID from Token:", userId);

  try {
    if (!userId) {
      return res.status(400).json("User ID not provided");
    }

    const userComplaints = await complaints.find({ userId: mongoose.Types.ObjectId(userId) }); // Use ObjectId if necessary
    console.log("Complaints Found:", userComplaints);

    if (userComplaints.length > 0) {
      res.status(200).json(userComplaints);
    } else {
      res.status(200).json([]); // Return an empty array if no complaints found
    }
  } catch (error) {
    console.error("Error fetching complaints:", error); // Log the error
    res.status(500).json({ message: "Internal Server Error" });
  }
};*/}





exports.getAllComplaintsController = async(req,res)=>{
   

  const searchKey = req.query.search


   // Validate that searchKey is a string
   if (searchKey && typeof searchKey !== 'string') {
      return res.status(400).json({ error: 'Search key must be a string' });
  }
  try {
      
      const query = searchKey ? {
          location:{$regex:searchKey,$options:'i'}

          
      } : {}

      const allComplaints = await complaints.find(query)
      res.status(200).json(allComplaints )
  } catch (error) {
      res.status(401).json(error)
  }
}

exports.deleteComplaintController = async(req,res)=>{
  console.log('inside delete function');
  const {id} = req.params
  console.log(id);

  try {
      //deleteOne - return true or false
      //findByIdAndDelete - document
      const complaint = await complaints.findByIdAndDelete({_id:id})
      res.status(200).json(complaint)

  } catch (error) {
      res.status(401).json(error)

  }


}


