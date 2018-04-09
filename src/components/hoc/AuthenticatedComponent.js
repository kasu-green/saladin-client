import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../actions';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {

      //debugger;
      this.props.checkSession().then(()=>{
        if (!this.props.authenticated) {
          this.props.history.push('/');
        }

      });

    }

    componentWillUpdate(nextProps) {
      //debugger;
      if (!nextProps.authenticated) {
        this.props.history.push('/');
      }
    }


    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps,{checkSession})(Authentication);
}
