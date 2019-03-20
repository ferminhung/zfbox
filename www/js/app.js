/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var globalURL = 'http://conacademia.com/crossfit/appmovil/ajaxServiceCFv3.php';

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

     //   console.log('Received Event: ' + id);
        app.index();
    },
    //funciones jquery a index.html
    index: function(){
        $('.flex-viewport').append('<br/><br/>');
        var a = new Date(); var aa = a.getFullYear(); $('#aa').append(aa);
    }
};

function post(url,json,loader){
    if(loader){
       $(".loader").fadeIn();
    }
    var r;
    $.ajax({
       url: url,
       data: json,
       type: 'post',
       async: false,
       success: function(request){
           if(loader){
               $(".loader").fadeOut();
           }
           r = request;
       },
       error: function( jqXHR, textStatus, errorThrown ){
            ajax_error( jqXHR, textStatus, errorThrown, loader );
       }
    });
    return r;
}

//OBTENER VARIABLES DEL URL
function vars_url(loc){
    if(loc.indexOf('?') > 0){
        var variables = loc.split('?')[1];
        if(variables.indexOf('&') > 0){
            var var_data = variables.split('&');
            var datos = new Array();
            var v;
            var d;
            $.each(var_data, function(i,val){
                v = val.split('=')[0];
                d = val.split('=')[1];
                datos[''+v] = d;
            });
            return datos;
        }else{
            var datos = new Array();
            v = variables.split('=')[0];
            d = variables.split('=')[1];
            datos[''+v] = d;
            return datos;
        }
    }else{
        
        return false;
    }
}

//ATAJAR ERRORES DE AJAX
function ajax_error( jqXHR, textStatus, errorThrown, loader ){
    if (jqXHR.status === 0) {
        //alert('Not connected: Verify Network.');
        alert('Sin conexi\u00F3n: Verifique la red.');
    } else if (jqXHR.status == 404) {
        //alert('Requested page not found [404].');
        alert('No se ha recibido respuesta [404].');
    } else if (jqXHR.status == 500) {
        //alert('Internal Server Error [500].');
        alert('Error interno del servidor [500].');
    } else if (textStatus === 'parsererror') {
        alert('Requested JSON parse failed.');
    } else if (textStatus === 'timeout') {
        //alert('Time out error.');
        alert('Se ha excedido el tiempo de espera.');
    } else if (textStatus === 'abort') {
        //alert('Ajax request aborted.');
        alert('Petici\u00F3n abortada.');
    } else {
        //alert('Uncaught Error: ' + jqXHR.responseText);
        alert('Error desconocido: ' + jqXHR.responseText);
    }
   if(loader){
       $(".cargando").fadeOut();
   }
}
//VALIDAR SESION
function check_session(){
    /*$.ajax({
        data:{
            Mandato:'Sesion'
        },
        url:'http://conacademia.com/crossfit/appmovil/ajaxServiceCF.php',
        method:'POST',
        beforeSend:function(){
            $('.cargando').fadeIn();
        },success:function(respuesta){  
            var sSesionUser = JSON.parse(respuesta);
            return sSesionUser;
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });*/


    var sesion = post('http://conacademia.com/crossfit/appmovil/ajaxServiceCF.php',{Mandato:'Sesion'},false);
    alert(sesion);
    /*var sSesionUser=JSON.parse(sesion);*/
	return sesion // sSesionUser;
}
//CERRAR SESION
function logout(url){
    var logout = post(globalURL,{case:'logout'},true);
    if(!logout){
        alert("No se ha podido cerrar la sesi\u00F3n, intente de nuevo");
    }else{
        alert("Se ha cerrado la sesi\u00F3n");
        window.location = url;
    }
}

function fecha(SumarAfecha){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //Enero es 0
    var yyyy = today.getFullYear();

    dd=dd+SumarAfecha
    switch(mm){ 
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
            if(dd>31){
                mm+=mm;
                dd=1;
            }
            break;
        case 12:
            if(dd>31){
                mm=1;
                dd=1;
            }
            break;
        case 2:
            if(dd>28){
                mm=3;
                dd=1;
            }
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            if(dd>30){
                mm+=mm;
                dd=1;
            }
            break;
    }
    if(dd<10) {
        dd='0'+dd;
    } 

    if(mm<10) {
        mm='0'+mm;
    } 

    today =dd +'-'+mm+'-'+yyyy;
    return(today);
}
//OBTENER VARIABLES DEL URL
function vars_url(loc){
    if(loc.indexOf('?') > 0){
        var variables = loc.split('?')[1];
        if(variables.indexOf('&') > 0){
            var var_data = variables.split('&');
            var datos = new Array();
            var v;
            var d;
            $.each(var_data, function(i,val){
                v = val.split('=')[0];
                d = val.split('=')[1];
                datos[''+v] = d;
            });
            return datos;
        }else{
            var datos = new Array();
            v = variables.split('=')[0];
            d = variables.split('=')[1];
            datos[''+v] = d;
            return datos;
        }
    }else{
        
        return false;
    }
}
//OBTENER FECHA ACTUAL
function curr_date(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //Enero es 0
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd;
    } 

    if(mm<10) {
        mm='0'+mm;
    } 

    today = dd+'-'+mm+'-'+yyyy;
    return(today);
}
//CAMBIAR PAGINA
function linkLoader (){
    $(".link").click(function(){
        var id = this.id;
        $.mobile.changePage(id,{ transition : "fade" });
    });
}
//CAMBIAR FORMATO DE FECHA A 24h
function to_24h(hora){
    hora = hora.split(":");
    if(hora[1].indexOf("PM") > -1){
        if(hora[0] != '12'){
            hora[0] = parseInt(hora[0]) + 12;
        }
    }else{
        if(hora[0] == '12'){
            hora[0] = '00';
        }else if(hora[0] != '10' && hora[0] != '11'){
            hora[0] = '0'+hora[0];
        }
    }
    hora[1] = hora[1].substr(0,2);
    return hora.join(":");
}
