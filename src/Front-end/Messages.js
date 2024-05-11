import "./Messages.css"
import React, { useState, useRef, useEffect } from "react";
import NavBar from "./NavBar";
import { pageTheme } from "./util";
import { Typography, Box ,Container, Grid, Paper, TextField, ThemeProvider, List, ListItem, Stack, Button } from '@mui/material';
import axios from 'axios';
import { auth } from "../login/loginconfig";

const Messages = () => {
    // State to store the user input
    const USERNAME = auth.currentUser ? auth.currentUser.email : '';
    const [inputValue, setInputValue] = useState('');
    const [convo, setConvo] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const [friends, setFriends] = useState([])
    const messagesEndRef = useRef(null);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [allMessages]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        let url = `http://localhost:8000/api/messages/getconversations/${USERNAME}`;
        axios.get(url).then((response) =>{
            setFriends(response.data);
        }).catch((_error) => {
            setFriends(["None"]);
        });
    }, [friends, USERNAME]);

    // Change the messages associated with conversation
    const handleConvoChange = async (name) => {
        setConvo(name)
        // Construct the URL with the provided emails
        const url = `http://localhost:8000/api/messages/conversation/${USERNAME}&${name}`;
        axios.get(url).then((response) =>{
            setAllMessages(response.data)
        }).catch((_error) => {
            setAllMessages([{text: "This not working", sender: USERNAME}]);
        });

    }

    const handleSend = (message) => {
        if (inputValue.trim() !== '') {
            const url = `http://localhost:8000/api/messages/postmessage/${USERNAME}&${convo}`
            const data = {
                user1: USERNAME,
                user2: convo,
                message_objects: [...allMessages, message]
            }
            axios.post(url, data).then(_res => console.log("sent")).catch(error=>console.log(error))    
            
            // Add new message to the messages array
            setAllMessages([...allMessages, message]);
            
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
                                            justifyContent: message.sender === USERNAME ? 'flex-end' : 'flex-start',
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
