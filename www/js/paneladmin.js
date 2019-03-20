$(document).on("pageshow","#paneladmin",function(event, ui){
     //var aSesion = check_session();
    var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
    localStorage.setItem("tipoUsuario","1");
    
    //var sNombre=aSesion["nombre"];
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'PanelAdmin'
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
            var aIndicadores = JSON.parse(respuesta);
             $.each( aIndicadores, function( i, value ) {
                $("#hdHeadPanel").text(value["admin"]);
                $('#menuadmin').html("");
                if(parseInt(value["reservas"])>0){
                    $("#menuadmin").html('<center><button onclick="irareservas()" class="btn-burbit-green" ><span class="icon-checkmark"></span></span> '+value["reservas"]+' Reservas Hoy</button></center>');
                }else{
                    $("#menuadmin").html('<center><button onclick="irareservas()" class="btn-burbit-grey" ><span class="icon-checkmark"></span></span> Sin Reservas Hoy</button></center>');
                }
                if(parseInt(value["vistaswod"])>0){
                    $("#menuadmin").append('<center><button onclick="iramenuwod()" class="'+value["colorwod"]+'" ><span class="icon-rocket"></span></span> '+value["vistaswod"]+' Vistas del WOD</button></center>');
                }else{
                    $("#menuadmin").append('<center><button onclick="iramenuwod()" class="'+value["colorwod"]+'" ><span class="icon-rocket"></span></span> '+value["vistaswod"]+' Vistas del WOD</button></center>');
                }
                $("#menuadmin").append('<center><button onclick="iractivos()" class="btn-burbit-yellow" ><span class="icon-shield"></span></span> '+value["activos"]+' Activos / '+value["inactivos"]+'</button></center>');
                if(parseInt(value["pagos"])>0){
                    $("#menuadmin").append('<center><button onclick="irapagos()" class="btn-burbit-green" ><span class="icon-credit-card"></span></span> '+value["pagos"]+' Pagos Registrados</button></center>');
                }else{
                    $("#menuadmin").append('<center><button class="btn-burbit-grey" ><span class="icon-credit-card"></span></span> No Hay Pagos</button></center>');
                }
                if(parseInt(value["marcas"])>0){
                    $("#menuadmin").append('<center><button onclick="iramarcas()" class="btn-burbit-green" ><span class="icon-trophy"></span></span> '+value["marcas"]+' Marcas Registradas</button></center>');
                }else{
                    $("#menuadmin").append('<center><button onclick="iramarcas()" class="btn-burbit-grey" ><span class="icon-trophy"></span></span> Sin Marcas Registradas</button></center>');
                }
                if(parseInt(value["totalmegustas"])>0){
                    $("#menuadmin").append('<center><button onclick="vermegustas()" class="btn-burbit-green" ><span class="icon-heart"></span></span> '+value["totalmegustas"]+' Me Gusta en el WOD</button></center>');
                }else{
                    $("#menuadmin").append('<center><button onclick="vermegustas()" class="btn-burbit-grey" ><span class="icon-heart"></span></span> Aun No Gusta el WOD</button></center>');
                }
                $("#menuadmin").trigger('create');
            });
            
            

        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'Cartel'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $('.cargando').fadeIn();
        },success:function(respuesta){  
            var aPerfil = JSON.parse(respuesta);
            var imagen = new Image();
            $.each( aPerfil, function( i, value ) {
                switch (value["codGrado"]){
                    case '2':
                        $('#espaciocartel').html("");
                        imagen.src = value["observacion"];
                        imagen.height=180;
                        $('#espaciocartel').html(imagen);
                        break;
                   
                }
            });
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
					$('.cargando').fadeIn();
				},success:function(respuesta){  
					$("#espacioStalk").html(" ");
					var icono="icon-checkmark";
					var color="white";
					if(respuesta!="SIN REGISTROS"){
						 $('#espacioStalk').html('<br>');
						var aStalk = JSON.parse(respuesta);
						var aListaStalk=JSON.parse(aStalk[0].listaStalker);
						var aListaClases=JSON.parse(aStalk[0].clases)
						var clase="-";
						var claseID="0";
						$.each( aListaStalk, function( i, value ) { 
							switch(value['Proceso']){
								case 'WOD':
									icono="icon-eye";
									color="white";
									break;
								case 'Reservar':
									icono="icon-checkmark";
									color="green";
									break;
								case 'MeGustaElWOD':
									icono="icon-heart";
									color="yellow";
									break;
								case 'QuitarReserva':
									icono="icon-box-remove";
									color="red";
									break;
							}
							claseID=value['apellidos'];
							$.each( aListaClases, function( i, value ) { 
								if(value['id']==claseID){
									clase=value['strGrado'];
								}
							});
							$("#espacioStalk").append('<label style="color:'+color+';"><span class="'+icono+'"></span>['+value['telef']+'] '+clase+"-> "+value['nombres']+'</label>');
							clase="-";
						});
					}
				},error:function(jqXHR, textStatus, errorThrown){
					ajax_error(jqXHR, textStatus, errorThrown,true);
				}
			});
			$('#espacioStalk').append('<br><br><br><br><br><br><br><br> ');
			$('#espacioStalk').trigger('create');
		}
	});
    
});

function iramenuwod(){
    $.mobile.changePage("menuwod.html",{ transition : "fade" });
}
function irareservas(){
    $.mobile.changePage("listareservas.html",{ transition : "fade" });
}
function iracuenta(){
    $.mobile.changePage("miperfil.html",{ transition : "fade" });
}
function irapagos(){
    $.mobile.changePage("reportespagos.html",{ transition : "fade" });
}
function irainicio(){
    $.mobile.changePage("inicio.html",{ transition : "fade" });
}
function iramarcas(){
    //$.mobile.changePage("inicio.html",{ transition : "fade" });
}
function vermegustas(){
    //$.mobile.changePage("inicio.html",{ transition : "fade" });
}
function cerraradmin(){
    $.mobile.changePage("inicio.html",{ transition : "fade" });
}
function iractivos(){
    $.mobile.changePage("activos.html",{ transition : "fade" });
}
function cambiarimagen(){
    localStorage.setItem("FotoCambiar","PANELADMIN");
    $.mobile.changePage("perfil.html",{ transition : "fade" });
}
