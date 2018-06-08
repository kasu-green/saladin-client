import axios from 'axios';
import Moment from 'moment';
import  history  from '../history';

export const REGISTER= 'REGISTER';
export const FETCH_SUBJECTS = 'FETCH_SUBJECTS';
export const FETCH_SUBJECT = 'FETCH_SUBJECT';
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

export const FETCH_PRESETS = 'FETCH_PRESETS';
export const ADD_PRESET = 'ADD_PRESET';
export const UPDATE_PRESET = 'UPDATE_PRESET';
export const DELETE_PRESET = 'DELETE_PRESET';

export const AUTHENTICATED = 'AUTHENTICATED';
export const UNAUTHENTICATED = 'UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

export const ROOT_URL= API_URL;
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
    _date: new Date(),
    subject_id: -1,
    comment:'',
    preset:null,
    diaries:[]
};

export const EMPTY_PRESET =  {
    _id:-null,
    components:[],
    name:'New preset',
    desc:''
};



export function authenticate(email,password){

  return async (dispatch) => {
    try {
      const URL = `${ROOT_URL}user/authenticate/`;
      const res = await axios.post(URL,{email,password});
      debugger;

      localStorage.setItem('token', res.data.token);
      dispatch({ type: AUTHENTICATED });
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

//      history.push('/subjects');
    } catch(error) {

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



export function fetchPresets(){

  var request = createRequest().get('presets');
  return {
    type: FETCH_PRESETS,
    payload: request
  }
}


export function addPreset(values){

  var request = createRequest().post('presets',values);
  return {
    type: ADD_PRESET,
    payload: request
  }
}


export function updatePreset(values){

  var request = createRequest().post('presets/'+values._id,values);
  return {
    type: UPDATE_PRESET,
    payload: request
  }
}


export function register(values){

  var request = createRequest().post('user/register/',values);
  return {
    type: REGISTER,
    payload: request
  }
}

export function addSubject(preset){

  var request = createRequest().post('subjects',{preset:preset});
  return {
    type: ADD_SUBJECT,
    payload: request
  }
}

export function saveSubject(number,custom_field,preset){
  const URL = `subjects/${number}`;
  //var request = axios.post(URL,{custom_field});
  var request = createRequest().post(URL,{custom_field,preset});
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

export function fetchSubject(id){
  //const URL = `${ROOT_URL}subjects${API_KEY}`;
  //var request = axios.get(URL);
  var request = createRequest().get('subjects/'+id);
  return {
    type:FETCH_SUBJECT,
    payload:request
  }
}

export function fetchSurveys(subject_id){
  //debugger;
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

export function newSurvey (preset=null){
  let survey = Object.assign({},EMPTY_SURVEY);
  survey.preset = preset;
  return {
    type:ADD_SURVEY,
    payload:{data:survey}
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
