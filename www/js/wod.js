$(document).on("pageshow","#wod",function(event,ui){

    $('#volver').click(function(){
        $.mobile.changePage("panel.html",{ transition : "flip" });
    });

    $('#liVerWOD').click(function(){
        $.mobile.changePage("miswods.html",{ transition : "flip" });
    });

     $("#liTiempoWOD").click(function(){
        var sMarca=prompt("Ingresa el tiempo o rondas");
        if(sMarca!=null){
            var sComentario=prompt("Comentario acerca del wod");
            if(sMarca==''){
                alert("Debes indicar un tiempo o cantidad de rondas");
            }else{
                $.ajax({
                    data:{
                        sCodigoWebPhp:sIdentificador, sMarcaPhp:sMarca, sComentarioPhp:sComentario, Mandato:'GuardarWODTime'
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
                        if(respuesta!="FULL"){
                            alert(respuesta);
                        }
                    },error:function(jqXHR, textStatus, errorThrown){
                        ajax_error(jqXHR, textStatus, errorThrown,true);
                    }
                });
            }
        }
    });


    $('#btMeGusta').click(function(){
        $('#btMeGusta').css("background-color: red;");
        var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
        var sWOD=localStorage.getItem("idWOD");   //aSesion["CodigoWeb"];
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sWODPhp:sWOD, Mandato:'MeGustaElWOD'
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
                $('.cargando').fadeIn();
            },success:function(respuesta){  
                $.mobile.loading( "hide" );
                if(parseInt(respuesta)>0){
                    $("#btMeGusta").text(" "+respuesta);
                }
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });
	var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'WOD'
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
            var aWOD = JSON.parse(respuesta);
            $.each( aWOD, function( i, value ) { 
                $("#itemswod").html(value['observacion']);
                localStorage.setItem("idWOD", value['id_obser']);
                if(parseInt(value['activa'])>0){
                    $("#btMeGusta").text(" "+parseInt(value['activa']));
                }
            })
            
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
    $('#liGuardarWOD').click(function(){
        $.mobile.changePage("guardarwod.html",{ transition : "flip" });
    });

});

