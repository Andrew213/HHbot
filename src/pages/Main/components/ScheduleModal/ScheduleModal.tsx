import { Box, Modal, ModalProps } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

// остановился тут. делаю модалку для запланированных откликов

const ScheduleModal: React.FC<Omit<ModalProps, 'children'>> = props => {
    return (
        <Modal {...props}>
            <Box sx={style}>asd</Box>
        </Modal>
    );
};

export default ScheduleModal;
