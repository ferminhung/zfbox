$(document).on("pageshow","#configcuenta",function(event, ui){
    var sIdentificador=localStorage.getItem("codigoweb");
    var sEstatus=localStorage.getItem("estatus");
    $("#volverInicio").click(function(){
        $.mobile.changePage("panel.html",{ transition : "fade" });
    });

    $("#btRM").click(function(){
        $.mobile.changePage("ficharm.html",{ transition : "fade" });
    });
    $("#btAtleta").click(function(){
        $.mobile.changePage("atletaficha.html",{ transition : "fade" });
    });

    if (sEstatus!=3){
	    $.ajax({
	        data:{
	            sCodigoWebPhp:sIdentificador,Mandato:'VerCuenta'
	        },
	        dataType: "json",
	        url:globalURL,
	        method:'POST',
	        beforeSend:function(){
	            $.mobile.loading( "show", {
                  text: "cargando",
                  textVisible: true,
                  theme: "a",
                  html: ""
                });
	        },success:function(respuesta){ 
                $.mobile.loading( "hide" );  
	            document.formContacto.tNombre.value=respuesta['nombre'];
	            document.formContacto.tClave1.value=respuesta['codpass'];
	            document.formContacto.tEmail.value=respuesta['email'];
	            document.formContacto.tMovil.value=respuesta['celular'];
	            $("#InfoAtleta").text("Codigo: "+sIdentificador);
	            localStorage.setItem("estatus", respuesta['tipo']);
	            switch (respuesta['tipo']){
	                case '1':
	                    $("#labNombre").text("Trainer");
	                    break;
	                case '2':
	                    $("#labNombre").text("Atleta");
	                    break;
	            }
	            if (respuesta['coduser']==''){
	                $("#btModificar").html('<span class="icon-checkmark"></span> Registrar Cuenta');
	            }
	        },error:function(jqXHR, textStatus, errorThrown){
	            ajax_error(jqXHR, textStatus, errorThrown,true);
	        }
	    });
	}
	
    $("#btModificar").click(function(){
        var sIdentificador=localStorage.getItem("codigoweb");
        var sEstatus=localStorage.getItem("estatus");
        if(sIdentificador!="50104608081"){
            var sNombre=document.formContacto.tNombre.value;
            var sClave1=document.formContacto.tClave1.value;
            var sClave2=document.formContacto.tClave2.value;
            var sEmail=document.formContacto.tEmail.value;
            var sTelefono=document.formContacto.tMovil.value;
            if($("#labNombre").text()=="Trainer"){
                sEstatus="1";
            }
            if (sClave1==sClave2){
                $.ajax({
                    data:{
                        sCodigoWebPhp:sIdentificador, sNombrePhp:sNombre, sEmailPhp:sEmail, sCelPhp:sTelefono, sClavePhp:sClave1, sEstatusPhp:sEstatus, Mandato:'ModificarCuenta'
                    },
                    url:globalURL,
                    method:'POST',
                    beforeSend:function(){
                        $.mobile.loading( "show", {
                          text: "cargando",
                          textVisible: true,
                          theme: "a",
                          html: ""
                        });
                    },success:function(respuesta){  
                        $.mobile.loading( "hide" ); 
                        if(respuesta=="Registro Exitoso"){
                            $("#btModificar").html('<span class="icon-checkmark"></span> Actualizado <span class="icon-happy"></span>');
                            $("#btModificar").css("background-color","green");
                            $.mobile.changePage("panel.html",{ transition : "fade" });
                        }else{
                            alert(respuesta);
                            $("#btModificar").html("<span class='icon-sad'></span> Vuelve a Intentarlo");
                            $("#btModificar").css("background-color","red");
                        }
                    },error:function(jqXHR, textStatus, errorThrown){
                        ajax_error(jqXHR, textStatus, errorThrown,true);
                    }
                });
            }else{
                alert("Las claves secretas no concuerdan :(");
            }
        }
    });
});
