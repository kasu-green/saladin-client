import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSubjects} from '../actions';
import {Link} from 'react-router-dom';
import {SearchBar} from './search-bar';
import Header from './header';

export default class SurveyList extends Component {

  componentDidMount(){

  }

  render(){

    return (
      <div>
        <Header title="Enquêtes alimentaire"/>

        <section className="flex flex-column align-center just-center">


          <ul  className="collection">

          </ul>

          <div className="fixed-action-btn">
            <Link to="/subjects/add" id="addSubject" className="btn-floating btn-large waves-effect waves-light red">
              <i className="material-icons">add</i>
            </Link>
          </div>

        </section>
      </div>
    );
  }
}
