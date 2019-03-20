$(document).on("pageshow","#reportepagos",function(event, ui){
    //var aSesion = check_session();
    var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
    localStorage.setItem("imagenPago", "");

    //var sNombre=aSesion["nombre"];
    $("#hdCabeceraUser").html("<span class='icon-user'></span> "+sIdentificador);
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'NombreUsuario'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $('.cargando').fadeIn();
        },success:function(respuesta){  
            var sFitness = respuesta;
            $("#hdHeadPanel").text(sFitness);
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    
    $('#liStalk').click(function(){
		if($('#espacioStalk').html().length>10){
			$("#espacioStalk").html(" ");
		}else{
			$("#espacioStalk").html('<br><br><label style="color:yellow;"><span class="icon-search"></span>Buscando Actividad</label>');
			$.ajax({
				data:{
					sCodigoWebPhp:sIdentificador, Mandato:'Stalker'
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
					
				},error:function(jqXHR, textStatus, errorThrown){
					ajax_error(jqXHR, textStatus, errorThrown,true);
				}
			});
			$('#espacioStalk').append('<br><br><br><br><br><br><br><br> ');
			$('#espacioStalk').trigger('create');
		}
    });
    
    $("#liPagos").click(function(){
        $.mobile.changePage("pagos.html",{ transition : "fade" });
    });
    $("#irInvitado").click(function(){
        $.mobile.changePage("panel.html",{ transition : "fade" });
    });
    
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'PagosAnteriores'
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
            $("#espacioReporte").html(" ");
            var icono="icon-upload";
            var color="white";
            if(respuesta!="SIN REGISTROS"){
                $('#espacioReporte').html('<br>');
                var aStalk = JSON.parse(respuesta);
                
                $.each( aStalk, function( i, value ) { 
                    switch(value['estatus']){
                        case '1':
                            icono="icon-upload";
                            color="white";
                            break;
                        case '2':
                            icono="icon-checkmark";
                            color="green";
                            break;
                        case '3':
                            icono="icon-cancel-circle";
                            color="red";
                            break;
 
                    }
                    $("#espacioReporte").append('<label style="color:'+color+';"><span class="'+icono+'"> </span>['+value['fecha']+'] '+'-> '+value['razon']+' ( '+value['monto']+' ) </label>');
                });
                $('#espacioReporte').append('<br><br> ');
                $('#espacioReporte').trigger('create');
            }
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });



    
});

