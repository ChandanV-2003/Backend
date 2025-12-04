const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');


const app = express();
const port = 3000;

async function configureDB(){
    try{
      const db = await mongoose.connect('mongodb://localhost:27017/json-holder-2025')
      console.log('connected to db');
    }catch(err){
        console.log('err connected to db');
    }
}
configureDB();

const jsonSchema = new mongoose.Schema({
    userId:Number,
    name:String,
    email:String
},{timestamps:true});

const model = mongoose.model('model',jsonSchema);



app.get('/user/:id',async (req,res) =>{
  const id = req.params.id; 
  //console.log(id);
  // res.json(id);
  try{
   let user = await model.findOne({ userId : id });
   console.log(user);
    if (!user) {
     const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  // save new user...
        const newUser = new model({
        userId : response.data.id,
        name : response.data.name,
        email : response.data.email
      })
      await newUser.save();
      return res.status(200).json(newUser);
    }
    return res.status(200).json(user);
  }catch(err){
    console.log(err.response.data);
    res.status(404).json({ message : " user not found "})
  }
});

app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
});