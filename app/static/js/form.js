let camposRequeridos = [
    'caratula',
    'expediente',
    'select_poderes',
    'juzgado',
    'nro_juzgado',
    'nro_secretaria',
    'domicilio',
    'cod_postal',
    'select_tipo',
    'select_plazo',
    'select_tipo_fondos',
    'select_moneda',
    'importe',
    'select_banco',
    'sucursal',
    'cuenta',
    'cbu',
    'nombre_apellido',
    'select_tipo_documento',
    'nro_documento',
    'nombre_solicitante',
    'matricula_solicitante',
    'cod_area',
    'nro_telefono',
    'email',
    'archivo'
];

let ids_numericos = [
    "nro_juzgado",
    "importe",
    "cbu",
    "nro_documento",
    "cod_area",
    "nro_telefono"
];


// function agregarEventosValidación() {
//     camposRequeridos.forEach((id) => {
//         let campoReq = document.getElementById(id);
//         campoReq.addEventListener("blur", function(){ validarObligatorio(campoReq); });        
//     });
// }

function agregarEventosValidación() {
    tipoTelefono()
    camposRequeridos.forEach((id) => {
        let campoReq = document.getElementById(id);

        if (id === "email"){  
            campoReq.addEventListener("blur", function(){ validarObligatorio(campoReq); validarEmail(campoReq);});    
        }
        else
        {
            campoReq.addEventListener("blur", function(){ validarObligatorio(campoReq);}); 
        }
        if (ids_numericos.includes(id)) {
            campoReq.addEventListener("input", function(){ let valor = this.value; valor = valor.replace(/\D/g, ''); this.value = valor;});
        }
        
                
    });
}

function validarEmail(email) {
    document.getElementById('msgErrorMail').innerHTML = '';
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        document.getElementById('msgErrorMail').innerHTML = ' <span style="color: red;">  Ingrese una dirección de email válida. </span>';
    }
}

function validarObligatorio(campoReq) {
    if (campoReq.value === "") {
        campoReq.style.borderColor = "#E22E11";
        campoReq.style.borderWidth = "3px";
        campoReq.Error = true;
    } else {
        campoReq.style.borderColor = "#000000";
        campoReq.style.borderWidth = "1px";
       campoReq.Error = false;
    }
}

function tipoTelefono() {    
    let lista = document.querySelectorAll('input[name="tipo_telefono"]');
    lista.forEach(function(element) {
        element.addEventListener('change', function() {
            if (this.value === 'celular') {
                document.getElementById('nro_telefono_label').innerText = 'N° de celular';
            }
            else {
                document.getElementById('nro_telefono_label').innerText = 'N° de teléfono';
            }
        })        
    })
}

function enviarFormulario() {
    let puedeEnviar = true;

    let i = 0
    while(i < camposRequeridos.length && puedeEnviar){
        let element = document.getElementById(camposRequeridos[i]);
        if (element.value === "") {
            //alert("Falta completar: " + element.id)
            puedeEnviar = false;
        }
        i++;
    } 

    if (!puedeEnviar) {
        document.getElementById('msg').innerHTML = ' <span style="color: red;">  Falta completar campos </span>';
        setTimeout(function () { document.getElementById('msg').innerHTML = ''; }, 2000);
    } else {
        document.getElementById('msg').innerHTML = ' <span style="color: green;"> Generado correctamente </span>'; 
        enviar()       
    }
}

function agregarRequerido() {
    let cantDemandados = document.getElementsByName("demandado");
    let cont = cantDemandados.length;
    if (cont < 15) {
        cont++;
        let nuevoDemandado = `
        <div id="demandado_${cont}" name="demandado">
            <h3>Demandado/fallido/causante ${cont}</h3>
            <div id="field_nombre_apellido">
                <p><label for="nombre_apellido_${cont}">Nombre y Apellido</label></p>
                <textarea id="nombre_apellido_${cont}" name="nombre_apellido_${cont}" rows="3" cols="20"></textarea>
            </div>
            <div id="select_tipo_documento">
                <p>Tipo de Documento</p>
                <select name="select_tipo_documento_${cont}" id="select_tipo_documento_${cont}">
                    <option value="" selected="">Seleccionar</option>
                    <option value="1">DNI</option>
                    <option value="80">CUIT</option>
                    <option value="86">CUIL</option>
                    <option value="2">LE</option>
                    <option value="3">LC</option>
                    <option value="4">DNI Extranjero</option>
                    <option value="5">C.I. Extranjero</option>
                    <option value="6">Pasaporte</option>
                    <option value="8">CI</option>
                    <option value="81">CDI</option>
                </select>
            </div>
            <div id="field_nro_documento">
                <p><label for="nro_documento_${cont}">Número de Documento</label></p>
                <input type="text" id="nro_documento_${cont}" name="nro_documento_${cont}">
            </div>
        </div>
            `;
    document.getElementById('agregar_demandado').insertAdjacentHTML('beforebegin', nuevoDemandado);

    } 
}

function eliminarRequerido() {
    let demandados = document.getElementsByName("demandado");
    let cantDemandados = demandados.length;
    if (cantDemandados > 1) {
        demandados[cantDemandados - 1].remove();
    }

}

function validarArchivo() {
    document.getElementById('msgArchivo').innerHTML = '';
    let archivo = document.getElementById("archivo").files[0];    
    if (archivo.type !== 'application/pdf') {
        document.getElementById('msgArchivo').innerHTML = ' <span style="color: red;"> Formatos aceptados: PDF </span>';

    }
    
    
}

function enviar() {
    let formData = new FormData();
    camposRequeridos.forEach((id) => {
        let element = document.getElementById(id);
        if (id == "archivo")
        {
            formData.append(element.name, element.files[0]);  
        }
        else{
            formData.append(element.name, element.value);
        }
    });

    /* 
    para ver lo que estoy por enviar:
    for (var key of form_data.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
     */
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let dato ='' ;
            if (typeof(JSON.parse( xhttp.responseText))=='object'){
                dato =  JSON.parse( xhttp.responseText);
            }else{
                dato = JSON.parse( JSON.parse( xhttp.responseText));
            }
            if (dato['errores'] != undefined){
                let errores = '<ul style="color: red;">';
                dato["errores"].forEach(function(error) {
                    errores += '<li>' + error + '</li>';
                });
                errores += '</ul>';
                document.getElementById('msg').innerHTML = '<span style = "color: red">Los siguientes campos contienen errores:</span>' + errores;
                setTimeout(function () { document.getElementById('msg').innerHTML = ''; }, 5000);

            }
        };
    } 
    xhttp.open("POST", "/ajax/CargarOficio", true);
    xhttp.send(formData);
}

function cancelarFormulario() {
    camposRequeridos.forEach(id => {document.getElementById(id).value = ""});
}