from flask import Flask, render_template, request, jsonify
from ajax_cargar_oficio import validar_formulario

app=Flask(__name__)

@app.route('/')
def index():
    data = {
        "title": "Oficios Judiciales"
    }
    return render_template('index.html', data=data)

@app.route('/ajax/CargarOficio', methods=['POST'])
def cargar_oficio():
    datos = request.form.to_dict()
    archivo = request.files
    result, message = validar_formulario(datos, archivo)
    if not result:
        return jsonify({"status": "success", "errores": message})
    return jsonify({"status": "success", "data": dict(datos)})

if __name__=='__main__':
    app.run(debug=True, port=5000)

# python .\app\app.py