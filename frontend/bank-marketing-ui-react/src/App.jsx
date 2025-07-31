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
    age: "",
    job: "",
    marital: "",
    education: "",
    default: "",
    balance: "",
    housing: "",
    loan: "",
    contact: "",
    day: "",
    month: "",
    campaign: "",
    pdays: "",
    previous: "",
    poutcome: ""
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
      // Convert appropriate fields to numbers
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
    } catch (err) {
      setError("Prediction failed. Please check your input & API server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-blue-950 via-blue-700 to-sky-400">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] bg-pink-500 opacity-30 rounded-full filter blur-3xl animate-blob1" />
        <div className="absolute top-[40%] left-[70%] w-[400px] h-[400px] bg-blue-400 opacity-20 rounded-full filter blur-2xl animate-blob2" />
        <div className="absolute top-[70%] left-[-10%] w-[300px] h-[300px] bg-yellow-400 opacity-20 rounded-full filter blur-2xl animate-blob3" />
      </div>

      {/* Card Content */}
      <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-3xl w-full border border-white/30">
        <h1 className="text-3xl font-bold mb-4 text-blue-700 text-center drop-shadow">
          Bank Marketing Predictor
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Age</label>
              <input name="age" type="number" min={18} max={100} className="input text-white bg-blue-500 rounded-md absolute left-16 text-center" value={inputs.age} onChange={handleChange} required />
              <div className="text-xs text-gray-700 mt-1">Client’s age in years</div>
            </div>
            <div>
              <label className="font-medium">Job</label>
              <select name="job" className="input text-center text-white bg-blue-500 rounded-md absolute right-55" value={inputs.job} onChange={handleChange} required>
                <option value="">Select job</option>
                {JOBS.map(j => <option key={j}>{j}</option>)}
              </select>
              <div className="text-xs text-gray-700 mt-1">Type of job (e.g. management, student, technician)</div>
            </div>
            <div>
              <label className="font-medium">Marital Status</label>
              <select name="marital" className="input text-center text-white bg-blue-500 rounded-md absolute left-22" value={inputs.marital} onChange={handleChange} required>
                <option value="">Select status</option>
                {MARITALS.map(m => <option key={m}>{m}</option>)}
              </select>
              <div className="text-xs text-gray-700 mt-1">married, divorced/widowed, or single</div>
            </div>
            <div>
              <label className="font-medium">Education</label>
              <select name="education" className="input text-center text-white bg-blue-500 rounded-md absolute right-40" value={inputs.education} onChange={handleChange} required>
                <option value="">Select education</option>
                {EDUCATIONS.map(e => <option key={e}>{e}</option>)}
              </select>
              <div className="text-xs text-gray-700 mt-1">Level: unknown, secondary, primary, tertiary</div>
            </div>
            <div>
              <label className="font-medium">Credit in Default?</label>
              <select name="default" className="input text-center text-white bg-blue-500 rounded-md absolute left-40" value={inputs.default} onChange={handleChange} required>
                <option value="">Select</option>
                <option>yes</option>
                <option>no</option>
              </select>
              <div className="text-xs text-gray-700 mt-1">Does the client have credit in default?</div>
            </div>
            <div>
              <label className="font-medium">Balance (€)</label>
              <input name="balance" type="number" className="input w-30 text-center text-white bg-blue-500 rounded-md absolute right-43" value={inputs.balance} onChange={handleChange} required />
              <div className="text-xs text-gray-700 mt-1">Average yearly account balance (euros)</div>
            </div>
            <div>
              <label className="font-medium">Housing Loan?</label>
              <select name="housing" className="input text-center text-white bg-blue-500 rounded-md absolute left-36" value={inputs.housing} onChange={handleChange} required>
                <option value="">Select</option>
                <option>yes</option>
                <option>no</option>
              </select>
              <div className="text-xs text-gray-700 mt-1">Does the client have a housing loan?</div>
            </div>
            <div>
              <label className="font-medium">Personal Loan?</label>
              <select name="loan" className="input text-center text-white bg-blue-500 rounded-md absolute right-49" value={inputs.loan} onChange={handleChange} required>
                <option value="">Select</option>
                <option>yes</option>
                <option>no</option>
              </select>
              <div className="text-xs text-gray-700 mt-1">Does the client have a personal loan?</div>
            </div>
            <div>
              <label className="font-medium">Contact Type</label>
              <select name="contact" className="input text-center text-white bg-blue-500 rounded-md absolute left-33" value={inputs.contact} onChange={handleChange} required>
                <option value="">Select</option>
                {CONTACTS.map(c => <option key={c}>{c}</option>)}
              </select>
              <div className="text-xs text-gray-700 mt-1">Type of last contact (cellular, telephone, unknown)</div>
            </div>
            <div>
              <label className="font-medium">Last Contact Day</label>
              <input name="day" type="number" min={1} max={31} className="input text-center text-white bg-blue-500 rounded-md absolute right-46" value={inputs.day} onChange={handleChange} required />
              <div className="text-xs text-gray-700 mt-1">Day of month for last contact (1-31)</div>
            </div>
            <div>
              <label className="font-medium">Last Contact Month</label>
              <select name="month" className="input text-center text-white bg-blue-500 rounded-md absolute left-45" value={inputs.month} onChange={handleChange} required>
                <option value="">Select</option>
                {MONTHS.map(m => <option key={m}>{m}</option>)}
              </select>
              <div className="text-xs text-gray-700 mt-1">Month of last contact (jan, feb, ... dec)</div>
            </div>
            <div>
              <label className="font-medium">Campaign Contacts</label>
              <input name="campaign" type="number" min={1} className="input text-center text-white bg-blue-500 rounded-md absolute right-42 w-15" value={inputs.campaign} onChange={handleChange} required />
              <div className="text-xs text-gray-700 mt-1">Total contacts during this campaign</div>
            </div>
            <div>
              <label className="font-medium">Pdays</label>
              <input name="pdays" type="number" className="input text-center text-white bg-blue-500 rounded-md absolute left-20 w-20" value={inputs.pdays} onChange={handleChange} required />
              <div className="text-xs text-gray-700 mt-1">Days since previous contact (-1 means never)</div>
            </div>
            <div>
              <label className="font-medium">Previous Contacts</label>
              <input name="previous" type="number" className="input text-center text-white bg-blue-500 rounded-md absolute right-40 w-20" value={inputs.previous} onChange={handleChange} required />
              <div className="text-xs text-gray-700 mt-1">Number of previous contacts before this campaign</div>
            </div>
            <div>
              <label className="font-medium">Outcome of Previous Campaign</label>
              <select name="poutcome" className="input text-center text-white bg-blue-500 rounded-md absolute left-67" value={inputs.poutcome} onChange={handleChange} required>
                <option value="">Select</option>
                {POUTCOMES.map(p => <option key={p}>{p}</option>)}
              </select>
              <div className="text-xs text-gray-700 mt-1">unknown, other, failure, or success</div>
            </div>
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
            <div className="text-gray-700 mb-1">
              <b>What do the probabilities mean?</b>
              <br />
              <span className="text-sm">
                Class 1 is the chance the client <b>will subscribe</b> to a term deposit.<br />
                Class 0 is the chance the client <b>will not subscribe</b>.
              </span>
            </div>
            <div className="font-mono text-base mt-2">
              <span className="text-blue-800">
                Likelihood to Subscribe (Class 1): <b>{(result.probability[1] * 100).toFixed(2)}%</b>
              </span><br />
              <span className="text-gray-700">
                Likelihood to Not Subscribe (Class 0): <b>{(result.probability[0] * 100).toFixed(2)}%</b>
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Custom CSS for Blobs Animation */}
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
