import { NextApiRequest, NextApiResponse } from "next";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const questions = [
        {
          question: "Macでアプリケーションをすべて隠すショートカットは？",
          options: ["Command + H", "Command + M", "Command + Option + H"],
          answer: "Command + Option + H",
        },
        {
          question: "MacでFinderを開くショートカットは？",
          options: ["Command + Space", "Command + N", "Command + Option + F"],
          answer: "Command + N",
        },
        {
          question: "Macでウィンドウをフルスクリーンにするショートカットは？",
          options: ["Control + Command + F", "Command + F", "Command + Shift + F"],
          answer: "Control + Command + F",
        },
        {
          question: "Macで前回閉じたタブを再び開くショートカットは？",
          options: ["Command + Shift + T", "Command + Option + T", "Command + Shift + R"],
          answer: "Command + Shift + T",
        },
        {
          question: "Macで画面をロックするショートカットは？",
          options: ["Command + Control + Q", "Command + Shift + Q", "Command + Option + L"],
          answer: "Command + Control + Q",
        }
      ];

      for (const q of questions) {
        await addDoc(collection(db, "questions"), {
          ...q,
          createdAt: new Date(),
        });
      }

      res.status(200).json({ message: "クイズを追加しました！" });
    } catch (error) {
      console.error("エラー:", error);
      res.status(500).json({ error: "クイズの追加に失敗しました" });
    }
  } else {
    res.status(405).json({ error: "POST メソッドのみ許可されています" });
  }
}