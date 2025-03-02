import { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Firestore の設定を読み込む

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Firestore から `questions` コレクションのデータを取得
      const querySnapshot = await getDocs(collection(db, "questions"));
      const questions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      res.status(200).json({ questions });
    } catch (error) {
      res.status(500).json({ error: "データの取得に失敗しました" });
    }
  } else {
    res.status(405).json({ error: "GET メソッドのみ許可されています" });
  }
}