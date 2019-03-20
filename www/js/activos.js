$(document).on("pageshow","#activos",function(event, ui){
    

    var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
    //var sNombre=aSesion["nombre"];
    $("#InfoActivos").html("<span class='icon-user'></span> Trainer: "+sIdentificador);
    
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'NominaAtletas'
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
            if(respuesta!="SIN REGISTROS"){
                var aCtivos = JSON.parse(respuesta);
                var html = '';
                if (respuesta!="SIN"){
                    var aTletas = JSON.parse(respuesta);
                    var ij=0;
                    $.each( aTletas, function( i, value ) {
                        html += '<tr id="fila'+ij+'"style="display: block !important;"><td style="width:50px !important;">'+value['id']+'</td><td style="width:150px !important;">'+value['nombres']+'</td><td style="width:100px !important;"><button  onclick="desactivar('+value['id']+','+sIdentificador+','+ij+')" class="btn-desac"> DesActivar</button></td></tr>';
                        ij+=1;
                    });
                    html += '';
                }else{
                    html += '<tr style="display: block !important;"><td style="width:50px !important;"></td><td style="width:150px !important;">Sin Registros</td><td style="width:100px !important;"></td></tr>';
                }
                $('#tablafiliados').removeClass('ui-table ui-table-reflow');
                $('#afiliados').html(html);
                $('#afiliados').trigger('create');
                $("#labDescripcion").text(ij+" Activos");
            }
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $("#volverInicio").click(function(){
        $.mobile.changePage("paneladmin.html",{ transition : "fade" });

    });


    $("#verLista").click(function(){
        var sMandoLista = "Inactivos";
        var btnaccion="btn-desac";
        var etiqueta="Activos";
        var evento="";
        if($('#verLista').text()=='Ver Activos'){
            $('#verLista').text('Ver Inactivos');
            sMandoLista = "NominaAtletas";
            btnaccion='btn-desac"> DesActivar';
            etiqueta="Activos";
            evento="desactivar("
        }else{
            $('#verLista').text('Ver Activos');
            sMandoLista = "Inactivos";
            btnaccion='btn-act"> Activar';
            etiqueta="Inactivos";
            evento="activar("
        }

        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, Mandato: sMandoLista
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
                
                if(respuesta!="SIN REGISTROS"){
                    var aCtivos = JSON.parse(respuesta);
                    var html = '';
                    if (respuesta!="SIN"){
                        var aTletas = JSON.parse(respuesta);
                        var ij=0;
                        $.each( aTletas, function( i, value ) {
                            html += '<tr id="fila'+ij+'" style="display: block !important;"><td style="width:50px !important;">'+value['id']+'</td><td style="width:150px !important;">'+value['nombres']+'</td><td style="width:100px !important;"><button  onclick="'+evento+value['id']+','+sIdentificador+','+ij+')" class="'+btnaccion+'</button></td></tr>';
                            ij+=1;
                        });
                        html += '';
                    }else{
                        html += '<tr style="display: block !important;"><td style="width:50px !important;"></td><td style="width:150px !important;">Sin Registros</td><td style="width:100px !important;"></td></tr>';
                    }
                    $('#tablafiliados').removeClass('ui-table ui-table-reflow');
                    $('#afiliados').html(html);
                    $('#afiliados').trigger('create');
                    $("#labDescripcion").text(ij+' '+etiqueta);

                }
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });    

    });


    $('#btHome').click(function(){
        $.mobile.changePage("paneladmin.html",{ transition : "flip" });
    });
});

function desactivar(id, sIdentificador, i){
     $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, sIdPhp:id, Mandato:'DesActivar'
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
            $('#fila'+i).remove();
            alert(respuesta);
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
}

function activar(id, sIdentificador, i){
     $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, sIdPhp:id, Mandato:'Activar'
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
            $('#fila'+i).remove();

        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
}