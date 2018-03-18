import axios from 'axios';

export const FETCH_SUBJECTS = 'FETCH_SUBJECTS';
export const SEARCH_SUBJECTS = 'SEARCH_SUBJECTS';
export const ADD_SUBJECT = 'ADD_SUBJECT';
export const UPDATE_SUBJECT = 'UPDATE_SUBJECT';

export const FETCH_SURVEYS = 'FETCH_SURVEYS';

const ROOT_URL= 'http://localhost:3000/';
const API_KEY = '?key=abcdef';



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
