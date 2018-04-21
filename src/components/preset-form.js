import React, {Component} from 'react';
import {connect} from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Moment from 'moment';
import CollectionItem from './collection-item';
import _ from 'lodash';
import {fetchComponents,addPreset,updatePreset} from '../actions';
import {_translate} from '../config';
import CheckboxGroup from './checkboxgroup';
class PresetForm extends Component {
  constructor(props){
    super(props);
    let {edit} = props;
    if(_.isUndefined(edit)){
      edit = true;
    }
    this.state = {
      edit:edit
    }
  }

  componentDidMount(){
    this.props.fetchComponents();
  }
  resetForm(){
    debugger;
    this.props.reset() ;
    this.setState({edit:false})
  }
  submitForm(values){
  /*
    this.props.onSubmitForm(values);
    this.setState({edit:false});*/

    if(this.props.preset._id != 0){
      //update
      this.props.updatePreset(values).then(()=>{

        this.props.reset();
        this.setState({edit:false});
      });
    }else{
      //create
      this.props.addPreset(values).then(()=>{

        this.props.reset();
        this.setState({edit:false});
        if(!_.isUndefined(this.props.afterAdd)){
          this.props.afterAdd();
        }
      });
    }
  }

  renderField(field){
    return (
      <div className="input-field col s6">
      <input type="text" {...field.input} {...field.rest}/>
      <label htmlFor="last_name">{field.label}</label>
      {field.meta.error}
      </div>
    );
  }

  componentName(component){

    let componentTranslation = 'not found';
    let unit = '';
    //debugger;
    if(this.props.components[component]){
      componentTranslation = _translate(this.props.locale.language,this.props.components[component].translation,'name');
    }
    if(this.props.components[component]){
      unit = _translate(this.props.locale.language,this.props.components[component].translation,'unit');
    }
    return componentTranslation+"("+unit+")";
  }

  renderComponentsCheckboxes(){
    let optionsList = _.map(this.props.components,(component)=>{

      return {id:component._id,name:this.componentName(component._id)};
    })
    return (<Field name="components" component={CheckboxGroup} options={optionsList} />)
  }

  render(){

    const {handleSubmit} = this.props;
    if(this.state.edit){ // in edit mode we display
      return (
        <div className="preset-form">
          <form onSubmit={handleSubmit(this.submitForm.bind(this))} className="">
            <div className="row">
                <Field name="name" placeholder="Nom" label="Nom"  type="text" component="input"></Field>
            </div>
            <div className="row">
              <Field name="desc" className="" placeholder="Description" label="Description" component="input"></Field>
            </div>
            {
                this.renderComponentsCheckboxes()
            }
            <button className="btn main">Enregistrer</button>
            <button className="btn main" type="button" onClick={this.resetForm.bind(this)}>Annuler</button>
          </form>
        </div>

      )
    }else{
      const {preset} = this.props;
      let icon = 'navigate_next';
      if(preset.user ==null){
        icon = 'lock_outline';
      }
      return (<CollectionItem text={preset.name} subtext={preset.desc} icon={icon} onClick={()=>{if(preset.user!=null){this.setState({edit:true})}}}/>)
    }
  }
}


function validate(values ){
  const errors = {};
  console.log(values);
  return errors;
}


const mapStateToProps = (state, ownProps) => {

    return {
        form: ownProps.name,
        initialValues: ownProps.preset,
        components:state.components,
        locale: state.locale
        // other props...
    }
}

PresetForm = compose(
    connect(mapStateToProps,{fetchComponents,addPreset,updatePreset}),
    reduxForm({
      validate,
      enableReinitialize:true
        //other redux-form options...
    })
)(PresetForm);

/*
PresetForm = reduxForm({
  validate,
  form:'addPreset'
})(PresetForm);
*/
//PresetForm =   connect(null,null)(PresetForm);

export default PresetForm;
