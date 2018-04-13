import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSubjects,searchSubjects} from '../actions';
import Loading from "../components/loading";
import SubjectList from '../components/subject-list';
/*Link the subject list to redux store*/
class SubjectListContainer extends Component{
  constructor(props){
    super(props);

    this.state = {
      loaded: false
    }
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    //debugger;
    // You can also log the error to an error reporting service
  //  logErrorToMyService(error, info);
  }


  componentDidMount(){
    console.log('mount');
    this.props.fetchSubjects().then(()=>{
      this.setState({loaded:true});
    });
  }


  renderError(){
    if(this.props.error){
      return (<div className="error">Une erreur est survenue: {this.props.error_message}</div>)
    }
  }
  render(){
    return (
      <SubjectList subjects={this.props.subjects} history={this.props.history} filter={this.props.filter} searchCallback={(term)=>{this.props.searchSubjects(term)}}/>
    );
  }
}

function mapStateToProps({subjects}){
  const { data, error,error_message} = subjects;
  let {filter} = subjects;
  //debugger;
  return {
    error:error,
    error_message,
    subjects: data.filter( (item) => {
        //debugger;
        if(!item.custom_field){
          item.custom_field = "";
        }
        filter = filter.toLowerCase();
        const number = (''+item._id).toLowerCase();
        const custom_field = item.custom_field.toLowerCase();

        return (number.startsWith(filter) || (custom_field.includes(filter)))
      } )};
}

export default connect(mapStateToProps,{fetchSubjects,searchSubjects})(SubjectListContainer);
