import requests
import json

API_URL = "http://localhost:8000/predict"

payload = {
    "age": 40,
    "job": "management",
    "marital": "married",
    "education": "tertiary",
    "default": "no",
    "balance": 1500.0,
    "housing": "yes",
    "loan": "no",
    "contact": "cellular",
    "day": 15,
    "month": "may",
    "campaign": 2,
    "pdays": -1,
    "previous": 0,
    "poutcome": "unknown"
}

response = requests.post(API_URL, json=payload)
print("Status code:", response.status_code)

if response.ok:
    print("Prediction Response:")
    print(json.dumps(response.json(), indent=2))

else:
    print("Error:", response.text)