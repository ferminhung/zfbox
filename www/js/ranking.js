$(document).on("pageshow","#ranking",function(event,ui){

    $('#volver').click(function(){
        $.mobile.changePage("panel.html",{ transition : "flip" });
    });

    var sIdentificador=localStorage.getItem("codigoweb");    
    $('#slcEjercicio').change(function(){
        var sRM=$('#slcEjercicio').val();
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sRMPhp:sRM, Mandato:'RankingRM'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $('.cargando').fadeIn();
            },success:function(respuesta){  
                var html = '<ul data-role="listview" ><li data-role="list-divider">Ranking RM</li>';
                var aRM = JSON.parse(respuesta);
                $.each( aRM, function( i, value ) { 
                    html += '<li><a > <span class="ui-li-count">' +value['nombres']+'</span> ' +value['RM']+'</a></li>';
                })
                $('#itemswod').html(html+'<br>');
                $('#itemswod').trigger('create');
                
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });
	var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'RankingWOD'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $('.cargando').fadeIn();
        },success:function(respuesta){  
            $("#itemswod").html(respuesta);
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $('#verRankingWOD').click(function(){
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, Mandato:'VerWODRankings'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $('.cargando').fadeIn();
            },success:function(respuesta){  
                if(respuesta!="NADA"){
                    var html = '<ul data-role="listview" ><li data-role="list-divider">Rankings WOD</li>';
                    var aRM = JSON.parse(respuesta);
                    $.each( aRM, function( i, value ) { 
                        html += '<li><a > <span class="ui-li-count">' +value['ingTotal']+'</span> ' +value['nombres']+'</a></li>';
                    })
                    $('#itemswod').html(html+'<br>');
                    $('#itemswod').trigger('create');
                }else{
                    $('#itemswod').html('<center><label>No existen Registros</label></center><br>');
                    $('#itemswod').trigger('create');
                }                
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });

    $("#liRankingWOD").click(function(){
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
                        $('.cargando').fadeIn();
                    },success:function(respuesta){  
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
});

