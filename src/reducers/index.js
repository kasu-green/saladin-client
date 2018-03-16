import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SubjectReducer from './reducer_subject';


const rootReducer = combineReducers({
  subjects: SubjectReducer,
  form: formReducer
});

export default rootReducer;
