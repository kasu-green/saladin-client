import React, { Component } from 'react';
import Login from './login';
import { BrowserRouter, Route, Switch,browserHistory} from 'react-router-dom';

import SubjectList from './subject-list';
import SubjectForm from './subject-form';
import SurveyList from './survey-list';
import Survey from './survey';
import Diary from './diary';
import Profile from './profile';
import Register from './register';
export default class App extends Component {
  render() {
    return (
      <BrowserRouter history={browserHistory}>
        <div>
          <Switch>
              <Route path="/survey/:subject_id/:action/:survey_id" component={Survey}/>
              <Route path="/survey/:subject_id/:action" component={Survey}/>
              <Route path="/survey/:subject_id" component={SurveyList}/>
              <Route path="/diary/:subject_id/:survey_id/:diary_date" component={Diary}/>
              <Route path="/subjects/add" component={SubjectForm}/>
              <Route path="/subjects" component={SubjectList}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/register" component={Register}/>
              <Route path="/" component={Login}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
