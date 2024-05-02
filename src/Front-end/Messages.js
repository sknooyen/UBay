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
    const [friends, setFriendsList] = useState(USERLIST)
    const messagesEndRef = useRef(null);

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

    const handleConvoChange = async (name) => {
        setConvo(name)
        let tempname = "bruh2"
            // Construct the URL with the provided emails
            const url = `http://localhost:8000/api/messages/conversation/${USERNAME}&${name}`;
            axios.get(url).then((response) =>{
                setAllMessages(response.data)
            }).catch((error) => {
                setAllMessages([{text: "they this not working", isSender: true}]);
            });;

            //TODO: Change the messages associated with conversation
    }
    const handleSend = (message) => {
        if (inputValue.trim() !== '') {
          
            // Add new message to the messages array
          setAllMessages([...allMessages, message]);
          //TODO: Send message to the database
          
          // Clear the input field after sending a message
          setInputValue('');
        } 
      };

    return (    
        <ThemeProvider theme = {pageTheme}>
            <div>
                <NavBar />
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Paper>
                            <Box sx={{
                                        maxHeight: 500,
                                        overflowY: 'auto',
                                        margin: 'auto'}}>
                                <Typography align="center" variant="h6">Conversations</Typography>
                                <TextField sx={{ m: 2, width: '25ch' }} id="filled-basic" label="Search" variant="filled" />

                                <Stack align="center" direction={"column"} spacing={2}>
                                    {USERLIST.map(option => 
                                        <ListItem align="center" key={option}>
                                            <Button align="center" onClick={() => {handleConvoChange(option);}}>
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
                                        maxHeight: 500,
                                        overflowY: 'auto',
                                        margin: 'auto'}}>
                                    <List>
                                        {allMessages.map((message, index) => (
                                            <ListItem key={index} sx={{
                                                display: 'flex',
                                                justifyContent: message.sender==USERNAME ? 'flex-end' : 'flex-start',
                                                padding: '10px'
                                            }}>
                                            <Typography variant="body1">{message.message}</Typography>
                                        </ListItem>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </List>
                                </Box>
                            </Paper>
                        </Grid>
                            <Box sx={{ position: 'fixed', bottom: "8%", width: '50%', padding: 1, right:'19%' }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    label="Send a message..."
                                    variant="outlined"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Button variant="contained" sx={{ position: 'fixed', bottom: '10%', width: '8%', padding: 1, right:'10%' }} 
                                    onClick={() => { handleSend({text: inputValue, isSender: true}) }}>
                                    Send
                            </Button>
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    )
}


 export default Messages