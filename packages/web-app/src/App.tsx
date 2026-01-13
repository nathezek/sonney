import { useEffect, useState } from 'react'
import './App.css'

// 1. Import the WASM init and functions from the folder we built
// 'init' is the default export that loads the .wasm binary
import init, { sonney_init, calculate_friction } from './wasm/rust_core'

function App() {
  const [friction, setFriction] = useState<number | null>(null)
  const [isWasmLoaded, setIsWasmLoaded] = useState(false)

  useEffect(() => {
    // 2. Initialize the WASM module once on mount
    const loadWasm = async () => {
      try {
        await init()
        setIsWasmLoaded(true)
        
        // 3. Call your Rust "handshake" function
        sonney_init() 
      } catch (err) {
        console.error("Failed to load WASM:", err)
      }
    }

    loadWasm()
  }, [])

  // 4. A helper function to call the Rust logic
  const handleTestFriction = () => {
    if (isWasmLoaded) {
      // Calling the Rust function!
      const result = calculate_friction(10.5, 2.0)
      setFriction(result)
    }
  }

  return (
    <div className="sonney-container">
      <h1>Sonney.ai</h1>
      
      <div className="card">
        {isWasmLoaded ? (
          <>
            <p className="status online">✅ Rust Reflexes Online</p>
            <button onClick={handleTestFriction}>
              Test Rust Logic
            </button>
            {friction !== null && (
              <p className="friction-display">
                Current Friction: <strong>{friction.toFixed(2)}</strong>
              </p>
            )}
          </>
        ) : (
          <p className="status loading">⏳ Loading Brain...</p>
        )}
      </div>

      <p className="read-the-docs">
        Check the browser console to see the "☀️" message from Rust!
      </p>
    </div>
  )
}

export default App
