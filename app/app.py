from flask import Flask, render_template, request, jsonify

app=Flask(__name__)

@app.route('/')
def index():
    data = {
        "title": "Oficios Judiciales"
    }
    return render_template('index.html', data=data)

#########################
@app.route('/ajax/CargarOficio', methods=['POST'])
def cargar_oficio():    
    datos = request.form
    return jsonify({"status": "success", "data": dict(datos)})
#########################

if __name__=='__main__':
    app.run(debug=True, port=5000)

# python .\app\app.py