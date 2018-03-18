import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SubjectReducer from './reducer_subject';
import SurveyListReducer from './reducer_surveylist';
import SurveyReducer from './reducer_survey';
const rootReducer = combineReducers({
  subjects: SubjectReducer,
  surveys: SurveyListReducer,
  survey: SurveyReducer,
  form: formReducer
});

export default rootReducer;
