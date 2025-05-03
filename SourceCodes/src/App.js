import React, { useState } from 'react';
import Display from './Components/Display.jsx';
import Button from './Components/Button.jsx';
import './App.css';
import normalSound from '/sfx/normal.mp3';
import deleteSound from '/sfx/delete.mp3';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const handleClick = (label) => {
    switch (label) {
      case 'AC':
        setInput('');
        setResult('');
        playSound(deleteSound);
        break;
      case '=':
        try {
          const sanitized = input.replace(/×/g, '*').replace(/÷/g, '/');
          setResult(eval(sanitized).toString());
        } catch {
          setResult('Error');
        }
        playSound(normalSound);
        break;
      case '←':
          setInput((prev) => prev.slice(0, -1));
          playSound(deleteSound);
        break;
      default:
        setInput((prev) => prev + label);
        playSound(normalSound);
        break;
    }
  };

  const buttons = [
    ['AC', '÷', '×', '←'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.']
  ];

  return (
    <div className="calculator">
      <Display value={result || input || '0'} />
      <div className="buttons">
        {buttons.flat().map((btn, idx) => (
          <Button
            key={idx}
            label={btn}
            onClick={handleClick}
            className={
              btn === 'AC' ? 'clear'
              : btn === '=' ? 'equals'
              : ['+', '-', '×', '÷'].includes(btn) ? 'operator'
              : btn === '0' ? 'zero'
              : ''
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;
