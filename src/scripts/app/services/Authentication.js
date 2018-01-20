import {API} from './API';
import * as ko from 'knockout';
import 'knockout-postbox';
import "knockout-amd-helpers";

// singleton class

let instance = null;

export class Authenticator{
  constructor(){
    if(!instance){
      instance = this;
      this.init();
    }
  //  this.API = API();
    return instance;
  }

  init(){
    this.token = ko.observable().publishOn('app.token');
    this.API = new API();
    //debugger;
    this.token.subscribe(this.tokenChange);
  }

  tokenChange(value){
    //debugger;
  }

  load_session(token){
    return new Promise((resolve,reject)=>{
      var tok=token;
      if (typeof tok == 'undefined'){
        if(tok = window.localStorage.getItem('token')){
          this.token(tok);
          resolve(tok);
        }else{
          reject({error:'Token not found',error_code:100});
        }
      }else{
        this.token(tok);
        //this.store_session(tok);
        resolve(tok);
      }
    });
  }

  recover_session(token){

    return new Promise((resolve,reject)=>{
      //debugger;
      var tok=token;
      if (typeof tok == 'undefined'){
        if(tok = window.localStorage.getItem('token')){
          this.token(tok);
          resolve(tok);
        }else{
          reject({error:'Token not found',error_code:100});
        }
      }else{
        this.token(tok);
        this.store_session(tok);
        resolve(tok);
      }
    }).then(()=>{ // if succeeded we proceed to loading the current user
      return this.load_current_user();
    });
  }

  store_session(token){
    window.localStorage.setItem('token',token);
    this.token(token);
  }

  is_logged(){
    return this.token()!='' && this.token()!= null  && this.token()!= undefined;
  }

  logout(){
    window.localStorage.removeItem('token');
    this.token('');
  }

  authenticate(params,success,failure){
    //debugger;
    return this.API.authenticate(params).then(  (response)=>{
        this.store_session(response.data.token);
        //return new promise here so we can chain it later
        return this.load_current_user();
      }).then((response)=>{
        //currentUser should be loaded;
        console.log('user loaded');
      });
  }
  load_current_user(){
    return this.API.currentUser();
  }
}
/*
define(["knockout",'app/API',"bluebird"], function(ko,$API,Promise) {

  return new function(){
    var self = this;

    this.API = $API;

    this.token = ko.observable().syncWith('app.token');
    this.load_session =function(token){ // we now accept a token as parameter

      return new Promise(function(resolve,reject){
        var tok=token;
        if (typeof tok == 'undefined'){
          if(tok = window.localStorage.getItem('token')){
            this.token(tok);
            resolve(tok);
          }else{
            reject({error:'Token not found',error_code:100});
          }
        }else{
          this.token(tok);
          //this.store_session(tok);
          resolve(tok);
        }
      });
    }

    //recover the session from the stored cookie
    this.recover_session =function(token){ // we now accept a token as parameter
      return new Promise(function(resolve,reject){
        var tok=token;
        if (typeof tok == 'undefined'){
          if(tok = window.localStorage.getItem('token')){
            this.token(tok);
            resolve(tok);
          }else{
            reject({error:'Token not found',error_code:100});
          }
        }else{
          this.token(tok);
          this.store_session(tok);
          resolve(tok);
        }
      }).then(function(){ // if succeeded we proceed to loading the current user
        return this.load_current_user();
      });
    }

    this.store_session= function(token){
      window.localStorage.setItem('token',token);
      this.token(token);
    }

    this.is_logged = function(){
      return this.token()!='' && this.token()!= null  && this.token()!= undefined;
    }


    this.logout = function(){
      window.localStorage.removeItem('token');
      this.token('');
    }

    //return a Promise object
    this.load_current_user=function() {

      return $API.currentUser();
    }
    //return a Promise object
    this.authenticate = function(params,success,failure){
      return $API.authenticate(params).then(  function(response){
          this.store_session(response.data.token);
          //return new promise here so we can chain it later
          return this.load_current_user();
        }).then(function(response){
          //currentUser should be loaded;
          console.log('user loaded');
        });

    }


  }

});
*/
