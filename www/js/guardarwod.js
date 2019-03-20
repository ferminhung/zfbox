$(document).on("pageshow","#guardarwod",function(event,ui){

    $('#volver').click(function(){
        $.mobile.changePage("wod.html",{ transition : "flip" });
    });

    $('#liVerWOD').click(function(){
        $.mobile.changePage("miswods.html",{ transition : "flip" });
    });

    $('#liGuardarWODYA').click(function(){
        var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
        var sEtiqueta=$("#tEtiqueta").val();
        var sComentario=$("#tComentario").val();
        var sIdWOD=localStorage.getItem("idWOD"); 
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sEtiquetaPhp:sEtiqueta, sComentarioPhp:sComentario, sIdWODPhp:sIdWOD, Mandato:'GuardarWOD'
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
                alert(respuesta);
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
            })
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
});

