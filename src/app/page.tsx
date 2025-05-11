"use client";
import { useState } from "react";
import { evaluate } from "mathjs";

export default function Home() {
  const [input, setInput] = useState<string>("");

  const preprocessExpression = (expr: string) => {
    const toRadians = (deg: string) => `(${deg} * ${Math.PI} / 180)`;
    return expr
      .replace(/sin\(([^)]+)\)/g, (_, angle) => `sin(${toRadians(angle)})`)
      .replace(/cos\(([^)]+)\)/g, (_, angle) => `cos(${toRadians(angle)})`)
      .replace(/tan\(([^)]+)\)/g, (_, angle) => `tan(${toRadians(angle)})`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleButtonClick = (value: string) => {
    if (value === "=") {
      try {
        const result = evaluate(preprocessExpression(input)).toString();
        setInput(result);
      } catch {
        setInput("Error");
      }
    } else if (value === "CLR") {
      setInput("");
    } else if (value === "BKSP") {
      setInput((prev) => prev.slice(0, -1));
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    "CLR", "BKSP", "(", ")",
    "sin(", "cos(", "tan(", "%",
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-black">
      <div className="w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter expression"
          className="w-full text-right text-3xl font-mono p-4 border border-gray-300 rounded mb-4 bg-ray-600 shadow-sm"
        />
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => (
            <button
              key={btn}
              className={`p-4 text-2xl rounded font-bold shadow-sm transition 
                ${btn === "="
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : btn === "C" || btn === "⌫"
                  ? "bg-red-400 text-white hover:bg-red-500"
                  : "bg-orange-400 text-white hover:bg-orange-500"}`}
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
