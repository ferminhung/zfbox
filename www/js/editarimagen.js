function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#fotoperfil').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}



$(document).on("pageshow","#editarimagen",function(event, ui){

    var sIdentificador = localStorage.getItem("codigoweb");
    var stipoUsuario = localStorage.getItem("tipoUsuario");
    var sCambio = localStorage.getItem("FotoCambiar");
    var sImagen = localStorage.getItem("editimagen");
    var sOpcion='';
    var sGrabar='';
    var sNumFoto='';
    
    var angleInDegrees=0;

    $("#iraperfil").click(function(){
       $.mobile.changePage("perfil.html",{ transition : "fade" });
    });

    $("#archivoImagen").change(function(){
        readURL(this);
    });

    switch (sCambio){
        case 'PANELADMIN':
            sOpcion='ImagenPanel';
            sGrabar='GuardarImagenPanel';
            break;
        case 'PAGO':
            sOpcion='S/N';
            sGrabar='GuardarImagenPago';
            break;
    }


alert(sImagen);
    var imagen = new Image();
    var canvas = document.getElementById('fotocanvas');
    var ctx=canvas.getContext("2d");
    imagen.src=sImagen;
    var maxW=300;
    var maxH=300;
    var iw=imagen.width;
    var ih=imagen.height;
    var scale=Math.min((maxW/iw),(maxH/ih));
    var iwScaled=iw*scale;
    var ihScaled=ih*scale;
    canvas.width=iwScaled;
    canvas.height=ihScaled;
    ctx.drawImage(imagen,0,0,iwScaled,ihScaled);

    $("#rotar").click(function(){
        angleInDegrees+=90;
        drawRotated(angleInDegrees);

    });

    function drawRotated(degrees){
        var canvas = document.getElementById('fotocanvas');
        var ctx=canvas.getContext("2d");
        var image=document.getElementById("fotoperfil");
        var maxW=300;
        var maxH=300;
        var iw=image.width;
        var ih=image.height;
        var scale=Math.min((maxW/iw),(maxH/ih));
        var iwScaled=iw*scale;
        var ihScaled=ih*scale;
        canvas.width=iwScaled;
        canvas.height=ihScaled;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(degrees*Math.PI/180);
        ctx.drawImage(image,-canvas.width/2,-canvas.height/2,iwScaled,ihScaled);
        ctx.restore();
    }

    $("#subirimagen").click(function(){
        var canvas = document.getElementById('fotocanvas');
        
        var image_data = canvas.toDataURL();
        var codigo = sIdentificador.substring(0, 3);
        $.ajax({
            url:"http://conacademia.com/crossfit/appmovil/subirimagen.php",
            method:"POST",
            data:{
            dataPhp:image_data, Mandato:"http://conacademia.com/crossfit/appmovil/img/"+codigo+"/", CodigoPhp: codigo},
            beforeSend:function(){
                $.mobile.loading( "show", {
                  text: "Subiendo Imagen",
                  textVisible: true,
                  theme: "a",
                  html: ""
                });
            },success:function(respuesta){
                $.mobile.loading( "hide" );
                if(respuesta!="Impossible upload the image."){
                    $("#respuesta").text("Se cargo la imagen con exito");
                    var sCambio = localStorage.getItem("FotoCambiar");
                    switch(sCambio){
                        case 'PANELADMIN':
                            var sFoto =  respuesta;
                            $.ajax({
                                data:{
                                    sCodigoWebPhp:sIdentificador, sDireccionFotoPhp:sFoto, Mandato: sGrabar
                                },
                                url:globalURL,
                                method:'POST',
                                beforeSend:function(){
                                    $.mobile.loading( "show", {
                                      text: "cargando...",
                                      textVisible: true,
                                      theme: "a",
                                      html: ""
                                    });
                                },success:function(respuesta){
                                    $.mobile.loading( "hide" );
                                    alert(respuesta);
                                },error:function(jqXHR, textStatus, errorThrown){
                                    ajax_error(jqXHR, textStatus, errorThrown,true);
                                }
                            });
                            break;
                        case 'PAGO':
                            localStorage.setItem("imagenPago", respuesta);
                            $.mobile.changePage("pagos.html",{ transition : "fade" });
                            break;
                    }
                   
                }else{
                    alert("No se pudo Subir la Imagen");
                }
           

            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });    

    });    

  
    

});

