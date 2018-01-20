import 'jquery';
import {CONFIG} from '../config/config';
import * as ko from 'knockout';
import 'knockout-postbox';
export let _API = null;
export class API{

  constructor(){
    if(!_API){
      _API = this;
      this.init();
    }


  //  this.token.subscribe(this.tokenChange);


    return _API;
  }



tokenChange(value){
  //debugger;
}

  init(){
    var location = window.location;
    var protocol = location.protocol;
    var host = location.host;

    //Find the first dot
    let port = host.split(":");

    var n = port[0].split(".");

    var hosturl = n[0]+'-server';

    for(var i = 1; i<n.length;i++){
      hosturl +='.'+n[i];
    }

    this.apiURL = ko.observable(protocol+'//'+hosturl+CONFIG.API_URL).publishOn('api.baseURL');
    //debugger;
    this.token = ko.observable().subscribeTo('app.token',true);

    $.ajaxSetup({
        beforeSend: (xhr)=> {
            //debugger;
            let tok = ko.utils.unwrapObservable(this.token);
            //debugger;
            xhr.setRequestHeader('Authorization', 'Bearer '+tok);
        //    xhr.setRequestHeader('Accept-Encoding', 'deflate');
        },
        statusCode: {
            401: function(){
                //this will catch any and all access denied errors
              //  window.location.href='#/Login';
            }
        }
      });


  }

  request (verb,url,params,success_callback,failure_callback,dataType){
    if(typeof dataType == "undefined"){
      dataType = 'json';
    }
    $.ajax({
      accepts:{
        excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      },
      type: verb,
      url: this.apiURL()+url,
      data: params,
      cache:false,
      success: (response)=>{

        if(response.result == true){
          success_callback(response);
        }else{
          failure_callback(response);
        }
      },
      error: (response)=>{
        //debugger;
        if(response.status == 401){ // unauthorized. session expired
          failure_callback(response.responseJSON);
    //      window.location.href="#/logout";
        }else if(response.status == 403){ //forbidden. No access.
          failure_callback(response.responseJSON);

        }else{ //normal handling
          if(response.responseJSON && response.responseJSON.error){
            failure_callback(response.responseJSON);
          }else{
            failure_callback(response);
          }
        }
      },
      dataType: dataType
    })
  }

  normalizeParameters(params){
    //automatically append current_spa_id if we have one.
    if(!params){
      params = {};
    }

    return params;
  }

  _do (verb,url,params,normalize,dataType){
    var normalize = typeof normalize !== 'undefined' ? normalize : true;

    return new Promise((resolve,reject)=>{
      if(normalize){

        params = this.normalizeParameters(params);
      }
      this.request(verb,url,params,(response)=>{
        resolve(response);
      },function(response){
        reject(response);
      });

    });
  }

  //transform request to promise;
  post(url,params){
    return this._do('POST',url,params);
  }
  getExcel(url,params,normalize){
    var normalize = typeof normalize !== 'undefined' ? normalize : true;
    return this._do('GET',url,params,normalize,'excel');
  }
  get (url,params,normalize){
      var normalize = typeof normalize !== 'undefined' ? normalize : true;
      return this._do('GET',url,params,normalize);
  }

  delete (url,params){
    return this._do('DELETE',url,params);
  }


  authenticate(params){
    return this.post('user/authenticate',params);

  }

  currentUser(){
    return this.get('user/fetchCurrent',{});
  }

}

if (!_API){
  new API();
}
/*
define(["knockout","jquery","bluebird","app/config/config"], function(ko,jQuery,Promise,$CONFIG) {
    return new function() {
    var self = this;
  //  //console.log('instanciatiung auth');
    // publish api url for other modules
    //console.log($CONFIG);
    var location = window.location;
    var protocol = location.protocol;
    var host = location.host;

    //Find the first dot
    var n = host.split(".");

    var hosturl = n[0]+'-server';

    for(var i = 1; i<n.length;i++){
      hosturl +='.'+n[i];
    }

    self.apiURL = ko.observable(protocol+'//'+hosturl+$CONFIG.API_URL).publishOn('api.baseURL');

    self.token = ko.observable().syncWith('app.token',true);

    self.initialize = function(){
      self.configure();
    }

        self.configure = function(token) {
          //  //console.log('configuring model '+AUTH.token());
            $.ajaxSetup({

                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer '+self.token());
                //    xhr.setRequestHeader('Accept-Encoding', 'deflate');
                },
                statusCode: {
                    401: function(){
                        //this will catch any and all access denied errors
                        window.location.href='#/login';
                    }
                }

              });

        }


        self.initialize();
        self.request = function (verb,url,params,success_callback,failure_callback,dataType){
          if(typeof dataType == "undefined"){
            dataType = 'json';
          }
          $.ajax({
            accepts:{
              excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            },
            type: verb,
            url: self.apiURL()+url,
            data: params,
            cache:false,
            success: function(response){

              if(response.result == true){
                success_callback(response);
              }else{
                failure_callback(response);
              }
            },
            error: function(response){

              if(response.status == 401){ // unauthorized. session expired
                failure_callback(response.responseJSON);
          //      window.location.href="#/logout";
              }else if(response.status == 403){ //forbidden. No access.
                failure_callback(response.responseJSON);

              }else{ //normal handling
                if(response.responseJSON && response.responseJSON.error){
                  failure_callback(response.responseJSON);
                }else{
                  failure_callback(response);
                }
              }
            },
            dataType: dataType
          })
        }

        self.normalizeParameters= function(params){
          //automatically append current_spa_id if we have one.
          if(!params){
            params = {};
          }

          return params;
        }

        self.do =function(verb,url,params,normalize,dataType){
          var normalize = typeof normalize !== 'undefined' ? normalize : true;

          return new Promise(function(resolve,reject){
            if(normalize){

              params = self.normalizeParameters(params);
            }
            self.request(verb,url,params,function(response){
              resolve(response);
            },function(response){
              reject(response);
            });

          });
        }

        //transform request to promise;
        self.post= function(url,params){
          return self.do('POST',url,params);
        }
        self.getExcel = function(url,params,normalize){
          var normalize = typeof normalize !== 'undefined' ? normalize : true;
          return self.do('GET',url,params,normalize,'excel');
        }
        self.get = function(url,params,normalize){
            var normalize = typeof normalize !== 'undefined' ? normalize : true;
            return self.do('GET',url,params,normalize);
        }

        self.delete = function(url,params){
          return self.do('DELETE',url,params);
        }
        self.authenticate = function(params){
          return self.post('user/authenticate',params);

        }


        self.currentUser = function(){
          return self.get('user/fetchCurrent',{});
        }

        self.cleanup = function (data){
          for(var i = 0; i < data.length;i++){

            if(data[i].__ko_mapping__){
              delete data[i].__ko_mapping__;
            }
            if(data[i].children){
              data[i].children = self.cleanup(data[i].children);
            }
          }
          return data;
        }

        ko.postbox.subscribe("app.token", function(newValue) {
          self.configure(newValue);
        }, null, true);
}});
*/
