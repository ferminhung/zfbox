$(document).on("pageshow","#miperfil",function(event, ui){
    var sIdentificador=localStorage.getItem("codigoweb");
    var sEstatus=localStorage.getItem("estatus");
    $("#alpanel").click(function(){
        $.mobile.changePage("panel.html",{ transition : "fade" });
    });

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
            document.formUsuario.tNombre.value=respuesta['nombre'];
            document.formUsuario.tClave1.value=respuesta['codpass'];
            document.formUsuario.tEmail.value=respuesta['email'];
            document.formUsuario.tMovil.value=respuesta['celular'];
            $("#CodUsuario").text("Codigo: "+sIdentificador);
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

	
    $("#btActualizar").click(function(){
        var sIdentificador=localStorage.getItem("codigoweb");
        var sEstatus=localStorage.getItem("estatus");
        if(sIdentificador!="50104608081"){
            var sNombre=document.formUsuario.tNombre.value;
            var sClave1=document.formUsuario.tClave1.value;
            var sClave2=document.formUsuario.tClave2.value;
            var sEmail=document.formUsuario.tEmail.value;
            var sTelefono=document.formUsuario.tMovil.value;
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