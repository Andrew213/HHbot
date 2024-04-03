import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import useWindowSize from '@/hooks/useWondowResize';

interface MobileBarI {
    setAutoResponseStart: (a: (prev: boolean) => boolean) => void;
    autoResponseStart: boolean;
    count: number;
}

const MobileBar: React.FC<MobileBarI> = ({
    autoResponseStart,
    setAutoResponseStart,
    count
}) => {
    const [width] = useWindowSize();
    return (
        <Box display="flex" alignItems="center">
            {width <= 500 ? (
                <Tooltip title="Запуск/остановка автоотклика">
                    <IconButton
                        onClick={() => {
                            setAutoResponseStart(prev => !prev);
                        }}
                        size="large"
                        color={autoResponseStart ? 'error' : 'success'}
                    >
                        {autoResponseStart ? (
                            <StopCircleIcon fontSize="inherit" />
                        ) : (
                            <PlayCircleIcon fontSize="inherit" />
                        )}
                    </IconButton>
                </Tooltip>
            ) : (
                <>
                    <Button
                        size="small"
                        variant="contained"
                        color={autoResponseStart ? 'error' : 'success'}
                        sx={{
                            width: '130px',
                            color: '#fff'
                        }}
                        onClick={() => setAutoResponseStart(prev => !prev)}
                        startIcon={
                            autoResponseStart ? (
                                <StopCircleIcon />
                            ) : (
                                <PlayCircleIcon />
                            )
                        }
                    >
                        {autoResponseStart ? 'Стоп' : 'Автоотклик'}
                    </Button>
                </>
            )}
            {autoResponseStart && (
                <Tooltip title="Отправленных автооткликов">
                    <Typography ml={2}>{count}</Typography>
                </Tooltip>
            )}
        </Box>
    );
};

export default MobileBar;
