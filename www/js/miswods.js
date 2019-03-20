$(document).on("pageshow","#miswods",function(event,ui){

    $('#volver').click(function(){
        $.mobile.changePage("wod.html",{ transition : "flip" });
    });


    $('#liQuitarWOD').click(function(){
        var x = document.getElementById("listaWODs").selectedIndex;
        var y = document.getElementById("listaWODs").options;
        var borrarWOD=confirm("Estas seguro de quitar el WOD -> "+y[x].text);
        if(borrarWOD){
            var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
            var sWOD=localStorage.getItem("idWOD");
            $.ajax({
                data:{
                    sCodigoWebPhp:sIdentificador, sWODPhp:sWOD, Mandato:'QuitarWOD'
                },
                url:globalURL,
                method:'POST',
                beforeSend:function(){
                    $('.cargando').fadeIn();
                },success:function(respuesta){  
                    alert(respuesta);
                },error:function(jqXHR, textStatus, errorThrown){
                    ajax_error(jqXHR, textStatus, errorThrown,true);
                }
            });
        }
    });

    $('#listaWODs').change(function(){
        var sWOD=$('#listaWODs').val();
        var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sWODPhp:sWOD, Mandato:'PonerWOD'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $('.cargando').fadeIn();
            },success:function(respuesta){  
                var aWOD = JSON.parse(respuesta);
                $.each( aWOD, function( i, value ) { 
                    $("#itemswod").html(value['observacion']);
                    $("#labComentario").text(value['vcComentario']);
                    localStorage.setItem("idWOD", value['id_obser']);
                })                
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });
	var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'MisWOD'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $('.cargando').fadeIn();
        },success:function(respuesta){  
            $("#listaWODs option").remove();
            $("#listaWODs").append('<option value="SIN"> -------- </option>');
            var aAreas = JSON.parse(respuesta);
            $.each( aAreas, function( i, value ) { 
                $("#listaWODs").append('<option value="'+value['iWOD']+'" >'+value['vcTitulo']+'</option>');
            })
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
});

