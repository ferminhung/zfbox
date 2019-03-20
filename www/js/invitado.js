$(document).on("pageshow","#invitado",function(event, ui){
    var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
    //var sNombre=aSesion["nombre"];
    $("#InfoReserva").html("<span class='icon-user-plus'></span> Reserva para "+sIdentificador);
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
            $('.cargando').fadeIn();
        },success:function(respuesta){  
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
            $.ajax({
                data:{
                    sCodigoWebPhp:sIdentificador, Mandato:'ListaEventos'
                },
                url:globalURL,
                method:'POST',
                beforeSend:function(){
                    $('.cargando').fadeIn();
                },success:function(respuesta){  
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
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $("#volverInicio").click(function(){
        $.mobile.changePage("panel.html",{ transition : "fade" });

    });

    $("#btReservaInvitado").click(function(){
        var sEvento=document.formInvitado.listaClases.value;
        var sNombre=document.formInvitado.tInvitado.value;
        var sID=document.formInvitado.tID.value;
        var sEmail=document.formInvitado.tEmail.value;
        var sTelefono=document.formInvitado.tMovil.value;
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sNombrePhp:sNombre, sEmailPhp:sEmail, sTelefonoPhp:sTelefono, sEventoPhp:sEvento, sIDPhp:sID, Mandato:'Invitacion'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $('.cargando').fadeIn();
            },success:function(respuesta){  
                if(respuesta=="Registro Exitoso"){
                    $("#btReservaInvitado").html('<span class="icon-checkmark"></span> Solicitud Exitosa <span class="icon-happy"></span>');
                    $("#btReservaInvitado").css("background-color","green");
                }else{
                    alert(respuesta);
                    $("#btReservaInvitado").html("<span class='icon-sad'></span> Vuelve a Intentarlo");
                    $("#btReservaInvitado").css("background-color","red");
                }
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });

    $("#listaClases").change(function(){
        var sEvento=document.formInvitado.listaClases.value;
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sIDEventoPhp:sEvento, Mandato:'TotalCupos'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $('.cargando').fadeIn();
            },success:function(respuesta){  
                $("#labCupos").text(respuesta);
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });
});