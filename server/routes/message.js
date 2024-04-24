const Message = require("../models/Message")
const { route } = require("./auth");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")

const router = require("express").Router();

let collection = db.collection("Chat Logs")

//Starts a chat between two users
router.newChat("/", async (req, res)=> {
   try{
        let newChat = {
            user1 : req.body.user1,
            user2 : req.body.user2,
            message_objects: []
        }
        let result = await collection.insertOne(newChat)
        res.send(result).status(204);
    }catch(err){
        console.error(err);
        res.status(500).send("Error starting new chat")
    }
})

    //adds a new message object to the list
   
   router.newMessage("/", async (req, res)=> {
        try{
            let message_object = {
                sender: req.body.sender,
                message: req.body.message,
                time: req.body.time
            }

            let query = {user1:req.body.user1, user2:req.body.user2}
            let update = {
                    $push: {
                        message_objects: message_object
                    }
            }
            let result = await collection.updateOne(query,update);
        
        }catch(err){
            console.error("error occured: ", err)
        }
        
    })
