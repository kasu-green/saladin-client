import axios from 'axios';
import Moment from 'moment';
import  history  from '../history';
export const FETCH_SUBJECTS = 'FETCH_SUBJECTS';
export const SEARCH_SUBJECTS = 'SEARCH_SUBJECTS';
export const ADD_SUBJECT = 'ADD_SUBJECT';
export const ADD_SURVEY = 'ADD_SURVEY';
export const UPDATE_SURVEY = 'UPDATE_SURVEY';
export const FETCH_SURVEY = 'FETCH_SURVEY';
export const UPDATE_SUBJECT = 'UPDATE_SUBJECT';
export const FETCH_SURVEYS = 'FETCH_SURVEYS';
export const ADD_SURVEY_DAY = 'ADD_SURVEY_DAY';
export const FOOD_SEARCH = 'FOOD_SEARCH';
export const CHANGE_LOCALE = 'CHANGE_LOCALE';
export const FETCH_DIARY = 'FETCH_DIARY';
export const ADD_INGESTA = 'ADD_INGESTA';
export const SELECT_SUBJECT = 'SELECT_SUBJECT';
export const FETCH_COMPONENTS = 'FETCH_COMPONENTS';

export const AUTHENTICATED = 'AUTHENTICATED';
export const UNAUTHENTICATED = 'UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

export const ROOT_URL= 'http://localhost:3000/';
export const API_KEY = '?key=abcdef';
export const getAPIUrl=(urlpart)=>{
  return `${ROOT_URL}${urlpart}${API_KEY}`;
}

export const createRequest=  (urlpart)=>{
  const url = getAPIUrl(urlpart);

  return axios.create({
    baseURL: ROOT_URL,
    timeout: 1000,
    headers: {'Authorization': 'Bearer '+ localStorage.getItem('token')}
  });
}

export const EMPTY_SURVEY =  {
    _id:-1,
    date: Moment().format('YYYY-MM-DD'),
    subject_id: -1,
    comment:'',
    diaries:[]
};

export function authenticate(email,password){

  return async (dispatch) => {
    try {
      const URL = `${ROOT_URL}user/authenticate/`;
      const res = await axios.post(URL,{email,password});
      debugger;
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('token', res.data.token);
    //  history.push('/secret');
    //  history.push('/subjects');
    } catch(error) {
      debugger;
      console.log(error);
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}


export function logout(){
  return async (dispatch) => {
      localStorage.removeItem('token');
      window.location.href='/';
      dispatch({
        type: UNAUTHENTICATED,
        payload: 'User logged out'
      });
  };
}

export function checkSession(){

  return async (dispatch) => {
    try {
      var res = await  createRequest().get('/user/current');
      dispatch({ type: AUTHENTICATED });
      debugger;
//      history.push('/subjects');
    } catch(error) {
      debugger;
      console.log(error);
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid token'
      });
    }
  };
}

export function changeLocale(newLocale){
  return {
    type:CHANGE_LOCALE,
    locale:newLocale
  }
}

export function selectSubject(subject){
  return {
    type:SELECT_SUBJECT,
    payload:subject
  }
}

export function searchSubjects(term){
  return {
    type: SEARCH_SUBJECTS,
    term: term
  }
}


export function addSubject(){

  var request = createRequest().post('subjects');
  return {
    type: ADD_SUBJECT,
    subject: request
  }
}

export function saveSubject(number,custom_field){
  const URL = `subjects/${number}}`;
  //var request = axios.post(URL,{custom_field});
  var request = createRequest().post(URL,{custom_field});
  return {
    type: UPDATE_SUBJECT,
    subject: request
  }
}

export function fetchSubjects(){
  //const URL = `${ROOT_URL}subjects${API_KEY}`;
  //var request = axios.get(URL);
  var request = createRequest().get('subjects');
  return {
    type:FETCH_SUBJECTS,
    payload:request
  }
}

export function fetchSurveys(subject_id){
  debugger;
  const URL = `surveys/${subject_id}`;
  var request = createRequest().get(URL);
  return {
    type:FETCH_SURVEYS,
    payload:request
  }
}

export function fetchSurvey(subject_id,survey_id){
  //const URL = `${ROOT_URL}surveys/${subject_id}/${survey_id}${API_KEY}`;
  const URL = `surveys/${subject_id}/${survey_id}`;

  var request = createRequest().get(URL);
  return {
    type:FETCH_SURVEY,
    payload:request
  }
}

export function addSurvey(subject_id,values){
  console.log('submitting survey',values);
  let {_date} = values;
  values.date = Moment(_date).format('YYYY-MM-DD');
  values.date+='Z';

  //const URL = `${ROOT_URL}surveys/${subject_id}${API_KEY}`;
  const URL = `surveys/${subject_id}`;

  var request = createRequest().post(URL,values);
  return {
    type:ADD_SURVEY,
    payload:request
  }
}

export function updateSurvey(subject_id,survey_id,values){
  console.log('updating survey',values);
  let {_date} = values;
  values.date = Moment(_date).format('YYYY-MM-DD');
  values.date+='Z';
  const URL = `surveys/${subject_id}/${survey_id}`;
  var request = createRequest().post(URL,values);
  return {
    type:UPDATE_SURVEY,
    payload:request
  }
}

export function newSurvey (){
  return {
    type:ADD_SURVEY,
    payload:{data:EMPTY_SURVEY}
  }
}

export function addSurveyDay(date,subject_id,survey_id){
  //localhost:3000/diary/5ab678f57906b24357185263/?key=abcdef
  date = Moment(date).format('YYYY-MM-DD');
  date+='Z';
  const URL = `diary/${subject_id}/${survey_id}`;
  var request = createRequest().post(URL,{date});
  return {
    type: ADD_SURVEY_DAY,
    payload:request
  };
}

export function fetchDiary(subject_id,survey_id,date){
  date = Moment(date).format('YYYY-MM-DD');
  debugger;
  date+='Z';
  //localhost:3000/diary/5ab678f57906b24357185263/?date=2018-02-02Z&key=abcdef
  const URL = `diary/${subject_id}/${survey_id}?date=${date}`;
  var request = createRequest().get(URL,{date});
  return {
    type: FETCH_DIARY,
    payload:request
  };

}

export function searchFood(term){
  //localhost:3000/food/search/Poulet
  const URL = `food/search?term=${term}`;
  var request = createRequest().get(URL);
  return {
    type: FOOD_SEARCH,
    payload:request
  };
}

export function addIngesta(subject_id,survey_id,date,values){
  date = Moment(date).format('YYYY-MM-DD');
  date+='Z';
  const URL = `diary/${subject_id}/${survey_id}/${date}/ingesta`;
  var request = createRequest().post(URL,values);
  return {
    type: ADD_INGESTA,
    payload:request
  }
}



export function fetchComponents(){

  const URL = `components`;
  var request = createRequest().get(URL);
  return {
    type: FETCH_COMPONENTS,
    payload:request
  }
}
