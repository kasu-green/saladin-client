import React, { Component } from 'react';

export default function (ComposedComponent) {

  class ToggleForm extends Component {
    componentWillMount() {
      //debugger;
    //  console.log(this.props.children);
    }

    componentWillUpdate(nextProps) {

    }


    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return ToggleForm;
}
