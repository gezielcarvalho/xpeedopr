import React from "react";

import useCounter from "../stores/counterStore";

export default function ZustandExample() {
  const { count, increase, decrease } = useCounter();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Counter: {count}</h1>
      <div className="space-x-4">
        <button
          onClick={increase}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Increase
        </button>
        <button
          onClick={decrease}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Decrease
        </button>
      </div>
    </div>
  );
}