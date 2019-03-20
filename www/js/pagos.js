$(document).on("pageshow","#pagos",function(event, ui){
    var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
    var sImagen=localStorage.getItem("imagenPago");   //aSesion["CodigoWeb"];
    //var sNombre=aSesion["nombre"];
    $("#InfoPagos").html("<span class='icon-user'></span> Cuenta "+sIdentificador);
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1; //hoy es 0!
    var yyyy = hoy.getFullYear();

    var imagen = new Image();
    imagen.src = sImagen;
    $("#labImagen").text(sImagen);
    imagen.width=250;
    $('#espacioFoto').html(imagen);
    $('#espacioFoto').show();


    $("#volverInicio").click(function(){
        $.mobile.changePage("panel.html",{ transition : "fade" });

    });

    $("#liVerCuentas").click(function(){
        $.mobile.changePage("reportepagos.html",{ transition : "fade" });

    });

    $("#btRegistrarPago").click(function(){
        var sDescripcion=document.formPagos.tDescripcion.value;
        var sMonto=document.formPagos.tMonto.value;
        var sReferencia=document.formPagos.tReferencia.value;
        var sFechaRegistro=document.formPagos.dFechaRegistro.value;
        var sArchivoImagen=$("#labImagen").text();
        var sDestino =document.formPagos.slcPlan.value;
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sDescripcionPhp:sDescripcion, sMontoPhp:sMonto, sReferenciaPhp:sReferencia, sFechaRegistroPhp:sFechaRegistro, sArchivoImagenPhp:sArchivoImagen, sDestinoPhp:sDestino, Mandato:'RegistrarPago'
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
                
    });

});

function adjuntarpago(){
    localStorage.setItem("FotoCambiar","PAGO");
    $.mobile.changePage("perfil.html",{ transition : "fade" });
}
