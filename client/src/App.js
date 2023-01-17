import './App.css';
import SelectSymptoms from './components/SelectSymptoms';

function App() {
  return (
    <div className="App">
      <h1>Group 26 - AI Seminar</h1>
      <h1>Disease Prediction System</h1>
      <p>This model uses machine learning techniques to tackle challenges in the healthcare sector.</p>
      <br />
      <h3>Select Your Symptoms</h3>
      <SelectSymptoms/>
    </div>
  );
}

export default App;
