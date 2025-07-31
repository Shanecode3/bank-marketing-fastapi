# 🏦 Bank Marketing API (ML-Powered)

An end-to-end Machine Learning API and a full-stack machine learning web app that predicts whether a bank client will subscribe to a term deposit, built using **FastAPI** that predicts whether a client will subscribe to a term deposit based on the Bank Marketing dataset from UCI Machine Learning Repository.

This project is part of my MLOps journey and demonstrates data preprocessing, model training, API creation, and containerization using **Docker**.

---

## 📊 Dataset

- **Source:** [UCI Bank Marketing Dataset](https://archive.ics.uci.edu/dataset/222/bank+marketing)

- **Goal:** Predict the `"y"` column --- whether a client subscribed to a term deposit.

- **Format:** Tabular data with features like age, job, marital status, education, contact, and campaign details.

This portfolio-ready project includes:

- 📊 Trained ML model from UCI Bank Marketing Dataset

- ⚙️ REST API using FastAPI

- 💻 React + Tailwind CSS frontend

- 🐳 Dockerized backend

- 🧪 Realtime prediction system with clean UI

---

## 🧰 Tech Stack

| Layer     | Tools                                      |

|-----------|---------------------------------------------|

| Frontend  | React, Tailwind CSS, Fetch API              |

| Backend   | FastAPI, scikit-learn, joblib, Uvicorn      |

| ML Model  | Logistic Regression / Random Forest         |

| DevOps    | Docker                                      |

---

## 🏁 Features

- Trained on the [Bank Marketing Dataset](https://archive.ics.uci.edu/dataset/222/bank+marketing)

- FastAPI endpoint `/predict` accepts JSON input

- Saved `.pkl` model with joblib

- Clean, animated React frontend with Tailwind

- Fully containerized backend for easy deployment

- Realtime prediction display on frontend

---

## 📁 Project Structure

bank-marketing-app/

├── backend/

│ ├── api/

│ │ └── main.py # FastAPI app with /predict

│ ├── model/

│ │ └── model.pkl # Trained ML model

│ ├── data/

│ │ └── bank.csv # Original dataset

│ ├── requirements.txt

│ └── Dockerfile

├── frontend/

│ ├── public/

│ ├── src/

│ │ ├── App.jsx # React entry

│ │ ├── components/ # Input form, output box

│ │ └── index.css # Tailwind styles

│ ├── tailwind.config.js

│ └── package.json

└── README.md

---

## ⚙️ Setup Instructions

### 🔹 Backend (FastAPI)

1\. Create and activate virtual env:

cd backend

python -m venv venv

source venv/bin/activate   # On Windows: venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Run the API server:

uvicorn api.main:app --reload

Visit: http://localhost:8000/docs

### 🔹 Frontend (React + Tailwind)

Install dependencies:

cd frontend

npm install

Run development server:

npm run dev

App runs at: http://localhost:5173

Ensure the backend is running at port 8000 for frontend to connect properly.

### 🧪 API Reference

POST /predict

### 🔸 Sample Input

{

  "age": 45,

  "job": "management",

  "marital": "married",

  "education": "tertiary",

  "default": "no",

  "balance": 3500,

  "housing": "yes",

  "loan": "no",

  "contact": "cellular",

  "day": 18,

  "month": "may",

  "duration": 180,

  "campaign": 2,

  "pdays": -1,

  "previous": 0,

  "poutcome": "unknown"

}

### 🔸 Sample Response

{

  "prediction": "yes"

}

### 🐳 Docker Deployment (Backend)

Build Docker image:

cd backend

docker build -t bank-marketing-api .

Run Docker container:

docker run -p 8000:8000 bank-marketing-api

Then hit: http://localhost:8000/docs

### 🧠 Model Training Summary

Preprocessed with pandas (label encoding, missing handling)

Trained with Logistic Regression and Random Forest

Model saved as model.pkl using joblib

Evaluation metrics: accuracy, precision, recall

### 💡 App Flow

User opens frontend and fills form.

Data is sent as JSON to FastAPI backend.

Backend loads model and predicts outcome.

Result (yes or no) is displayed in the UI.

### 🧼 Future Enhancements

✨ Add form validation and loading states

📊 Add SHAP/feature importance explainability

☁️ Deploy backend (Render, Railway)

💻 Deploy frontend (Vercel/Netlify)

🧪 Add tests and CI/CD pipeline

📈 Log user inputs for feedback loop

### 📸 Screenshot

Prediction UI

(Add screenshot here)

### 🙏 Acknowledgements

UCI Machine Learning Repository

FastAPI & scikit-learn

React and TailwindCSS teams

Inspiration: MLOps best practices

### 📄 License

### MIT License --- use freely with credit.

### 👤 Author

[Shane Jacob]

Third-year CSE @ Saintgits College of Engineering

🇨🇦 Canadian Citizen

📧 shanechristian2003@gmail

🔗 https://www.linkedin.com/in/shane-jacob-aa13b5290
