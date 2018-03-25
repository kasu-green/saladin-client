import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SubjectReducer from './reducer_subject';
import SurveyListReducer from './reducer_surveylist';
import SurveyReducer from './reducer_survey';
import FoodSearch from './reducer_foodsearch';
import LocaleReducer from './reducer-locale';
import DiaryReducer from './reducer_diary';
import ComponentsReducer from './reducer_components';
const rootReducer = combineReducers({
  subjects: SubjectReducer, // current list of subjects
  surveys: SurveyListReducer, // current list of surveys
  survey: SurveyReducer, // current survey
  diary: DiaryReducer, // current diary
  form: formReducer,
  foods: FoodSearch, // current food search
  locale: LocaleReducer, // current locale
  components: ComponentsReducer, // current list of subjects
});

export default rootReducer;
