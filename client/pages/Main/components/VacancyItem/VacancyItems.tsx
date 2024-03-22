import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import {
    Box,
    Button,
    Grid,
    Link,
    Paper,
    PaperProps,
    Typography,
    styled
} from '@mui/material';
import { vacancy } from 'client/store/Vacancies/VacanciesStore';
import { RefObject, forwardRef } from 'react';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(5),
    border: '10px solid',
    borderImageSlice: 1,
    borderWidth: 1,
    borderImageSource: 'linear-gradient(to left, #e01cd5, #1CB5E0)',
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
    width: 150
    // backgroundImage: 'linear-gradient(to left, #e01cd5, #1CB5E0)'
    // color: theme.palette.text.primary
}));

const ButtonStyled2 = styled(Button)(({ theme }) => ({
    width: 150,
    color: '#e01cd5',
    borderColor: '#e01cd5',
    '&:hover': {
        borderColor: '#eb14df',
        color: '#eb14df'
    }
})) as any;

const showCurrency = (salary: vacancy['salary']) => {
    if (salary) {
        const { from, to, currency } = salary;
        if (from && to) {
            return (
                <>
                    {`${from} - ${to}`}
                    {currency === 'RUR' && <CurrencyRubleIcon />}
                </>
            );
        }

        return (
            <>
                {`${from || to}`}
                {currency === 'RUR' && <CurrencyRubleIcon />}
            </>
        );
    }

    return 'з/п не указана';
};

const VacancyItem = forwardRef<React.RefObject<HTMLDivElement>, vacancy>(
    (
        { name, salary, snippet, id, alternate_url, employer, experience },
        ref
    ) => {
        return (
            <Item
                variant="outlined"
                key={id}
                ref={ref as React.RefObject<HTMLDivElement>}
            >
                <Grid display="flex" flexDirection="column" gap={5}>
                    <Box component="div" textAlign="start">
                        <Box
                            component="div"
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Typography fontWeight={700} variant="h5">
                                {name}
                            </Typography>

                            <ButtonStyled2
                                href={alternate_url}
                                variant="outlined"
                                target="_blank"
                            >
                                Открыть на HH
                            </ButtonStyled2>
                        </Box>

                        <Typography
                            color="white"
                            variant={salary ? 'h4' : 'subtitle1'}
                            mb={1}
                        >
                            {showCurrency(salary)}
                        </Typography>
                        <Link href={employer.alternate_url} target="_blank">
                            {employer?.name}
                        </Link>
                    </Box>
                    {snippet && (
                        <Box
                            component="div"
                            alignSelf="baseline"
                            textAlign="start"
                            maxWidth={800}
                        >
                            <Typography mb={2}>
                                {snippet.responsibility}
                            </Typography>

                            <Typography>{snippet.requirement}</Typography>
                        </Box>
                    )}

                    <ButtonStyled variant="contained">
                        Откликнуться
                    </ButtonStyled>
                </Grid>
            </Item>
        );
    }
);

export default VacancyItem;
