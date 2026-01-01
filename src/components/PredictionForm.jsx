import { useState } from "react";

function PredictionForm() {
  const [formData, setFormData] = useState({
    VehicleType: "",
    RegistrationYear: "",
    cubiccapacity: "",
    kilowatts: "",
    NumberOfDoors: "",
    Gender: "",
    MaritalStatus: "",
    Province: "",
    SumInsured: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://insurance-risk-backend.onrender.com/predict",
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          RegistrationYear: Number(formData.RegistrationYear),
          cubiccapacity: Number(formData.cubiccapacity),
          kilowatts: Number(formData.kilowatts),
          NumberOfDoors: Number(formData.NumberOfDoors),
          SumInsured: Number(formData.SumInsured)
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Prediction failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 transition hover:shadow-xl">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Insurance Risk Prediction
        </h2>
        <p className="text-sm text-gray-500">
          Fill in the client and vehicle details to assess insurance risk.
        </p>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-2 rounded-lg text-white font-medium transition
          ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {loading ? "Predicting..." : "Predict Risk"}
      </button>

      {/* RESULT */}
      {result && (
  <div className="border-t pt-4 space-y-4">
    <h3 className="text-lg font-semibold text-gray-800">
      Prediction Result
    </h3>

    {/* Logistic Regression */}
    <div className="flex items-center justify-between">
      <span className="font-medium">Logistic Regression</span>
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          result.logistic_regression === 1
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {result.logistic_regression === 1 ? "High Risk" : "Low Risk"}
      </span>
    </div>

    {/* Probability Bar */}
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">High Risk Probability</span>
        <span>{Number(result.logistic_probability).toFixed(3)}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all"
          style={{
            width: `${Number(result.logistic_probability) * 100}%`,
          }}
        />
      </div>
    </div>

    {/* Decision Tree */}
    <div className="flex items-center justify-between">
      <span className="font-medium">Decision Tree</span>
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          result.decision_tree === 1
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {result.decision_tree === 1 ? "High Risk" : "Low Risk"}
      </span>
    </div>
  </div>
)}

    </div>
  );
}

export default PredictionForm;
