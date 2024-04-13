import NoSsr from '@mui/material/NoSsr';
import AppRouter from '@/routers';
const Wrapper = () => {
    return (
        <NoSsr>
            <AppRouter />
        </NoSsr>
    );
};
export default Wrapper;
