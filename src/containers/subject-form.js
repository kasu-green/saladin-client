import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import SubjectForm from '../components/subject-form';
import {addSubject,saveSubject,fetchPresets} from '../actions';
class SubjectFormContainer extends Component{

  constructor(props){
    super(props);
    this.state = {_id:0,preset:null,redirect:false,loaded:false};

    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount(){

    this.props.fetchPresets().then(()=>{
      var preset = this.props.presets[Object.keys(this.props.presets)[0]];

      var preset_id = preset._id;


      this.props.addSubject(preset_id).then(data=>{
        //debugger;
        this.setState({loaded:true});
      });

    })

  }

  submitForm(values){


    const{_id,custom_field,preset} = values;
    const promise = this.props.saveSubject(_id,custom_field,preset);

    promise.subject.then(data=>{
          this.props.history.push('/subjects');
    }).catch(error=>{
      alert('error occured');
    });
  }
  cancelForm(){
    this.props.history.push('/subjects');
  }
  render(){
    if(!this.state.loaded){
      return (<div>fetching a subject number... please wait</div>)
    }else{
      return (<SubjectForm name="newSubject" subject={this.props.subject} submitForm={this.submitForm.bind(this)} cancelForm={this.cancelForm.bind(this)}/>)
    }
  }
}

export default connect((state)=>{return {presets:state.presets,subject:state.subject}},{addSubject,fetchPresets,saveSubject})(SubjectFormContainer);
