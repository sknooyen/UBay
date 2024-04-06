import { AppBar, Toolbar, Typography, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { pageTheme } from './util';

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={pageTheme}>
            <AppBar position="sticky">
                <Toolbar>
                <Typography variant="h6" flexGrow={1}>UBay</Typography>
                <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
                <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
                <Button color="inherit" onClick={() => navigate('/watchlist')}>Watchlist</Button>
                <Button color="inherit" onClick={() => navigate('/sell')}>Sell</Button>
                <Button color="inherit" onClick={() => navigate('/messages')}>Messages</Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default NavBar