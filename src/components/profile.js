import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {logout} from '../actions';
import  _ from 'lodash';
import Header from './header';
import PresetsList from './preset-list';


class Profile extends Component{


  render(){

    return (
      <div>
      <Header title="User Profile"  backTo={()=>{this.props.history.goBack()}}/>
      <section className="with-header-nospace flex flex-column align-center just-center">
        <PresetsList/>
      <button onClick={(e)=>{this.props.logout()}}>Logout</button>
      </section>

      </div>
    );
  }
}

Profile = connect(null,{logout})(Profile);


export default  Profile;
