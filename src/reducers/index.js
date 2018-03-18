import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SubjectReducer from './reducer_subject';
import SurveyReducer from './reducer_survey';

const rootReducer = combineReducers({
  subjects: SubjectReducer,
  surveys: SurveyReducer,
  form: formReducer
});

export default rootReducer;
