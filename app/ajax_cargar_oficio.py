import re

def validar_formulario(form, archivo):
    print(form)
    errores = []
    regex_email = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    regex_cbu = r'^\d{22}$'
    regex_nro_documento = r'^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$'

    validaciones = {
        "email": (regex_email, "Dirección de correo electrónico inválida"),
        "cbu": (regex_cbu, "CBU inválido"),
        "nro_documento": (regex_nro_documento, "Número de documento inválido")
    }

    valores_numericos = {
        "nro_juzgado": "El número de juzgado debe ser numérico",
        "importe": "El importe debe ser numérico",
        "cod_area": "El código de área debe ser numérico", 
        "nro_telefono": "El número de teléfono debe ser numérico"
    }   

    for campo, (regex, mensaje_error) in validaciones.items():
        valor = form.get(campo)
        if valor:
            if not re.match(regex, valor):
                errores.append(mensaje_error)

    # Valores numéricos
    for key, mensaje_error in valores_numericos.items():
        valor = form.get(key)
        if valor:
            if not valor.isdigit():
                errores.append(mensaje_error)  

    archivo = archivo["SELECCIONAR ARCHIVO"]    
    # Validación extensión archivo 20 MB
    tamanio_archivo = len(archivo.read())
    archivo.seek(0)
    if tamanio_archivo > 20 * 1024 * 1024:
        errores.append("Tamaño máximo del archivo debe ser: 20 MB.")
    # Validación tamaño archivo
    nombre_archivo = archivo.filename
    if not nombre_archivo.lower().endswith(".pdf"):
        errores.append("El formato del archivo debe ser PDF")

    if errores:
        return False, errores
    return True, "Success"
