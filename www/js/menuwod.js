$(document).on("pageshow","#menuwod",function(event, ui){
     //var aSesion = check_session();
    var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
    //var sNombre=aSesion["nombre"];
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'NombreUsuario'
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
            var sFitness = respuesta;
            $("#hdHeadPanel").text(sFitness);
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'VistasWOD'
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
            var html = '<ol data-role="listview" ><li data-role="list-divider">Vistas al WOD</li>';
            if (respuesta!="SIN"){
                var aVistas = JSON.parse(respuesta);
                var ij=0;
                $.each( aVistas, function( i, value ) {
                    html += '<li><a'+value['id']+'">'+value['nombres']+' <span class="ui-li-count"> '+value['telef']+' </span></a></li>';
                    ij+=1;
                });
                html += '</ol>';
            }else{
                html += '<li><a "SIN"> SIN VISTAS</a></li>';
            }
            $('#listaVistas').html(html);
            $('#listaVistas').trigger('create');

        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $("#liCrearWOD").click(function(){
        $.mobile.changePage("crearwod.html",{ transition : "fade" });
    });
    
    $("#liVerWOD").click(function(){
        $.mobile.changePage("veradminwod.html",{ transition : "fade" });
    });
    $("#liCerrar").click(function(){
        $.mobile.changePage("paneladmin.html",{ transition : "fade" });
    });
});

