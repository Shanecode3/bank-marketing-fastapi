from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(
    title="Bank Marketing Prediction API",
    description="API to predict term deposit subscription using a Random Forest model trained on the UCI Bank Marketing dataset.",
    version="1.0"
)

# Load the pre-trained Random Forest model
model = joblib.load('ranforclas_model.pkl')


class BankMarketingInput(BaseModel):
    """
    Pydantic model defining the expected input schema
    for the Bank Marketing prediction API.
    """
    age: int
    job: str
    marital: str
    education: str
    default: str
    balance: float
    housing: str
    loan: str
    contact: str
    day: int
    month: str
    campaign: int
    pdays: int
    previous: int
    poutcome: str


# The exact feature columns the model expects (41 features)
FEATURE_COLUMNS = [
    'age', 'balance', 'day', 'campaign', 'pdays', 'previous',
    'job_blue-collar', 'job_entrepreneur', 'job_housemaid', 'job_management',
    'job_retired', 'job_self-employed', 'job_services', 'job_student',
    'job_technician', 'job_unemployed', 'job_unknown',
    'marital_married', 'marital_single',
    'education_secondary', 'education_tertiary', 'education_unknown',
    'default_yes',
    'housing_yes',
    'loan_yes',
    'contact_telephone', 'contact_unknown',
    'month_aug', 'month_dec', 'month_feb', 'month_jan', 'month_jul',
    'month_jun', 'month_mar', 'month_may', 'month_nov', 'month_oct',
    'month_sep',
    'poutcome_other', 'poutcome_success', 'poutcome_unknown'
]


def preprocess(input: BankMarketingInput) -> np.ndarray:
    """
    Converts the incoming JSON input into a feature vector
    matching the expected model input.

    Categorical variables are one-hot encoded according to the
    features used in model training.

    Parameters:
        input (BankMarketingInput): The input data from API request.

    Returns:
        np.ndarray: A 2D numpy array suitable for model prediction.
    """
    # Initialize dictionary with numeric features
    features = {
        'age': input.age,
        'balance': input.balance,
        'day': input.day,
        'campaign': input.campaign,
        'pdays': input.pdays,
        'previous': input.previous,
    }

    # Initialize all categorical features to zero to avoid missing keys
    for col in FEATURE_COLUMNS:
        if col not in features:
            features[col] = 0

    # One-hot encode job categories present in FEATURE_COLUMNS
    job_map = {
        'blue-collar': 'job_blue-collar',
        'entrepreneur': 'job_entrepreneur',
        'housemaid': 'job_housemaid',
        'management': 'job_management',
        'retired': 'job_retired',
        'self-employed': 'job_self-employed',
        'services': 'job_services',
        'student': 'job_student',
        'technician': 'job_technician',
        'unemployed': 'job_unemployed',
    }
    if input.job in job_map:
        features[job_map[input.job]] = 1

    # One-hot encode marital status
    marital_map = {
        'married': 'marital_married',
        'single': 'marital_single',
    }
    if input.marital in marital_map:
        features[marital_map[input.marital]] = 1

    # One-hot encode education levels
    education_map = {
        'secondary': 'education_secondary',
        'tertiary': 'education_tertiary',
    }
    if input.education in education_map:
        features[education_map[input.education]] = 1

    # Binary features (yes/no)
    if input.default == 'yes':
        features['default_yes'] = 1
    if input.housing == 'yes':
        features['housing_yes'] = 1
    if input.loan == 'yes':
        features['loan_yes'] = 1

    # One-hot encode contact types
    contact_map = {
        'telephone': 'contact_telephone',
        'unknown': 'contact_unknown',
    }
    if input.contact in contact_map:
        features[contact_map[input.contact]] = 1

    # One-hot encode month values
    month_map = {
        'aug': 'month_aug',
        'dec': 'month_dec',
        'feb': 'month_feb',
        'jan': 'month_jan',
        'jul': 'month_jul',
        'jun': 'month_jun',
        'mar': 'month_mar',
        'may': 'month_may',
        'nov': 'month_nov',
        'oct': 'month_oct',
        'sep': 'month_sep',
    }
    if input.month in month_map:
        features[month_map[input.month]] = 1

    # One-hot encode poutcome categories
    poutcome_map = {
        'other': 'poutcome_other',
        'success': 'poutcome_success',
    }
    if input.poutcome in poutcome_map:
        features[poutcome_map[input.poutcome]] = 1

    # Create feature vector in correct order
    feature_vector = [features[col] for col in FEATURE_COLUMNS]

    # Return as 2D numpy array (1 sample, n features)
    return np.array(feature_vector).reshape(1, -1)


@app.get("/", summary="API Health Check")
async def root():
    """
    Health check endpoint to confirm the API is running.
    """
    return {"message": "Bank Marketing Model API is running"}


@app.get("/features", summary="Get Model Feature Names")
async def features():
    """
    Returns the list of feature names the model expects,
    useful for debugging or client integration.
    """
    return {"model_features": model.feature_names_in_.tolist()}


@app.post("/predict", summary="Predict Term Deposit Subscription")
async def predict(data: BankMarketingInput):
    """
    Takes customer data as input and returns a prediction
    whether the customer will subscribe to a term deposit,
    along with prediction probabilities.

    Parameters:
        data (BankMarketingInput): Customer features

    Returns:
        dict: Dictionary containing prediction class (0 or 1)
              and class probabilities.
    """
    try:
        features = preprocess(data)
        prediction = model.predict(features)[0]
        prediction_proba = model.predict_proba(features)[0].tolist()

        return {
            "prediction": int(prediction),
            "probability": prediction_proba
        }
    except Exception as e:
        # Log error and raise HTTP 500 with error message
        print(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail=str(e))
