$(document).on("pageshow","#listareservas",function(event, ui){
    var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
    //var sNombre=aSesion["nombre"];
    $("#InfoReserva").html("<span class='icon-user'></span> Trainer: "+sIdentificador);
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1; //hoy es 0!
    var yyyy = hoy.getFullYear();
    $("#labDescripcion").text(" Disponibles para "+dd+"/"+mm+"/"+yyyy);
    
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'ListaEventos'
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
            $("#listaClases option").remove();
            $("#listaClases").append('<option value="SIN"> -------- </option>');
            if(respuesta!="SIN REGISTROS"){
                var aAreas = JSON.parse(respuesta);
                $.each( aAreas, function( i, value ) { 
                    $("#listaClases").append('<option value="'+value['id']+'" ">'+value['strGrado']+'</option>');
                })
            }
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sIDEventoPhp:"TODOS", Mandato:'ListaAtletas'
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
                var html = '<ol data-role="listview" ><li data-role="list-divider">Atletas</li>';
                if (respuesta!="SIN"){
                    var aTletas = JSON.parse(respuesta);
                    var ij=0;
                    $.each( aTletas, function( i, value ) {
                        html += '<li><a'+value['strGrado']+'">'+value['nombres']+' <span class="ui-li-count"> '+value['clase']+' </span></a></li>';
                        ij+=1;
                    });
                    html += '</ol>';
                }else{
                    html += '<li><a "SIN"> SIN RESERVAS</a></li>';
                }
                $('#listaAtletas').html(html);
                $('#listaAtletas').trigger('create');

            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    $("#volverInicio").click(function(){
        $.mobile.changePage("paneladmin.html",{ transition : "fade" });

    });

    $("#listaClases").change(function(){
        var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
        var sEvento=document.formReservas.listaClases.value;
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sIDEventoPhp:sEvento, Mandato:'TotalCupos'
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
                $("#labCupos").text(respuesta);
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });

        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sIDEventoPhp:sEvento, Mandato:'ListaAtletas'
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
                var html = '<ol data-role="listview" ><li data-role="list-divider">Atletas</li>';
                if (respuesta!="SIN"){
                    var aTletas = JSON.parse(respuesta);
                    var ij=0;
                    $.each( aTletas, function( i, value ) {
                        html += '<li><a'+value['strGrado']+'">'+value['nombres']+' <span class="ui-li-count"> RM </span></a></li>';
                        ij+=1;
                    });
                    html += '</ol>';
                }else{
                    html += '<li><a "SIN"> SIN RESERVAS</a></li>';
                }
                $('#listaAtletas').html(html);
                $('#listaAtletas').trigger('create');

            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });

    });
});