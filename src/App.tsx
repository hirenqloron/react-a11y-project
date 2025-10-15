import { useState, useRef, useEffect } from 'react';
import { add } from './stringCalculator';

const App = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const resultRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result !== null && resultRef.current) {
      resultRef.current.focus();
    }
  }, [result]);

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  const handleCalculate = () => {
    setError('');
    setResult(null);

    if (!input.trim()) {
      setError('Please enter at least one number');
      return;
    }

    try {
      const sum = add(input);
      setResult(sum);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleCalculate();
    }
  };

  return (
    <>
      <a href="#main-content" style={{
        position: 'absolute',
        left: '-9999px',
        zIndex: 999,
      }}
      onFocus={(e) => {
        e.currentTarget.style.left = '0';
      }}
      onBlur={(e) => {
        e.currentTarget.style.left = '-9999px';
      }}>
        Skip to main content
      </a>

      <div style={{ padding: '20px', backgroundColor: '#fff', color: '#333' }}>
        <img
          src='https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='Calculator with mathematical equations on a chalkboard'
          width={600}
          height={400}
          style={{ maxWidth: '100%', height: 'auto' }}
        />

        <main id="main-content">
          <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>String Calculator</h1>

          <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px' }}>
            Enter comma-separated numbers or use custom delimiters. Press Ctrl+Enter to calculate.
          </p>

          <label 
            htmlFor='number-input' 
            style={{ 
              fontSize: '18px', 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '500'
            }}>
            Enter numbers
          </label>

          <textarea
            id='number-input'
            style={{ 
              margin: '0 0 10px 0', 
              color: '#333', 
              padding: '10px',
              display: 'block',
              width: '100%',
              maxWidth: '400px',
              minHeight: '80px',
              fontSize: '16px',
              border: '2px solid #ccc',
              borderRadius: '4px',
              fontFamily: 'monospace',
            }}
            placeholder='e.g., 1,2,3 or //;\n1;2;3'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            aria-describedby='input-description'
            aria-invalid={error ? 'true' : 'false'}
            rows={4}
          />

          <div id='input-description' style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
            Examples: "1,2,3" or use newlines. Custom delimiter: "//;\n1;2;3"
          </div>

          <button
            onClick={handleCalculate}
            type="button"
            style={{
              padding: '12px 24px',
              backgroundColor: '#008cba',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              borderRadius: '4px',
              fontWeight: '500',
              minWidth: '120px',
              minHeight: '44px',
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '3px solid #005f7f';
              e.currentTarget.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}>
            Calculate
          </button>

          {result !== null && (
            <div 
              ref={resultRef}
              tabIndex={-1}
              style={{ 
                color: '#006400', 
                marginTop: '20px', 
                fontSize: '20px',
                fontWeight: '600',
                outline: 'none',
              }} 
              role='status' 
              aria-live='polite'
              aria-atomic='true'>
              Result: {result}
            </div>
          )}

          {error && (
            <div 
              ref={errorRef}
              tabIndex={-1}
              id='error-message' 
              role='alert' 
              aria-live='assertive'
              aria-atomic='true'
              style={{ 
                color: '#d8000c', 
                backgroundColor: '#ffd2d2',
                padding: '12px',
                marginTop: '16px',
                borderRadius: '4px',
                border: '1px solid #d8000c',
                outline: 'none',
              }}>
              <strong>Error:</strong> {error}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default App;