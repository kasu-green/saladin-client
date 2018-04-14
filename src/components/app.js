import React, { Component } from 'react';
import Login from './login';
import { BrowserRouter, Route, Switch,browserHistory} from 'react-router-dom';

import SubjectList from '../containers/subject-list';
import SubjectForm from '../containers/subject-form';
import SurveyList from '../containers/survey-list';
import Survey from './survey';
import Diary from './diary';
import Profile from './profile';
import Register from './register';

import AuthenticatedComponent from './hoc/AuthenticatedComponent';

import PublicComponent from './hoc/PublicComponent';

export default class App extends Component {

  componentDidMount(){
    //set timeout to check session expiration ?


  }

  render() {
    return (
      <BrowserRouter history={browserHistory}>
        <div>
          <Switch>
              <Route path="/survey/:subject_id/:action/:survey_id" component={AuthenticatedComponent(Survey)}/>
              <Route path="/survey/:subject_id/:action" component={AuthenticatedComponent(Survey)}/>
              <Route path="/survey/:subject_id" component={AuthenticatedComponent(SurveyList)}/>
              <Route path="/diary/:subject_id/:survey_id/:diary_date" component={AuthenticatedComponent(Diary)}/>
              <Route path="/subjects/add" component={AuthenticatedComponent(SubjectForm)}/>
              <Route path="/subjects" component={AuthenticatedComponent(SubjectList)}/>
              <Route path="/profile" component={AuthenticatedComponent(Profile)}/>
              <Route path="/register" component={Register}/>
              <Route path="/" component={Login}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
