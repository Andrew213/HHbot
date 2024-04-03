import { Box, Button, Link, Paper, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            width="100%"
            height="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            developed by
            <Link href="https://kochanov-web.com/" target="_blank">
                Andrey Kochanov
            </Link>
        </Box>
    );
};

export default Footer;
