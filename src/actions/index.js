import axios from 'axios';
import Moment from 'moment';
export const FETCH_SUBJECTS = 'FETCH_SUBJECTS';
export const SEARCH_SUBJECTS = 'SEARCH_SUBJECTS';
export const ADD_SUBJECT = 'ADD_SUBJECT';
export const ADD_SURVEY = 'ADD_SURVEY';
export const FETCH_SURVEY = 'FETCH_SURVEY';
export const UPDATE_SUBJECT = 'UPDATE_SUBJECT';
export const FETCH_SURVEYS = 'FETCH_SURVEYS';
export const ADD_SURVEY_DAY = 'ADD_SURVEY_DAY';
export const FOOD_SEARCH = 'FOOD_SEARCH';
export const CHANGE_LOCALE = 'CHANGE_LOCALE';
export const FETCH_DIARY = 'FETCH_DIARY';


const ROOT_URL= 'http://localhost:3000/';
const API_KEY = '?key=abcdef';

export function changeLocale(newLocale){
  return {
    type:CHANGE_LOCALE,
    locale:newLocale
  }
}


export function searchSubjects(term){
  return {
    type: SEARCH_SUBJECTS,
    term: term
  }
}


export function addSubject(){
  const URL = `${ROOT_URL}subjects${API_KEY}`;
  var request = axios.post(URL,{});
  return {
    type: ADD_SUBJECT,
    subject: request
  }
}

export function saveSubject(number,custom_field){
  const URL = `${ROOT_URL}subjects/${number}${API_KEY}`;
  var request = axios.post(URL,{custom_field});
  return {
    type: UPDATE_SUBJECT,
    subject: request
  }
}

export function fetchSubjects(){
  const URL = `${ROOT_URL}subjects${API_KEY}`;
  var request = axios.get(URL);
  return {
    type:FETCH_SUBJECTS,
    payload:request
  }
}

export function fetchSurveys(subject_number){
  const URL = `${ROOT_URL}surveys/${subject_number}${API_KEY}`;
  var request = axios.get(URL);
  return {
    type:FETCH_SURVEYS,
    payload:request
  }
}

export function fetchSurvey(subject_number,survey_id){
  const URL = `${ROOT_URL}surveys/${subject_number}/${survey_id}${API_KEY}`;
  var request = axios.get(URL);
  return {
    type:FETCH_SURVEY,
    payload:request
  }
}

export function addSurvey(subject_number,values){
  console.log('submitting survey',values);
  const URL = `${ROOT_URL}surveys/${subject_number}${API_KEY}`;
  var request = axios.post(URL,values);
  return {
    type:ADD_SURVEY,
    payload:request
  }

}

export function addSurveyDay(date,survey_id){
  //localhost:3000/diary/5ab678f57906b24357185263/?key=abcdef
  date = Moment(date).format('YYYY-MM-DD');
  date+='Z';
  const URL = `${ROOT_URL}diary/${survey_id}${API_KEY}`;
  var request = axios.post(URL,{date});
  return {
    type: ADD_SURVEY_DAY,
    payload:request
  };
}

export function fetchDiary(date,survey_id){
  date = Moment(date,'DD/MM/YYYY').format('YYYY-MM-DD');
  debugger;
  date+='Z';
  //localhost:3000/diary/5ab678f57906b24357185263/?date=2018-02-02Z&key=abcdef
  const URL = `${ROOT_URL}diary/${survey_id}${API_KEY}&date=${date}`;
  var request = axios.get(URL,{date});
  return {
    type: FETCH_DIARY,
    payload:request
  };

}

export function searchFood(term){
  //localhost:3000/food/search/Poulet
  const URL = `${ROOT_URL}food/search/${term}${API_KEY}`;
  var request = axios.get(URL);
  return {
    type: FOOD_SEARCH,
    payload:request
  };
}
