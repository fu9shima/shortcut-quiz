import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const addQuestion = async () => {
  await addDoc(collection(db, "questions"), {
    question: "Macで新しいタブを開くショートカットは？",
    options: ["Command + T", "Control + T", "Shift + T"],
    answer: "Command + T"
  });
};

addQuestion()
  .then(() => console.log("クイズ追加完了"))
  .catch((error) => console.error("エラー:", error));
  