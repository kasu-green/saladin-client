import React, { Component } from 'react';
import Login from './login';
import { BrowserRouter, Route, Switch,browserHistory} from 'react-router-dom';
import SubjectList from './subject-list';
import SubjectForm from './subject-form';
import SurveyList from './survey-list';
import SurveyForm from './survey-form';

import DiaryForm from './diary-form';
export default class App extends Component {
  render() {
    return (
      <BrowserRouter history={browserHistory}>
        <div>
          <Switch>
            <Route path="/survey/:subject_number/edit/:survey_id" component={SurveyForm}/>
            <Route path="/diary/:subject_number/:diary_date" component={DiaryForm}/>
            <Route path="/subjects/add" component={SubjectForm}/>
            <Route path="/subjects" component={SubjectList}/>

            <Route path="/survey/:subject_number/add" component={SurveyForm}/>
            <Route path="/survey/:subject_number" component={SurveyList}/>
            <Route path="/" component={Login}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
