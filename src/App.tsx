import { useState } from 'react';
import { add } from './stringCalculator';

const App = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    setError('');
    setResult(null);

    try {
      const sum = add(input);
      setResult(sum);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', color: '#333' }}>
      <img
        src='https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt='Calculator with mathematical equations'
        width={600}
        height={400}
      />

      <h1 style={{ fontSize: '24px' }}>String Calculator</h1>

      <label htmlFor='number-input' style={{ fontSize: '18px', display: 'block', marginTop: '16px' }}>
        Enter numbers
      </label>

      <textarea
        id='number-input'
        style={{ 
          margin: '10px 0', 
          color: '#333', 
          padding: '8px',
          display: 'block',
          width: '300px',
          minHeight: '60px'
        }}
        placeholder='Enter numbers'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-describedby={error ? 'error-message' : undefined}
        aria-invalid={error ? 'true' : 'false'}
      />

      <button
        onClick={handleCalculate}
        style={{
          padding: '10px',
          backgroundColor: '#008cba',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'block',
        }}>
        Calculate
      </button>

      {result !== null && (
        <p style={{ color: 'green' }} role='status' aria-live='polite'>
          Result: {result}
        </p>
      )}

      {error && (
        <div id='error-message' role='alert' style={{ color: '#c00', marginTop: '10px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default App;