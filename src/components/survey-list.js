import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from '../actions';
import {Link} from 'react-router-dom';
import {SearchBar} from './search-bar';
import Header from './header';
import SurveyCell from './survey-cell';


class SurveyList extends Component {

  componentDidMount(){

    this.props.fetchSurveys(this.props.match.params.subject_number);
  }

  renderList(){
  
    return this.props.surveys.map(survey=>{
      return <SurveyCell key={survey._id} survey={survey}/>
    });
  }

  render(){

    return (
      <div>
        <Header title="Enquêtes alimentaire"/>

        <section className="flex flex-column align-center just-center">


          <ul  className="collection">
            {this.renderList()}
          </ul>

          <div className="fixed-action-btn">
            <Link to={"/survey/"+this.props.match.params.subject_number+"/add"} id="addSubject" className="btn-floating btn-large waves-effect waves-light red">
              <i className="material-icons">add</i>
            </Link>
          </div>

        </section>
      </div>
    );
  }
}

function mapStateToProps({surveys}){
  const {filter, data} = surveys;
  return {
    surveys: data.filter( (item) => {
          return true;
      } )};
}

export default connect(mapStateToProps,{fetchSurveys})(SurveyList);
