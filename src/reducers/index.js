import { combineReducers } from 'redux';
import SubjectReducer from './reducer_subject';
const rootReducer = combineReducers({
  subjects: SubjectReducer
});

export default rootReducer;
