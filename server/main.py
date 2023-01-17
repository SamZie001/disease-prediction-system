from flask import Flask, request, jsonify
from flask_cors import CORS
from ml_utils import encode_data, load_model, possible_symptoms, data_dict
import pandas as pd

app = Flask(__name__)
CORS(app)
model = load_model()

@app.post("/predict")
def predict():

    symptoms = request.json.get("symptoms", "").strip().split(",")
    symptoms = [s for s in symptoms if s in possible_symptoms]

    if len(symptoms) < 17:
      symptoms += [0 for _ in range(17 - len(symptoms))]

    data = pd.DataFrame({f'Symptom_{i+1}': [symptoms[i]] for i in range(17)})
    data = encode_data(data)

    model = load_model()
    result = list(model.predict(data))

    return jsonify({"result": result})

@app.route("/symptoms/all", methods=["GET"])
def get_possible_symptoms():
  return jsonify(possible_symptoms)

if __name__ == '__main__':
  app.run()
