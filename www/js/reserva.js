$(document).on("pageshow","#reserva",function(event, ui){
    localStorage.setItem("pulsoreserva","-");
    var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
    //var sNombre=aSesion["nombre"];
    $("#InfoReserva").html("<span class='icon-user'></span> Reserva para "+sIdentificador);
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1; //hoy es 0!
    var yyyy = hoy.getFullYear();
    $("#labDescripcion").text(" Disponibles para "+dd+"/"+mm+"/"+yyyy);
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'VerReserva'
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
            var sReserva="SIN";
            if(respuesta!="SIN"){
                var aReserva = JSON.parse(respuesta);
                var sReserva="SIN";
                var sClase="0";
                var idReserva="0";
                $.each( aReserva, function( i, value ) { 
                    sReserva=value['strGrado'];
                    sClase=value['grado'];
                    idReserva=value['id'];
                })
            }
            if(sReserva=="SIN"){
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
            }else{
                alert("Ya Tienes una reserva para: "+sReserva);
                $("#listaClases option").remove();
                $("#listaClases").append('<option value="'+sClase+'">'+sReserva+'</option>');
                $("#btReservar").text("Quitar Reserva");
                localStorage.setItem("idReserva",idReserva);
            }
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $("#volverInicio").click(function(){
        $.mobile.changePage("panel.html",{ transition : "fade" });

    });

    $("#btReservar").click(function(){
		
        var sEvento=document.formReservas.listaClases.value;
        if($("#btReservar").text()!="Quitar Reserva"){
            if(sEvento!='SIN'){
                var pulsarreserva=localStorage.getItem("pulsoreserva"); 
                if (pulsarreserva=='-'){
                    localStorage.setItem("pulsoreserva","enviando");
                    $.ajax({
                        data:{
                            sCodigoWebPhp:sIdentificador, sIDEventoPhp:sEvento, Mandato:'Reservar'
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
                                localStorage.setItem("pulsoreserva","enviada");
                                alert(respuesta);
                                $.mobile.changePage("panel.html",{ transition : "fade" });
                            }
                        },error:function(jqXHR, textStatus, errorThrown){
                            ajax_error(jqXHR, textStatus, errorThrown,true);
                        }
                    });
                }
            }
        }else{
            var sIdReserva=localStorage.getItem("idReserva");
			//$("#btReservar").disabled();			
            $.ajax({
                data:{
                    sCodigoWebPhp:sIdentificador, sIdPhp:sIdReserva, Mandato:'QuitarReserva'
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
                    $.mobile.changePage("panel.html",{ transition : "fade" });
                },error:function(jqXHR, textStatus, errorThrown){
                    ajax_error(jqXHR, textStatus, errorThrown,true);
                }
            });
        }
		
    });

    $("#listaClases").change(function(){
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
    });
});