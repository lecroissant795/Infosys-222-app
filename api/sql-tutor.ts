import { checkSqlAnswer, getSqlTutorQuestion } from "../src/server/sqlTutor.ts";

export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    const question = getSqlTutorQuestion(Number(req.query?.number));
    if (!question) return res.status(404).json({ error: "Question not found" });
    return res.json(question);
  }

  if (req.method === "POST") {
    const result = checkSqlAnswer(Number(req.body?.number), req.body?.sql);
    if (!result) return res.status(404).json({ error: "Question not found" });
    return res.json(result);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
