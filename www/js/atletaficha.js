$(document).on("pageshow","#atletaficha",function(event, ui){
    
    $("#volver").click(function(){
        $.mobile.changePage("panel.html",{ transition : "fade" });
    });
    $("#btHome").click(function(){
        $.mobile.changePage("panel.html",{ transition : "fade" });
    });

    var sIdentificador=localStorage.getItem("codigoweb");
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'VerFicha'
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
            var aFicha = JSON.parse(respuesta);
            $.each( aFicha, function( i, value ) { 
                document.formFicha.alias.value=value['vcAlias'];
                document.formFicha.fechanac.value=value['dFechaNac'];
                document.formFicha.altura.value=value['vcAltura'];
                switch(value['vcSexo']){
                    case '0':
                        $("#slcSexo option[value='0']").attr("selected",true);
                        break;
                    case 'F':
                        $("#slcSexo option[value='F']").attr("selected",true);
                        break;
                    case 'M':
                        $("#slcSexo option[value='M']").attr("selected",true);
                        break;
                }
                switch(value['vcNivel']){
                    case '0':
                        $("#slcNivel option[value='0']").attr("selected",true);
                        break;
                    case 'B':
                        $("#slcNivel option[value='B']").attr("selected",true);
                        break;
                    case 'S':
                        $("#slcNivel option[value='S']").attr("selected",true);
                        break;
                    case 'R':
                        $("#slcNivel option[value='R']").attr("selected",true);
                        break;
                }
            })
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
    $("#liGuardarFicha").click(function(){
        var sIdentificador=localStorage.getItem("codigoweb");
        if(sIdentificador!="50104608081"){
            var sAlias=$("#alias").val();
            var sFechaNac=$("#fechanac").val();
            var sSexo=$("#slcSexo").val();
            var sAltura=$("#altura").val();
            var sNivel=$("#slcNivel").val();
            $("#liGuardarFicha").html("<span class='icon-hour-glass'></span> Esperando Respuesta");
            $("#liGuardarFicha").css("background-color","orange");
            $.ajax({
                data:{
                    sCodigoWebPhp:sIdentificador, sAliasPhp:sAlias, sFechaNacPhp:sFechaNac, sSexoPhp:sSexo, sAlturaPhp:sAltura, sNivelPhp:sNivel, Mandato:'GuardarFicha'
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
                    if(respuesta=="A"){
                        $("#liGuardarFicha").html('<span class="icon-checkmark"></span> Actualizado <span class="icon-happy"></span>');
                        $("#liGuardarFicha").css("background-color","green");
                    }else{
                        alert(respuesta);
                        $("#liGuardarFicha").html("<span class='icon-sad'></span> Vuelve a Intentarlo");
                        $("#liGuardarFicha").css("background-color","red");
                    }
                },error:function(jqXHR, textStatus, errorThrown){
                    ajax_error(jqXHR, textStatus, errorThrown,true);
                }
            });
        }
        
    });

});
