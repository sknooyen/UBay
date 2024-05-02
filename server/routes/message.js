const Message = require("../models/Message")
const { route } = require("./auth");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")

const router = require("express").Router();

// let collection = db.collection("Chat Logs")

router.post('/postmessage/:useremail&:otheremail', async (req, res) => {
    let newChat = await Message.findOneAndUpdate(
        { $or: [{user1: req.params.useremail, user2: req.params.otheremail}, {user1: req.params.otheremail, user2: req.params.useremail}]},
        { user1: req.params.useremail, user2: req.params.otheremail, message_objects: req.body.message_objects},
        { new: true, upsert: true }

    )

    try {
        const dataToSave = await newChat.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.get('/conversation/:useremail&:otheremail', async (req, res) => {
    try{
        let data = await Message.findOne({
            $or: [
                    {user1: req.params.useremail, user2: req.params.otheremail},
                    {user1: req.params.otheremail, user2: req.params.useremail}
                ]
        });
        if (data){
            res.status(200).json(data.message_objects)
        }
        else {res.status(200).json([])}

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/getconversations/:useremail', async (req, res) => {
    try{
        let data = await Message.find({
            $or: [
                    {user1: req.params.useremail},
                    {user2: req.params.useremail}
                ]
        });
        data = data.map(convo => {
            if (convo.user1 == req.params.useremail){
                return convo.user2
            }
            else {
                return convo.user1
            }
        });
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Starts a chat between two users
// router.post("/", async (req, res)=> {
//    try{
//         let newChat = {
//             user1 : req.body.user1,
//             user2 : req.body.user2,
//             message_objects: []
//         }
//         let result = await collection.insertOne(newChat)
//         res.send(result).status(204);
//     }catch(err){
//         console.error(err);
//         res.status(500).send("Error starting new chat")
//     }
// })

//     //adds a new message object to the list
   
//    router.post("/", async (req, res)=> {
//         try{
//             let message_object = {
//                 sender: req.body.sender,
//                 message: req.body.message,
//                 time: req.body.time
//             }

//             let query = {user1:req.body.user1, user2:req.body.user2}
//             let update = {
//                     $push: {
//                         message_objects: message_object
//                     }
//             }
//             let result = await collection.updateOne(query,update);
        
//         }catch(err){
//             console.error("error occured: ", err)
//         }
        
//     })

//     router.get("/", async(req,res)=>{
//         try{
//             let chat = collection.find({user1: req.user1, user2: req.user2})
//             res.status(200).json(chat)
//         }catch(error){
//             res.status(500).json(err)
//         }
//     })
    
    
    
module.exports = router