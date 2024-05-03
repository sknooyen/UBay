import "./Messages.css"
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from 'react-dom'
import NavBar from "./NavBar";
import { pageTheme } from "./util";
import { Typography, Box, TextareaAutosize ,Container, Grid, Paper, TextField, ThemeProvider, List, ListItem, Checkbox, ListItemText, Slider, Input, MenuItem, Select, Stack, Button } from '@mui/material';
import axios from 'axios';
import { auth } from "../login/loginconfig";


// }
// const handleNewChat = () =>{
//     axios.newChat('http://localhost:8000/api/messages',data).then(res => {
//         // clear the form fields
//         // notify user that their listing was posted
//       }).catch(error => {
//         console.error('Error posting data:', error);
// })}

//sample messages only sent by the current user

//param to pass in through axios, need component to operate with verified email address
export const USERNAME = "bruh1"

export const USERLIST = ["Buyer1", "Seller1", "Buyer2", "Selling2"]

const messages = [
    { text: "Hi there!", isSender: false },
    { text: "Hello! How are you?", isSender: true },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },
    { text: "I'm good, thanks for asking. What about you?", isSender: false },


];



const Messages = () => {
    // State to store the user input
    const userEmail = auth.currentUser ? auth.currentUser.email : '';
    const [allConvos, setAllConvos] = useState('')
    const [inputValue, setInputValue] = useState('');
    const [convo, setConvo] = useState(USERLIST[0])
    const [allMessages, setAllMessages] = useState(messages)
    const [friends, setFriends] = useState(USERLIST)
    const messagesEndRef = useRef(null);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [allMessages]);

    // const handleMessageInput = (message) => {
    //     setAllMessages([...allMessages, message])
    //     //TODO: Set allMessages to what the database returns
    // }
    // Function to handle changes in the text field
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        let url = `http://localhost:8000/api/messages/getconversations/${USERNAME}`;
        axios.get(url).then((response) =>{
            setFriends(response.data)
        }).catch((error) => {
            setFriends(["None"]);
        });
    }, [friends]);

    //Get the messages list to update and dispaly the new message that was recieved when the other person sends you that message
    // useEffect(() => {
    //     let url = `http://localhost:8000/api/messages/conversation/${USERNAME}&${convo}`;
    //     axios.get(url).then((response) =>{
    //         setAllMessages(response.data)
    //     }).catch((error) => {
    //         setAllMessages(["None"]);
    //     });
    // }, [allMessages])

    const handleConvoChange = async (name) => {
        setConvo(name)
        // Construct the URL with the provided emails
        const url = `http://localhost:8000/api/messages/conversation/${USERNAME}&${name}`;
        axios.get(url).then((response) =>{
            setAllMessages(response.data)
        }).catch((error) => {
            setAllMessages([{text: "they this not working", sender: USERNAME}]);
        });

            //TODO: Change the messages associated with conversation
    }
    const handleSend = (message) => {
        if (inputValue.trim() !== '') {
            const url = `http://localhost:8000/api/messages/postmessage/${USERNAME}&${convo}`
            const data = {
                user1: USERNAME,
                user2: convo,
                message_objects: [...allMessages, message]
            }
            axios.post(url, data).then(res => console.log("sent")).catch(error=>console.log(error))    
            
                // Add new message to the messages array
            setAllMessages([...allMessages, message]);
            //TODO: Send message to the database
            
            // Clear the input field after sending a message
            setInputValue('');
        } 
      };

      return (<ThemeProvider theme={pageTheme}>
        <div>
            <NavBar />
            <Container sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Grid container spacing={2} sx={{ flex: 1 }}>
                    <Grid item xs={3}>
                        <Paper>
                            <Box sx={{
                                height: screenHeight * 0.7,
                                overflowY: 'auto',
                                margin: 'auto'
                            }}>
                                <Typography align="center" variant="h6">Conversations</Typography>
                                <TextField sx={{ m: 2, width: '25ch' }} id="filled-basic" label="Search" variant="filled" />
    
                                <Stack align="center" direction={"column"} spacing={2}>
                                    {friends.map(option =>
                                        <ListItem align="center" key={option}>
                                            <Button align="center" onClick={() => { handleConvoChange(option); }}>
                                                {option}
                                            </Button>
                                        </ListItem>
                                    )}
                                </Stack>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper>
                            <Typography align="center" variant="h6">{convo}</Typography>
                            <Box sx={{
                                height: screenHeight * 0.57,
                                overflowY: 'auto',
                                margin: 'auto'
                            }}>
                                <List>
                                    {allMessages.map((message, index) => (
                                        <ListItem key={index} sx={{
                                            display: 'flex',
                                            justifyContent: message.sender == USERNAME ? 'flex-end' : 'flex-start',
                                            padding: '10px'
                                        }}>
                                            <Typography variant="body1">{message.message}</Typography>
                                        </ListItem>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </List>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '6px' }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    label="Send a message..."
                                    variant="outlined"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                                <Box sx={{ marginLeft: '10px' }}> {/* Added margin to create space */}
                                    <Button variant="contained" onClick={() => { handleSend({ message: inputValue, sender: USERNAME }) }}>
                                        Send
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    </ThemeProvider>
    )
}


 export default Messages
