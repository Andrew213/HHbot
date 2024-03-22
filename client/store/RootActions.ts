import * as loginActions from './Login/actions';
import * as userActions from './User/actions';
import * as vacanciesActions from './Vacancies/actions';

const actions = {
    ...loginActions,
    ...userActions,
    ...vacanciesActions
};

export default actions;
