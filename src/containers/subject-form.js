import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

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
      const promise = this.props.addSubject();

      promise.subject.then(data=>{
        //debugger;
        this.setState({loaded:true,_id:data.data._id,preset:preset_id});
      });

    })

  }

  submitForm(e){

    e.preventDefault();
    const{_id,custom_field,preset} = this.state;
    const promise = this.props.saveSubject(_id,custom_field,preset);

    promise.subject.then(data=>{
          this.props.history.push('/subjects');
    }).catch(error=>{
      alert('error occured');
    });
  }

  render(){
    if(!this.state.loaded){
      return (<div>fetching a subject number... please wait</div>)
    }else{
      return (<span>subject form</span>)
    }
  }
}

export default connect((state)=>{return {presets:state.presets}},{addSubject,fetchPresets,saveSubject})(SubjectFormContainer);
