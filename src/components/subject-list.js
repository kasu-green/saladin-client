import React, {Component} from 'react';
import SubjectCell from './subject-cell';

export default class SubjectList extends Component{

  render(){
    return (
      <div>
      <header>
        <nav className="flex align-center just-between">
          <div className="flex">
            <img src="img/salad.png" alt="logo Saladin"/>
            <h2 className="self-center">Sujets</h2>
          </div>
          <div className="flex">
            <div id="btnLinksList"></div>
            <button id="logout">logout</button>
          </div>
        </nav>
      </header>
      <section className="flex flex-column align-center just-center">
        <form id="userSearchForm" action="" className="flex align-center">

          <button id="btnSearch" className="background bg-cover"></button>
        </form>

        <ul id="listSubjects" className="collection">
          <SubjectCell/>
          <SubjectCell/>
          <SubjectCell/>
          <SubjectCell/>
          <SubjectCell/>
          <SubjectCell/>
          <SubjectCell/>
        </ul>

        <div className="fixed-action-btn">
          <a id="addSubject" className="btn-floating btn-large waves-effect waves-light red">
            <i className="material-icons">add</i>
          </a>
        </div>

      </section>


      </div>
    );
  }
}
