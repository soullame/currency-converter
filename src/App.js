import "./App.css";
import React, { useEffect, useState } from "react";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState(0);
  const [currFrom, setCurrFrom] = useState("EUR");
  const [currTo, setCurrTo] = useState("USD");
  const [output, setOutput] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${currFrom}&to=${currTo}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        console.log(data);
        setOutput(data.rates[currTo]);
      } catch (error) {}
    };
    if (currFrom === currTo) return setOutput(amount);
    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup code can go here
    };
  }, [amount, currFrom, currTo]);

  return (
    <div className="App">
      <div className="container">
        <div className="title">Currency Converter</div>
        <div className="converter">
          <div className="amount">
            <div>Amount</div>
            <input
              type="text"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <div className="from">
            <div>From</div>
            <select
              value={currFrom}
              onChange={e => setCurrFrom(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
              <option value="JPY">JPY</option>
              <option value="BRL">BRL</option>
              <option value="TRY">TRY</option>
              <option value="INR">INR</option>
            </select>
          </div>

          <div className="to">
            <div>To</div>
            <select value={currTo} onChange={e => setCurrTo(e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
              <option value="JPY">JPY</option>
              <option value="BRL">BRL</option>
              <option value="TRY">TRY</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>

        <div className="output">
          {output !== 0 && (
            <span>
              = {output} {currTo}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
