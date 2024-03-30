import { AppBar, Toolbar, Typography, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <AppBar position="sticky" className='customBar'>
            <Toolbar>
            <Typography variant="h6" flexGrow={1}>UBay</Typography>
            <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
            <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
            <Button color="inherit" onClick={() => navigate('/watchlist')}>Watchlist</Button>
            <Button color="inherit" onClick={() => navigate('/sell')}>Sell</Button>
            <Button color="inherit" onClick={() => navigate('/messages')}>Messages</Button>
            </Toolbar>
        </AppBar>
    )
}

 export default NavBar