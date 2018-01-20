import {Router} from 'hash-router';
import * as ko from 'knockout';
import 'knockout-postbox';
import "knockout-amd-helpers";
import {Authenticator} from './Authentication';
import "../../../sass/test.scss";
export let _APP = null
export class APP {

  constructor (){
    if(!_APP){
      _APP = this;
      this.init();
    }

    return _APP;
  }

  init(){
    this.currentModule = ko.observable().publishOn('navigation.current');
    this.Auth = new Authenticator();
    this.Router = new Router();
    this.initko();
    this.initRouter();
  }

  initko(){
    this.moduleContext = require.context( "../pages", true );
    this.templateContext = require.context( "../../../www/views", true );
    ko.bindingHandlers.module.loader = ( moduleName, done ) => {
      var mod = this.moduleContext( "./" + moduleName );
      if(mod.__esModule && mod.default){
        mod = mod.default;
      }else if(mod.__esModule){
        mod = mod[moduleName];
      }

      done( mod );
    }

    ko.amdTemplateEngine.loader = ( templateName, done ) => {
      var template = this.templateContext( "./" + templateName +'.html' );
      done( template );
    }


    ko.applyBindings(this);
  }

  start (){
    this.Auth.recover_session().then((response)=>{
    //  window.location.href='#/';
    }).catch((response)=>{
      window.location.href='#/Login';
    }).finally((response)=>{
      this.Router.init();
    });
  }

  initRouter(){
    this.Router.add({
      path: '#/dashboard',
      on: ()=> {
        this.currentModule({name:'Dashboard',disposeMethod: 'dispose' });
      }
    });

    this.Router.add({
      path: '#/',
      on: ()=> {
        this.currentModule({name:'Dashboard',disposeMethod: 'dispose' });
      }
    });
    this.Router.add({
      path: '#/Login',
      on: ()=> {
        this.currentModule({name:'Login',disposeMethod: 'dispose' });
      }
    });
    this.Router.add({
      path: '#/:controller',
      on: (route)=> {
        this.currentModule({name:route.params.controller,disposeMethod: 'dispose',template:'CRUDController' });
      }
    });


  }
}
