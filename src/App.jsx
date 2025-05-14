
import { useState } from "react";

function App() {
  const [matchInfo, setMatchInfo] = useState("");
  const [prediction, setPrediction] = useState("");

  const handlePredict = async () => {
    const res = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ match: matchInfo }),
    });
    const data = await res.json();
    setPrediction(data.prediction);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">⚽ 스포츠 경기 예측 (GPT)</h1>
      <textarea
        className="w-full border p-2 mb-4"
        placeholder="예: Arsenal vs Chelsea, 2025-05-20, 홈팀 최근 5연승"
        rows="4"
        value={matchInfo}
        onChange={(e) => setMatchInfo(e.target.value)}
      />
      <button
        onClick={handlePredict}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        예측하기
      </button>
      {prediction && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <strong>예측 결과:</strong>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default App;
