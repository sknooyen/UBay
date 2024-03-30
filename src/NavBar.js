import { AppBar, Toolbar, Typography, Button} from '@mui/material';

const NavBar = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
            <Typography variant="h6" flexGrow={1}>UBay</Typography>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Profile</Button>
            <Button color="inherit">Watchlist</Button>
            <Button color="inherit">Sell</Button>
            <Button color="inherit">Messages</Button>
            </Toolbar>
        </AppBar>
    )
}

 export default NavBar