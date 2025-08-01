import React, { useState } from "react";

const JOBS = [
  "admin.", "blue-collar", "entrepreneur", "housemaid", "management",
  "retired", "self-employed", "services", "student", "technician",
  "unemployed", "unknown"
];
const MARITALS = ["married", "single", "divorced"];
const EDUCATIONS = ["primary", "secondary", "tertiary", "unknown"];
const CONTACTS = ["cellular", "telephone", "unknown"];
const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"
];
const POUTCOMES = ["unknown", "other", "failure", "success"];

function App() {
  const [inputs, setInputs] = useState({
    age: "", job: "", marital: "", education: "", default: "",
    balance: "", housing: "", loan: "", contact: "", day: "",
    month: "", campaign: "", pdays: "", previous: "", poutcome: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const payload = {
        ...inputs,
        age: Number(inputs.age),
        balance: Number(inputs.balance),
        day: Number(inputs.day),
        campaign: Number(inputs.campaign),
        pdays: Number(inputs.pdays),
        previous: Number(inputs.previous),
      };
      const response = await fetch("https://bank-api-1tuf.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      setResult(data);
    } catch {
      setError("Prediction failed. Please check your input & API server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-blue-950 via-blue-700 to-sky-400">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] bg-pink-500 opacity-30 rounded-full blur-3xl animate-blob1" />
        <div className="absolute top-[40%] left-[70%] w-[400px] h-[400px] bg-blue-400 opacity-20 rounded-full blur-2xl animate-blob2" />
        <div className="absolute top-[70%] left-[-10%] w-[300px] h-[300px] bg-yellow-400 opacity-20 rounded-full blur-2xl animate-blob3" />
      </div>

      <div className="bg-white/70 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl max-w-3xl w-full border border-white/30">
        <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center drop-shadow">
          Bank Marketing Predictor
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "age", label: "Age", type: "number", desc: "Client’s age in years" },
              { name: "balance", label: "Balance (€)", type: "number", desc: "Average yearly account balance (euros)" },
              { name: "day", label: "Last Contact Day", type: "number", desc: "Day of month for last contact (1-31)" },
              { name: "campaign", label: "Campaign Contacts", type: "number", desc: "Total contacts during this campaign" },
              { name: "pdays", label: "Pdays", type: "number", desc: "Days since previous contact (-1 means never)" },
              { name: "previous", label: "Previous Contacts", type: "number", desc: "Number of previous contacts before this campaign" },
            ].map(({ name, label, type, desc }) => (
              <div key={name}>
                <label className="font-medium">{label}</label>
                <input
                  name={name}
                  type={type}
                  className="input w-full text-center text-black bg-white"
                  value={inputs[name]}
                  onChange={handleChange}
                  required
                />
                <div className="text-xs text-gray-700 mt-1">{desc}</div>
              </div>
            ))}

            {[
              { name: "job", label: "Job", options: JOBS, desc: "Type of job" },
              { name: "marital", label: "Marital Status", options: MARITALS, desc: "Married, single, or divorced" },
              { name: "education", label: "Education", options: EDUCATIONS, desc: "Level of education" },
              { name: "default", label: "Credit in Default?", options: ["yes", "no"], desc: "Does client have credit in default?" },
              { name: "housing", label: "Housing Loan?", options: ["yes", "no"], desc: "Does client have a housing loan?" },
              { name: "loan", label: "Personal Loan?", options: ["yes", "no"], desc: "Does client have a personal loan?" },
              { name: "contact", label: "Contact Type", options: CONTACTS, desc: "Type of last contact" },
              { name: "month", label: "Last Contact Month", options: MONTHS, desc: "Month of last contact" },
              { name: "poutcome", label: "Previous Outcome", options: POUTCOMES, desc: "Outcome of previous campaign" },
            ].map(({ name, label, options, desc }) => (
              <div key={name}>
                <label className="font-medium">{label}</label>
                <select
                  name={name}
                  className="input w-full text-center text-black bg-white"
                  value={inputs[name]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <div className="text-xs text-gray-700 mt-1">{desc}</div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold transition"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
        {result && (
          <div className="mt-6 text-center">
            <div className={`font-bold text-lg mb-2 ${result.prediction === 1 ? 'text-green-700' : 'text-red-700'}`}>
              Prediction: {result.prediction === 1 ? "Will Subscribe" : "Will Not Subscribe"}
            </div>
            <div className="text-gray-700 mb-1 text-sm">
              Class 1: Client will subscribe<br />
              Class 0: Client will not subscribe
            </div>
            <div className="font-mono text-base mt-2">
              <span className="text-blue-800">
                Likelihood to Subscribe: <b>{(result.probability[1] * 100).toFixed(2)}%</b>
              </span><br />
              <span className="text-gray-700">
                Likelihood to Not Subscribe: <b>{(result.probability[0] * 100).toFixed(2)}%</b>
              </span>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes blob1 {
            0%, 100% { transform: translate(0, 0) scale(1.05);}
            33% { transform: translate(60px, -20px) scale(1.15);}
            66% { transform: translate(-50px, 50px) scale(0.95);}
          }
          @keyframes blob2 {
            0%, 100% { transform: translate(0, 0) scale(1);}
            33% { transform: translate(-80px, 40px) scale(1.2);}
            66% { transform: translate(60px, -40px) scale(0.9);}
          }
          @keyframes blob3 {
            0%, 100% { transform: translate(0, 0) scale(1);}
            33% { transform: translate(-60px, 40px) scale(1.15);}
            66% { transform: translate(80px, -50px) scale(0.9);}
          }
          .animate-blob1 { animation: blob1 14s infinite linear; }
          .animate-blob2 { animation: blob2 19s infinite linear; }
          .animate-blob3 { animation: blob3 16s infinite linear; }
          .input {
            @apply px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 placeholder-gray-400 shadow;
          }
        `}
      </style>
    </div>
  );
}

export default App;
