# Bank Marketing Prediction API

An easy-to-use REST API to predict whether a customer will subscribe to a term deposit, based on the UCI Bank Marketing dataset and a trained Random Forest model. Powered by FastAPI.

# 🚀 Features
/predict endpoint for model predictions

Input validation using Pydantic

Outputs prediction class and probabilities

Interactive API docs (/docs)

Ready for local or cloud deployment

## 🗂️ Project Structure 
├── main.py # FastAPI app and inference logic 
├── ranforclas_model.pkl # Trained Random Forest model file 
├── requirements.txt # Python dependencies 
└── README.md # This documentation

# ⚡ Quickstart
Clone this repo and move into the directory:

git clone <your-repo-url>
cd <your-project-folder>
(Recommended) Create a virtual environment:

python -m venv venv
source venv/bin/activate      # Linux/macOS
# OR
venv\Scripts\activate.bat     # Windows
Install dependencies:

pip install -r requirements.txt
Ensure your trained model file ranforclas_model.pkl is present in the root directory.

Run the FastAPI app:

uvicorn main:app --reload
Test in your browser:

API docs: http://127.0.0.1:8000/docs

Health check: http://127.0.0.1:8000/

# 🧑‍💻 Example Input (for /predict endpoint)

{
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

# 🟢 Example Output

{
  "prediction": 0,
  "probability": [0.94, 0.06]
}
prediction: 1 = likely to subscribe, 0 = not likely.

probability: Confidence scores for both classes.

# 📦 API Endpoints
GET / — Health check

POST /predict — Submit customer data to get a prediction

GET /features — Model's expected feature columns

# ⚠️ Input Feature Notes
Categorical fields must match model categories (see /features endpoint).

Example jobs: "management", "technician", "services", etc.

Example months: "may", "jul", "nov", etc.

# 📝 Training & Model Info
Model: RandomForestClassifier (scikit-learn)

Data: UCI Bank Marketing Dataset

One-hot encoding for categorical variables

duration feature not used

# ☁️ Deployment
You can deploy this app using Docker, Render, Heroku, or any service that supports FastAPI + Python 3.

# 📄 License
MIT (or your chosen license)

# ✨ Credits
Built by [Your Name]

## Data: UCI Bank Marketing dataset
