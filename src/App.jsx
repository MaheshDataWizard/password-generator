import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'QWERTYUIOPASDFDGHJKLKZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    if (numberAllowed) str += '0987654321';
    if (charAllowed) str += '<>?:{}()_';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 18);
    window.navigator.clipboard.writeText(password);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-orange-500 mb-4">
          Password Generator
        </h1>

        <div className="relative mb-6">
          <input
            type="text"
            value={password}
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 text-center"
            placeholder="Your Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition"
          >
            Copy
          </button>
          {copySuccess && (
            <span className="absolute top-[-30px] right-3 text-sm text-green-400 animate-fade-in">
              Copied!
            </span>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="length" className="block mb-2 font-medium">
              Length: {length}
            </label>
            <input
              type="range"
              id="length"
              min={6}
              max={18}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="accent-orange-500"
              />
              Include Numbers
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="accent-orange-500"
              />
              Include Special Characters
            </label>
          </div>
        </div>

        <button
          onClick={passwordGenerator}
          className="mt-6 w-full bg-orange-500 hover:bg-orange-400 text-white py-3 rounded-lg font-semibold transition"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
