const express=require("express");
const webpush= require("web-push");
const path = require("path");

const app=express();

require("dotenv").config();

app.use(express.static(path.join(__dirname,"client")));

const publicVapidKey= process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
webpush.setVapidDetails(
    "mailto:example@yourdomain.org",
    publicVapidKey,
    privateVapidKey
);
const PORT= process.env.PORT || 8000;


app.use(express.json());

// when client subscribes,server sends notification to serviceWorker 
app.post("/subscribe",(req,res)=>{
    const subscription= req.body;
    res.status(201).json({});

    //Create Payload
    const payload= JSON.stringify({title:"Push Test"});

    //Pass obj into sendNotification
    webpush.sendNotification(subscription,payload).catch(err=>console.error(err));
});

app.listen(PORT,()=>console.log("Server started at",PORT));