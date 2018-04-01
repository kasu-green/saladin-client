import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys,newSurvey} from '../actions';
import {Link} from 'react-router-dom';
import {SearchBar} from './search-bar';
import Header from './header';
import SurveyCell from './survey-cell';
import CollectionTitle from './collection-title';

class SurveyList extends Component {

  componentDidMount(){
    debugger;
    this.props.fetchSurveys(this.props.match.params.subject_id);
  }

  newSurvey(){

    this.props.newSurvey();
    this.props.history.push("/survey/"+this.props.match.params.subject_id+"/add");
  }

  renderList(){

    return this.props.surveys.map(survey=>{
      return <SurveyCell key={survey._id} subject_id={this.props.match.params.subject_id} survey={survey}/>
    });
  }


  render(){

    return (
      <div>
        <Header title={this.props.match.params.subject_id} backTo={()=>{this.props.history.push("/subjects")}}/>

        <section className="with-header-nospace flex flex-column align-center just-center">

          <CollectionTitle title="Enquête Alimentaire"/>

          <ul className="collection">
            {this.renderList()}
          </ul>

          <div className="fixed-action-btn">

              <i onClick={this.newSurvey.bind(this)} className="material-icons">add</i>

          </div>

        </section>
      </div>
    );
  }
}

function mapStateToProps({surveys,subject}){
  const {filter, data} = surveys;
  return {
    surveys: data.filter( (item) => {
          return true;
      } )};
}

export default connect(mapStateToProps,{fetchSurveys,newSurvey})(SurveyList);
