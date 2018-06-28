#server.py

from flask import Flask
from flask import render_template

# creates a Flask application, named app
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html',)

@app.route("/rect")
def rect():
    return render_template('canvas.html',)

# run the application
if __name__ == "__main__":
    app.run(debug=True)# serve.py