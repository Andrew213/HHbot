import Button from '@mui/material/Button';
import { useTypedSelector } from 'client/hooks/useTypedSelector';
import { useEffect } from 'react';

const Page = () => {
    const { jwt, ip } = useTypedSelector(state => state.User);
    useEffect(() => {
        console.log(`jwt `, jwt);
        console.log(`ip `, ip);
    }, [jwt, ip]);

    return (
        <Button
            variant="outlined"
            color="success"
            href={`https://hh.ru/oauth/authorize?response_type=code&client_id=${process.env.CLIENT_ID}`}
        >
            Hello world
        </Button>
    );
};

export default Page;
