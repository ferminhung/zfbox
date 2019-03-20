var totalRows = 5;
var activeRow = 1;


$(document).on("pageshow","#crearwod",function(event,ui){

    $('#volver').click(function(){
        $.mobile.changePage("paneladmin.html",{ transition : "flip" });
    });

    $('#iratras').click(function(){
        $.mobile.changePage("menuwod.html",{ transition : "flip" });
    });

    
    $('#btModal').click(function(){
        cambiarplan(activeRow);
    });

    $('#btGrabarWOD').click(function(){
        var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
        var sFecha=$("#tFecha").val();
        var i=0;
        var sWOD="";
        for (i = 1; i <= totalRows; i++) {
            sWOD+="{'ejercicio':'"+$("#tE"+i).val()+"', ";
            sWOD+="'cant':'"+$("#tCant"+i).val()+"'},";
        }

        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sFechaPhp:sFecha, sWODPhp:"["+sWOD+"]", Mandato:'GrabarWOD'
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
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });


    });
    $('#btHome').click(function(){
        $.mobile.changePage("paneladmin.html",{ transition : "flip" });
    });

    $('#btAgregarItem').click(function(){
        totalRows=totalRows+1;
        $("#espaciowod").append('<div><div class="col-sm-10" style="text-align: center;"><a onclick="cambiarplan('+totalRows+')"><span class="icon-plus"></span></a></div><div class="col-sm-20"><input type="text" id="tCant'+totalRows+'"> </input></div><div class="col-sm-60"><input type="text" id="tE'+totalRows+'"> </input></div><div class="col-sm-10" style="text-align: center;"><a ><span class="icon-arrow-up"></span></a></div><div class="col-sm-10" style="text-align: center;"><a ><span class="icon-minus"></span></a></div><div class="col-sm-10" style="text-align: center;"><a ><span class="icon-arrow-down"></span></a></div></div>');
        $("#espaciowod").trigger("create");
    });


    $('#btEnviar').click(function(){
        var x = document.getElementById("listaEjercicios").selectedIndex;
        var y = document.getElementById("listaEjercicios").options;
        var html = '<ul data-role="listview" ><li data-role="list-divider">Ranking RM</li>';
        html += '<li><a > <span class="ui-li-count">' + y[x].text +'</span> ' + $("#listaBloque").val() + '/' + $("#listaModalidad").val() + $("#tTimeCap").val() + '/' +  $("#listaComplejidad").val() + '/' +  $("#listaTipo").val() + '/' +  $("#listaEjercicios").val() + '/' +  $("#tCantidad").val() + '</a></li>';
        $('#listaDia').html(html+'<br>');
        $('#listaDia').trigger('create');

        $("#listaComplejidad").selectedIndex=0;
        $("#listaBloque").selectedIndex=0;
        $("#listaModalidad").selectedIndex=0;
        $("#listaTipo").selectedIndex=0;
        var sFecha=$("#tFecha").val();
        var sBloque=$("#listaBloque").val();
        var sModo=$("#listaModalidad").val()+ $("#tTimeCap").val();
        var sComplex=$("#listaComplejidad").val();
        var sTipo=$("#listaTipo").val();
        var sEjercicio=$("#listaEjercicios").val();
        var sOtro=$("#tOtro").val(); 
        var sCantidad=$("#tCantidad").val(); 
        var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sFechaPhp:sFecha, sBloquePhp:sBloque, sModoPhp:sModo, sComplexPhp:sComplex, sTipoPhp:sTipo, sEjercicioPhp:sEjercicio, sCantidadPhp:sCantidad, sOtroPhp:sOtro, Mandato:'CrearWOD'
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

    
    // setTimeout(CargarPromociones(), 500);

});

function cambiarplan(rowactiva){
    //$('#modal') este es el div contenedor del modal");
    //var modal, armo la estructura del modal
    var modal = '<div class="modal-dialog modal-lg">';
        modal += '<div class="modal-content">';
        modal += '<div class="modal-header">';
        modal += '<button type="button" onclick="cerrarmodal()" class="close" data-dismiss="modal" aria-label="Cerrar"><span aria-hidden="true">×</span></button>';
        modal += '<h4 class="modal-title">Item WOD</h4>';
        modal += '</div>';
        modal += '<div class="modal-plan">';
        modal += '<div class="overlay-wrapper">';
        modal += '<div class="overlay">';
        modal += '<i class="fa fa-refresh fa-spin"></i>';
        modal += '</div></div></div>';
        modal += '<div class="clearfix">&nbsp;</div>';
        modal += '<div style="clear:both;" class="modal-footer" align="center"></div>';
        modal += '</div>';
    
    //html le coloco el contenido al selector indicado, en este caso, yo estoy indicando que a #modal se le va a agregar todo lo que esta dentro del parentesis
    $('#modal').html(modal);
    //luego de que agregue la estructura a de la ventana a #content, le agrego al div .boxContent (q lo acabo de crear), el contenido que va a generar la funcion "ponerusuario(id,obj)"
    $('.modal-plan').append(buscarplan(rowactiva,'.modal-plan'));
    //despus q ya cree toda la estructura, le indico q la ventana como tal va a aparecer deslizandose hacia abajo.
    $('#modal').show(); //modal();
    //$('.imgBox').slideDown('fast',function(){$('.label').show()});
}

function buscarplan(rowactiva,obj){
    var formulario = '<form class="editForm form" id="edit"><div class="contentBox" align="left">';
    formulario += '<div class="col-sm-20" align="left">';
    formulario += '<label >Bloque</label>';
    formulario += '<select id="listaBloque">';
    formulario += '<option value="WUP">Warn Up</option>';
    formulario += '<option value="PRT">Protocolo</option>';
    formulario += '<option value="WOD">WOD</option>';
    formulario += '<option value="BUY">Buy Out</option>';
    formulario += '</select>';
    formulario += '</div>';
    formulario += '<div class="col-sm-20" align="left">';
    formulario += '<label >Modo</label>';
    formulario += '<select id="listaModalidad">';
    formulario += '<option value="ARP">AMRAP</option>';
    formulario += '<option value="EMO">EMOM</option>';
    formulario += '<option value="CHI">Chipper</option>';
    formulario += '<option value="FOR">For Time</option>';
    formulario += '<option value="TBT">Tabata</option>';
    formulario += '<option value="CPX">Complex</option>';
    formulario += '</select>';
    formulario += '</div>';
    formulario += '<div class="col-sm-25" align="left">';
    formulario += '<label >Tipo</label>';
    formulario += '<select id="listaTipo"  onchange="cambiomodal()">';
    formulario += '<option value="GYM">Gymnastic</option>';
    formulario += '<option value="WLF">W.Lifting</option>';
    formulario += '<option value="MET">Metabolic</option>';
    formulario += '</select>';
    formulario += '</div>';
    formulario += '<div class="col-sm-20" align="left">';
    formulario += '<label >Nivel</label>';
    formulario += '<select id="listaComplejidad" onchange="cambiomodal()">';
    formulario += '<option value="BAS">Basico</option>';
    formulario += '<option value="INT">Intermedio</option>';
    formulario += '<option value="AVA">Avanzado</option>';
    formulario += '</select>';             
    formulario += '</div>';
    formulario += '</div>';

    var result = '<select id="listaEjercicios">';
    result += '<option value="0101" ">Ring Row</option>';
    result += '<option value="0102" ">Bar Row </option>';
    result += '<option value="0103" ">Squat</option>';
    result += '<option value="0104" ">Sit-Ups</option>';
    result += '<option value="0105" ">Burpees</option>';
    result += '<option value="0106" ">H.Hold</option>';
    result += '<option value="0107" ">Push-Up</option>';
    result += '<option value="0108" ">H.R.P.U</option>';
    result += '</select><br>';             

    $('.modal-footer').html(result+'<br><button type="button" id="edit-info" onclick="agregaritem('+rowactiva+')" class="btn-burbit-green">Registrar Ejercicio</button></div>');
    $('.modal-title').html('Nuevo Ejercicio ');
    $(obj).html(formulario);
}

function cerrarmodal(){
    $("#modal").hide();
}

function cambiomodal(){
    $("#listaEjercicios option").remove();
    if ($("#listaTipo").val()=='GYM'){
        if ($("#listaComplejidad").val()=='BAS'){
            $("#listaEjercicios").append('<option value="0101" ">Ring Row</option>');
            $("#listaEjercicios").append('<option value="0102" ">Bar Row </option>');
            $("#listaEjercicios").append('<option value="0103" ">Squat</option>');
            $("#listaEjercicios").append('<option value="0104" ">Sit-Ups</option>');
            $("#listaEjercicios").append('<option value="0105" ">Burpees</option>');
            $("#listaEjercicios").append('<option value="0106" ">H.Hold</option>');
            $("#listaEjercicios").append('<option value="0107" ">Push-Up</option>');
            $("#listaEjercicios").append('<option value="0108" ">H.R.P.U</option>');
        }
        if ($("#listaComplejidad").val()=='INT'){
            $("#listaEjercicios").append('<option value="0121" ">Pistol</option>');
            $("#listaEjercicios").append('<option value="0122" ">Rope Climb</option>');
            $("#listaEjercicios").append('<option value="0123" ">Pull-Ups</option>');
            $("#listaEjercicios").append('<option value="0124" ">C2B</option>');
            $("#listaEjercicios").append('<option value="0125" ">T2B</option>');
            $("#listaEjercicios").append('<option value="0126" ">Ring Dips</option>');
            $("#listaEjercicios").append('<option value="0127" ">Bow Dips</option>');
            $("#listaEjercicios").append('<option value="0128" ">H.S.P.U</option>');
            $("#listaEjercicios").append('<option value="0129" ">G.H.D</option>');
            $("#listaEjercicios").append('<option value="0130" ">Wall Climbs</option>');
        }
        if ($("#listaComplejidad").val()=='AVA'){
            $("#listaEjercicios").append('<option value="0141" ">Ring Muscle Up</option>');
            $("#listaEjercicios").append('<option value="0142" ">Bar Muscle Up</option>');
            $("#listaEjercicios").append('<option value="0143" ">H.S.W</option>');
        }
    }
    if ($("#listaTipo").val()=='WLF'){
        if ($("#listaComplejidad").val()=='BAS'){
            $("#listaEjercicios").append('<option value="0201" ">Deadlift</option>');
            $("#listaEjercicios").append('<option value="0202" ">KB</option>');
            $("#listaEjercicios").append('<option value="0203" ">R.K.B</option>');
            $("#listaEjercicios").append('<option value="0204" ">Med Ball Clean</option>');
            $("#listaEjercicios").append('<option value="0205" ">Goblet Squat</option>');
            $("#listaEjercicios").append('<option value="0206" ">Bench Press</option>');
            $("#listaEjercicios").append('<option value="0207" ">Lunges</option>');
        }
        if ($("#listaComplejidad").val()=='INT'){
            $("#listaEjercicios").append('<option value="0221" ">Squat Clean</option>');
            $("#listaEjercicios").append('<option value="0222" ">Hang Power Clean</option>');
            $("#listaEjercicios").append('<option value="0223" ">Power Clean</option>');
            $("#listaEjercicios").append('<option value="0224" ">Power Snatch</option>');
            $("#listaEjercicios").append('<option value="0225" ">Hang Power Snatch</option>');
            $("#listaEjercicios").append('<option value="0226" ">Back Squat</option>');
            $("#listaEjercicios").append('<option value="0227" ">Front Squat</option>');
            $("#listaEjercicios").append('<option value="0228" ">Dumbell</option>');
            $("#listaEjercicios").append('<option value="0229" ">Push Press</option>');
            $("#listaEjercicios").append('<option value="0230" ">Shoulder Press</option>');
            $("#listaEjercicios").append('<option value="0231" ">Thruster</option>');
            $("#listaEjercicios").append('<option value="0232" ">Turkish</option>');
            $("#listaEjercicios").append('<option value="0233" ">Muscle Clean y Snatch </option>');
            $("#listaEjercicios").append('<option value="0234" ">Jalon de Clean y Snatch</option>');
        }
        if ($("#listaComplejidad").val()=='AVA'){
            $("#listaEjercicios").append('<option value="0241" ">Split Jerk</option>');
            $("#listaEjercicios").append('<option value="0242" ">Cluster</option>');
            $("#listaEjercicios").append('<option value="0243" ">O.H.S</option>');
            $("#listaEjercicios").append('<option value="0244" ">Squat Snatch</option>');
            $("#listaEjercicios").append('<option value="0245" ">Hang Squat Clean</option>');
            $("#listaEjercicios").append('<option value="0246" ">Hang Squat Snatch</option>');
            $("#listaEjercicios").append('<option value="0247" ">O.H Squat</option>');
        }
    }
    if ($("#listaTipo").val()=='MET'){
        if ($("#listaComplejidad").val()=='BAS'){
            $("#listaEjercicios").append('<option value="0301" ">Row</option>');
            $("#listaEjercicios").append('<option value="0302" ">Run</option>');
            $("#listaEjercicios").append('<option value="0303" ">Farmer Carry</option>');
        }
        if ($("#listaComplejidad").val()=='INT'){
            $("#listaEjercicios").append('<option value="0321" ">S.U</option>');
            $("#listaEjercicios").append('<option value="0322" ">Wall Balls</option>');
            $("#listaEjercicios").append('<option value="0323" ">Box Jump Over</option>');
        }
        if ($("#listaComplejidad").val()=='AVA'){
            $("#listaEjercicios").append('<option value="0341" ">Peg Board</option>');
            $("#listaEjercicios").append('<option value="0342" ">D.U o (S.U)x2</option>');
        }
    }
    $("#listaEjercicios").append('<option value="9999">Otro</option>');
}

function agregaritem(rowactiva){
    $("#modal").hide();
    var selector = document.getElementById('listaEjercicios');
    var selectedOption = selector[selector.selectedIndex];
    $("#tE"+rowactiva).val(selectedOption.text);
}