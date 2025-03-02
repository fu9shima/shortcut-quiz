import { NextApiRequest, NextApiResponse } from "next";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { userId, score } = req.body;
      await addDoc(collection(db, "scores"), {
        userId,
        score,
        createdAt: new Date(),
      });

      res.status(200).json({ message: "スコア保存成功！" });
    } catch (error) {
      res.status(500).json({ error: "スコアの保存に失敗しました" });
    }
  } else {
    res.status(405).json({ error: "POST メソッドのみ許可されています" });
  }
}