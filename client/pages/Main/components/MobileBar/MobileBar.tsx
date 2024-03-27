import { Box, Button, IconButton } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { useState } from 'react';
import useWindowSize from 'client/hooks/useWondowResize';

interface MobileBarI {
    message: string;
    setMessage: (a: string) => void;
    setAutoResponseStart: (a: boolean) => void;
    autoResponseStart: boolean;
}

const MobileBar: React.FC<MobileBarI> = ({
    message,
    setMessage,
    autoResponseStart,
    setAutoResponseStart
}) => {
    const [foo, setFoo] = useState(false);
    const [width] = useWindowSize();
    return (
        <Box>
            {width <= 500 ? (
                <IconButton
                    onClick={() => setFoo(prev => !prev)}
                    size="large"
                    color={foo ? 'error' : 'success'}
                >
                    {foo ? (
                        <StopCircleIcon fontSize="inherit" />
                    ) : (
                        <PlayCircleIcon fontSize="inherit" />
                    )}
                </IconButton>
            ) : (
                <>
                    <Button
                        size="small"
                        variant="contained"
                        color={foo ? 'error' : 'success'}
                        sx={{
                            width: '130px',
                            color: '#fff'
                        }}
                        onClick={() => setFoo(prev => !prev)}
                        startIcon={
                            foo ? <StopCircleIcon /> : <PlayCircleIcon />
                        }
                    >
                        {foo ? 'Стоп' : 'Автоотклик'}
                    </Button>
                    {/* <Button
                        size="small"
                        variant="contained"
                        color={foo ? 'error' : 'success'}
                        sx={{
                            width: '130px',
                            color: '#fff'
                        }}
                        //    onClick={() => setFoo(prev => !prev)}
                        startIcon={
                            foo ? <StopCircleIcon /> : <PlayCircleIcon />
                        }
                    >
                        Сопроводительное
                    </Button> */}
                </>
            )}
        </Box>
    );
};

export default MobileBar;
