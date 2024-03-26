import {
    Grid,
    SpeedDial,
    SpeedDialAction,
    TextField,
    Tooltip
} from '@mui/material';
import Header from './components/Header/Header';
import VacanciesList from './components/VacanciesList/VacanciesList';
import { useState } from 'react';
import useWindowSize from 'client/hooks/useWondowResize';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import MessageIcon from '@mui/icons-material/Message';

const actions = [
    { icon: <PlayCircleIcon color="success" />, name: 'Start' },
    { icon: <StopCircleIcon color="error" />, name: 'Stop' },
    { icon: <MessageIcon />, name: 'Message' }
];

const Main = () => {
    const [message, setMessage] = useState<string>('');

    const [width] = useWindowSize();

    return (
        <>
            <Header />
            <Grid container spacing={4} paddingLeft={'40px'}>
                {width >= 900 ? (
                    <Grid
                        item
                        xs={4}
                        sx={{
                            paddingLeft: '40px',
                            position: 'relative'
                        }}
                    >
                        <Tooltip title="Введите сопроводительное, которое будет отправляться с откликом.">
                            <TextField
                                label="Сопроводительное письмо (достаточно просто ввести)"
                                sx={{
                                    width: '100%'
                                }}
                                multiline
                                value={message}
                                onChange={e => {
                                    setMessage(e.target.value);
                                }}
                            />
                        </Tooltip>

                        {/* <Button type="reset">Очистить поле</Button> */}
                    </Grid>
                ) : (
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'fixed', bottom: 16, right: 34 }}
                        icon={<SpeedDialIcon />}
                    >
                        {actions.map(action => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
                        ))}
                    </SpeedDial>
                    // <Fab sx={{ position: 'fixed',  }}>
                    //     <TextField
                    //         label="Сопроводительное письмо (достаточно просто ввести)"
                    //         sx={{
                    //             width: '100%'
                    //         }}
                    //         multiline
                    //         value={message}
                    //         onChange={e => {
                    //             setMessage(e.target.value);
                    //         }}
                    //     />
                    // </Fab>
                )}

                <Grid xs={12} md={8} lg={8} item>
                    <VacanciesList message={message} />
                </Grid>
            </Grid>
        </>
    );
};

export default Main;
