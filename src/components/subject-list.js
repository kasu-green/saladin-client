import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSubjects} from '../actions';
import {Link} from 'react-router-dom';


import SubjectCell from './subject-cell';
import SearchBar from './search-bar';
import Header from './header';
import Loading from "./loading";

class SubjectList extends Component{
  constructor(props){
    super(props);

    this.state = {
      loaded:false
    }
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    debugger;
    // You can also log the error to an error reporting service
  //  logErrorToMyService(error, info);
  }


  componentDidMount(){
    console.log('mount');
    this.props.fetchSubjects().then(()=>{
      this.setState({loaded:true});
    });
  }

  renderSubjects(){
    return this.props.subjects.map(subject=>{
      return (<SubjectCell history={this.props.history} key={subject._id} subject={subject}/>)
    });
  }
  renderLoading(){
    if(!this.state.loaded){
    return (<Loading></Loading>)
    }
  }
  renderList(){
    if(this.state.loaded){
    return (

        <ul id="listSubjects" className="collection">
          {this.renderSubjects()}
        </ul>



      )
    }
  }
  renderError(){
    if(this.props.error){
      return (<div className="error">Une erreur est survenue: {this.props.error_message}</div>)
    }
  }
  render(){
    return (
      <div>

      <Header title="Sujets"/>
      <section className="main flex flex-column align-center just-center">

        <SearchBar/>
        {this.renderError()}
        {this.renderLoading()}
        {this.renderList()}

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

function mapStateToProps({subjects}){
  const {filter, data, error,error_message} = subjects;
  debugger;
  return {
    error:error,
    error_message,
    subjects: data.filter( (item) => {
        debugger;
        if(!item.custom_field){
          item.custom_field = "";
        }
        const number = (''+item._id).toLowerCase();
        const custom_field = item.custom_field.toLowerCase();

        return (number.startsWith(filter) || (custom_field.includes(filter)))
      } )};
}

export default connect(mapStateToProps,{fetchSubjects})(SubjectList);
