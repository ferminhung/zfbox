$(document).on("pageshow","#benchmark",function(event, ui){
    
    var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
   
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1; //hoy es 0!
    var yyyy = hoy.getFullYear();
   
    $("#volverInicio").click(function(){
        $.mobile.changePage("panel.html",{ transition : "fade" });

    });

   $("#liGuardarTiempo").click(function(){
        var sMarca=prompt("Ingresa el tiempo o rondas");
        var sComentario=prompt("Comentario acerca del benchmark");
        var sBench = $("#slcBenchmark").val();
        if(sMarca==''){
            alert("Debes indicar un tiempo o cantidad de rondas");
            return;
        }
        if(sBench=='000'){
            alert("Selecciona el Benchmark WOD antes de Guardar");
        }else{
            $.ajax({
                data:{
                    sCodigoWebPhp:sIdentificador, sMarcaPhp:sMarca, sComentarioPhp:sComentario, sBenchPhp:sBench, Mandato:'GuardarBench'
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
                        alert(respuesta);
                    }
                },error:function(jqXHR, textStatus, errorThrown){
                    ajax_error(jqXHR, textStatus, errorThrown,true);
                }
            });
        }
    });


   $("#liTiempos").click(function(){
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, Mandato:'VerMarcas'
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
                if(respuesta!="NADA"){
                    var html = '<fieldset data-role="controlgroup" data-type="vertical" data-theme="a" data-mini="true" id="fsMarcas"><legend>Metricas</legend>';
                    var aMarcas = JSON.parse(respuesta);
                    $.each( aMarcas, function( i, value ) { 
                        html += '<input type="checkbox" id="'+i+'"><label for="'+i+'" >'+Girl(value['nPersona'])+'<span class="ui-li-count">' +value['ingTotal']+'</span> </label>';
                    })
                    $('#itemsTiempos').html(html+'</fieldset><br>');
                    $('#itemsTiempos').trigger('create');
                }
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });

    $("#slcBenchmark").change(function(){
        var html = '<fieldset data-role="controlgroup" data-type="vertical" data-theme="b" data-mini="true" id="fsLista"><legend>Crossfit WorkOut</legend>';
        var sCat=$("#slcBenchmark").val();
        switch(sCat){
            case 'B1':
                html += '<input type="checkbox" id="01"><label for="01" >100 Pull-ups</label>';
                html += '<input type="checkbox" id="02"><label for="02" >100 Push-ups</label>';
                html += '<input type="checkbox" id="03"><label for="03" >100 Sit-ups</label>';
                html += '<input type="checkbox" id="04"><label for="04" >100 Squats</label>';
                $("#labComentario").text("For Time. Hay que acabar las repeticiones de cada ejercicio antes de pasar al siguiente");
                break;
            case 'B2':
                html += '<input type="checkbox" id="01"><label for="01" >20 Pull-ups</label>';
                html += '<input type="checkbox" id="02"><label for="02" >30 Push-ups</label>';
                html += '<input type="checkbox" id="03"><label for="03" >40 Sit-ups</label>';
                html += '<input type="checkbox" id="04"><label for="04" >50 Squats</label>';
                $("#labComentario").text("5 Rounds. Descansar 3 minutos entre cada ronda. Sumar el tiempo de cada ronda");
                break;
            case 'B3':
                html += '<input type="checkbox" id="01"><label for="01" >5 Pull-ups</label>';
                html += '<input type="checkbox" id="02"><label for="02" >10 Push-ups</label>';
                html += '<input type="checkbox" id="03"><label for="03" >15 Squats</label>';
                $("#labComentario").text("EMOM, durante 30 Min.Descansar resto del minuto.");
                break;
            case 'B4':
                html += '<input type="checkbox" id="01"><label for="01" >5 Pull-ups</label>';
                html += '<input type="checkbox" id="02"><label for="02" >10 Push-ups</label>';
                html += '<input type="checkbox" id="03"><label for="03" >15 Squats</label>';
                $("#labComentario").text("AMRAP 20 min");
                break;
            case 'B5':
                html += '<input type="checkbox" id="01"><label for="01" >Deadlift (225 lb Rx)</label>';
                html += '<input type="checkbox" id="02"><label for="02" >Handstand push-ups</label>';
                $("#labComentario").text("21-15-9 reps, For Time");
                break;
            case 'B6':
                html += '<input type="checkbox" id="01"><label for="01" >Clean (135 lb Rx)</label>';
                html += '<input type="checkbox" id="02"><label for="02" >Ring Dips</label>';
                $("#labComentario").text("21-15-9 reps, For Time");
                break;
            case 'B7':
                html += '<input type="checkbox" id="01"><label for="01" >Thruster (95 lb Rx)</label>';
                html += '<input type="checkbox" id="02"><label for="02" >Pull-ups</label>';
                $("#labComentario").text("21-15-9 reps, For Time");
                break;
            case 'B8':
                html += '<input type="checkbox" id="01"><label for="01" >Clean and Jerks (135 lb Rx)</label>';
                $("#labComentario").text("30 reps, For Time");
                break;            
            case 'B9':
                html += '<input type="checkbox" id="01"><label for="01" >400 meter run</label>';
                html += '<input type="checkbox" id="02"><label for="02" >21 1.5 pood Kettlebell swing</label>';
                html += '<input type="checkbox" id="03"><label for="03" >12 Pull-ups</label>';
                $("#labComentario").text("3 rondas. For Time");
                break;
            case 'B10':
                html += '<input type="checkbox" id="01"><label for="01" >Snatch (135 lb Rx)</label>';
                $("#labComentario").text("30 reps, For Time");
                break;            
            case 'B11':
                html += '<input type="checkbox" id="01"><label for="01" >1000 meter row</label>';
                html += '<input type="checkbox" id="02"><label for="02" >50 Thruster (45 lb Rx)</label>';
                html += '<input type="checkbox" id="03"><label for="03" >30 Pull-ups</label>';
                $("#labComentario").text("For Time");
                break;
            case 'B12':
                html += '<input type="checkbox" id="01"><label for="01" >150 Wall Ball (20 lb Rx)</label>';
                $("#labComentario").text("For Time");
                break;            
            case 'B13':
                html += '<input type="checkbox" id="01"><label for="01" >Deadlift 1y1/2 Peso corporal</label>';
                html += '<input type="checkbox" id="02"><label for="02" >Bench Press Peso corporal</label>';
                html += '<input type="checkbox" id="03"><label for="03" >Clean 3/4 Peso corporal</label>';
                $("#labComentario").text("aka (3 bars of death), 10/9/8/7/6/5/4/3/2/1 rep rondas. For Time");
                break;
            case 'B14':
                html += '<input type="checkbox" id="01"><label for="01" >5 Handstand push-ups</label>';
                html += '<input type="checkbox" id="02"><label for="02" >10 Pistols</label>';
                html += '<input type="checkbox" id="03"><label for="03" >15 Pull-ups</label>';
                $("#labComentario").text("AMRAP 20 min");
                break;
            case 'B15':
                html += '<input type="checkbox" id="01"><label for="01" >400 meter run</label>';
                html += '<input type="checkbox" id="02"><label for="02" >15 Overhead squat (95 lb Rx)</label>';
                $("#labComentario").text("5 rondas, For Time");
                break;
            case 'M1':
                html += '<input type="checkbox" id="01"><label for="01" >1600 meter run</label>';
                html += '<input type="checkbox" id="02"><label for="02" >100 Pull-ups</label>';
                html += '<input type="checkbox" id="03"><label for="03" >200 Push-ups</label>';
                html += '<input type="checkbox" id="04"><label for="04" >300 Squats</label>';
                html += '<input type="checkbox" id="05"><label for="05" >1600 meter run</label>';
                $("#labComentario").text("Be a Hero");
                break;
            case 'M2':
                html += '<input type="checkbox" id="01"><label for="01" >800 meter run</label>';
                html += '<input type="checkbox" id="02"><label for="02" >50 Pull-ups</label>';
                html += '<input type="checkbox" id="03"><label for="03" >100 Push-ups</label>';
                html += '<input type="checkbox" id="04"><label for="04" >150 Squats</label>';
                html += '<input type="checkbox" id="05"><label for="05" >800 meter run</label>';
                $("#labComentario").text("Be a Hero");
                break;
            case 'M3':
                html += '<input type="checkbox" id="01"><label for="01" >400 meter run</label>';
                html += '<input type="checkbox" id="02"><label for="02" >25 Pull-ups</label>';
                html += '<input type="checkbox" id="03"><label for="03" >50 Push-ups</label>';
                html += '<input type="checkbox" id="04"><label for="04" >75 Squats</label>';
                html += '<input type="checkbox" id="05"><label for="05" >400 meter run</label>';
                $("#labComentario").text("Be a Hero");
                break;            default:
                html += '';
                $("#labComentario").text("*");
                break;

        }
            
        $('#itemsBench').html(html+'</fieldset><br>');
        $('#itemsBench').trigger('create');

    });
});


function Girl(id){
    switch (id){
        case 'B1':
            return "ANGIE";
            break;
        
        case 'B2':
            return "BARBARA";
            break;

        case 'B3':
            return "CHELSEA";
            break;

        case 'B4':
        
            return "CINDY";
            break;
        
        case 'B5':
            return "DIANE";
            break;

        case 'B6':
            return "ELIZABETH";
            break;

        case 'B7':
            return "FRAN";
            break;

        case 'B8':
            return "GRACE";
            break;

        case 'B9':
            return "HELEN";
            break;

        case 'B10':
            return "ISABEL";
            break;

        case 'B11':
            return "JACKIE";
            break;

        case 'B12':
            return "KAREN";
            break;

        case 'B13':
            return "LINDA";
            break;

        case 'B14':
            return "MARY";
            break;

        case 'B15':
            return "NANCY";
            break;

    }

}
                       