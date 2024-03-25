import { Grid, Paper } from '@mui/material';
import Header from './components/Header/Header';
import VacanciesList from './components/VacanciesList/VacanciesList';

const Main = () => {
    return (
        <>
            <Header />
            <Grid container spacing={4} paddingLeft={'40px'}>
                <Grid
                    item
                    xs={4}
                    sx={{
                        paddingLeft: '40px'
                    }}
                >
                    <Paper sx={{ backgroundColor: 'blue' }}>
                        Тут будет сортировка и возможность рассылки
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <VacanciesList />
                </Grid>
            </Grid>
        </>
    );
};

export default Main;
