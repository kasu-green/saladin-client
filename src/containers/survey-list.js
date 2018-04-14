import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys,newSurvey,fetchSubject,fetchPresets} from '../actions';
import Loading from "../components/loading";
import SurveyList from '../components/survey-list';
import ToggleForm from '../components/hoc/ToggleForm';
class SurveyListContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      loaded:false
    }
  }
  componentDidMount(){

    this.props.fetchPresets().then(()=>{
      return this.props.fetchSubject(this.props.match.params.subject_id);

    }).then ( ()=>{
      return this.props.fetchSurveys(this.props.match.params.subject_id);

    }).then(()=>{
      this.setState({loaded:true});
    });

  }

  renderLoading(){
    if(!this.state.loaded){
    return (<Loading></Loading>)
    }
  }
  renderList(){
    if(this.state.loaded){
      return (  <SurveyList
        surveys={this.props.surveys}
        subject={this.props.subject}
        history={this.props.history}
        presets={this.props.presets}
        newSurvey={this.props.newSurvey}
        />)
    }
  }
  render(){
  //  var Form = ToggleForm(SurveyList);
    return (
      <div>
          {this.renderLoading()}
          {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps({surveys,subject,presets}){
  const {filter, data} = surveys;
  return {
    subject: subject,
    presets: presets,
    surveys: data.filter( (item) => {
          return true;
      } )};
}

export default connect(mapStateToProps,{fetchSurveys,newSurvey,fetchSubject,fetchPresets})(SurveyListContainer);
