import './App.css';
import PredictionForm from './components/PredictionForm';

function App() {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-800">
          Insurance Risk Prediction System
        </h1>


        <p className="text-center text-gray-500 text-sm">
          Machine learning–based risk assessment using Logistic Regression & Decision Trees
        </p>

        <PredictionForm />

      </div>
    </div>
  );
}

export default App;
