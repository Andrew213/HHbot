import { Grid } from '@mui/material';
import useAction from 'client/hooks/useAction';
import { useEffect } from 'react';
import Header from './components/Header/Header';
import { useTypedSelector } from 'client/hooks/useTypedSelector';
import { useSearchParams } from 'react-router-dom';
const Main = () => {
    return (
        <>
            <Header />
        </>
    );
};

export default Main;
