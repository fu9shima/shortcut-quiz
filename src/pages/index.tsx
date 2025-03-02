import { useEffect, useState } from "react";

export default function QuizPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [correctAnswers, setCorrectAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/getQuestions");
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerClick = (questionId: string, selected: string, correct: string) => {
    if (selectedAnswers[questionId]) return; // 既に回答済みなら変更しない

    setSelectedAnswers(prev => ({ ...prev, [questionId]: selected }));
    setCorrectAnswers(prev => ({ ...prev, [questionId]: correct }));

    if (selected === correct) {
      setScore(prev => prev + 1);
    }
  };

  // 100点満点に変換
  const percentageScore = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div style={{ padding: "20px" }}>
      <h1>クイズアプリ</h1>
      {questions.map((q, index) => (
        <div key={q.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
          {/* 項目数 + 問題文の形式にする */}
          <p><strong>問 {index + 1}. {q.question}</strong></p>
          {q.options.map((option: string, i: number) => {
            const isSelected = selectedAnswers[q.id] === option;
            const isCorrect = correctAnswers[q.id] === option;
            const isWrong = isSelected && !isCorrect; // 間違えたか判定

            return (
              <button
                key={i}
                onClick={() => handleAnswerClick(q.id, option, q.answer)}
                style={{
                  display: "block",
                  margin: "5px 0",
                  padding: "10px",
                  width: "100%",
                  backgroundColor: isSelected ? (isCorrect ? "green" : "red") : "white",
                  color: isSelected ? "white" : "black",
                  pointerEvents: isSelected ? "none" : "auto", // クリックできなくする
                }}
              >
                {option}
              </button>
            );
          })}
          {/* 間違えたら正解を表示 */}
          {selectedAnswers[q.id] && selectedAnswers[q.id] !== correctAnswers[q.id] && (
            <p style={{ color: "blue", marginTop: "10px" }}>
              ❗ 正解は: {correctAnswers[q.id]}
            </p>
          )}
        </div>
      ))}
      <h2>スコア: {percentageScore} / 100</h2>
    </div>
  );
}