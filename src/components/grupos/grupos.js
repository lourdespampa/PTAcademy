import $ from 'jquery'
var num_grupos;
var elementos;
var arrayGrupos;

$('#slider').on("change mousemove", function() {
    $('#num_grupos').html($(this).val());
    num_grupos = $(this).val();
});

// precondiciones, cuando carga
$().ready(function() {
	var texto = "";
	for (var i = 1; i < 4; i++) {
		texto += "Grupo "+i+"\n";
	}
	texto+="…\n"
  $('#nombre_grupos').text(texto);
  $('#raw_names').val('Tom Hanks\nChris Tomlin\nMatt Maher\nEvan Craft\nMiguel Martínez\nPedro Serrano\nFrancisco Álvarez\nJoaquín Sánchez\nPablo Hernandez');
  //$('#raw_names').val('Tom Hanks\nChris Tomlin\nMatt Maher\nEvan Craft');
  num_grupos = $('#slider').val();
});

$('#generate').click(generar_grupos);	// ejecuto la funcion

$('#limpiar_lista').click(function() {
	$('#raw_names').val('');
});

$("#copiar").click(function(){
    $("#salida_grupos").select();
    document.execCommand('copy');
});

function generar_grupos(argument) {
	elementos = $('#raw_names').val();
	var array_elementos_raw = elementos.split("\n");
	var array_elementos = [];	// array de elementos 

	for (var i = 0; i < array_elementos_raw.length; i++) {
		if(array_elementos_raw[i] !== ""){	// evito que introduzca elementos vacios
			array_elementos.push(array_elementos_raw[i]);
		}
	}
	console.log("Grupos: " + num_grupos + ", elementos: " + array_elementos.length);

    arrayGrupos = []
	for ( i = 0; i < num_grupos; i++) {
		var miArray = [];
		arrayGrupos.push(miArray);
	}
	
	var array_aux = array_elementos;
	var indexGrupo = 0;

	while(array_aux.length > 0){
		var elementoSeleccionado = array_aux[Math.floor(Math.random()*array_aux.length)];	//selecciono uno del arrayAux

		//console.log(elementoSeleccionado + ", indexGrupo: "+indexGrupo);
		arrayGrupos[indexGrupo].push(elementoSeleccionado);
		array_aux.splice($.inArray(elementoSeleccionado,array_aux),1);

		if(indexGrupo === arrayGrupos.length-1)
			indexGrupo = 0;
		else
			indexGrupo += 1;
	}
	console.log(arrayGrupos);
	imprimeGrupos();
}

function imprimeGrupos() {
	var cadena = "";

	for (var i = 0; i < arrayGrupos.length; i++) {
		if(arrayGrupos[i].length > 0){
			cadena += "- Grupo "+(i+1)+":\n";
			for (var j = 0; j < arrayGrupos[i].length; j++) {
				cadena += arrayGrupos[i][j];
				//if(i != arrayGrupos.length-1 && i != arrayGrupos[i].length -1)
					cadena += "\n";
			}
			if(i !== arrayGrupos.length-1){
				cadena += "\n";
			}
		}
	}
	$('#salida_grupos').val(cadena);
}

export default generar_grupos