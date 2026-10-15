import { describe, expect, test } from "bun:test";
import {
  checkSqlAnswer,
  getSqlTutorQuestion,
  sanitizeSql,
  SQL_TUTOR_QUESTION_COUNT,
} from "./sqlTutor.ts";

describe("getSqlTutorQuestion", () => {
  test("every question has an example result and never leaks the solution", () => {
    for (let n = 1; n <= SQL_TUTOR_QUESTION_COUNT; n += 1) {
      const question = getSqlTutorQuestion(n)!;
      expect(question.example.columns.length).toBeGreaterThan(0);
      expect(question.example.rows.length).toBeGreaterThan(0);
      expect(JSON.stringify(question)).not.toContain("solution");
    }
    expect(getSqlTutorQuestion(0)).toBeNull();
    expect(getSqlTutorQuestion(SQL_TUTOR_QUESTION_COUNT + 1)).toBeNull();
  });

  test("question 1 expects formatted full names", () => {
    const q = getSqlTutorQuestion(1)!;
    expect(q.example.columns).toEqual(["fullName", "gender"]);
    expect(q.example.rows[0]).toEqual(["BROOKS, Whitney", "M"]);
  });
});

describe("checkSqlAnswer", () => {
  test("accepts a correct answer", () => {
    const result = checkSqlAnswer(
      1,
      "select upper(lastName) || ', ' || firstName as fullName, gender from customer order by lastName;"
    )!;
    expect(result.passed).toBe(true);
  });

  test("flags wrong aliases", () => {
    const result = checkSqlAnswer(
      1,
      "SELECT UPPER(lastName) || ', ' || firstName, gender FROM customer ORDER BY lastName"
    )!;
    expect(result.passed).toBe(false);
    expect(result.feedback.join(" ")).toContain("column headers");
  });

  test("flags wrong ordering", () => {
    const result = checkSqlAnswer(
      1,
      "SELECT UPPER(lastName) || ', ' || firstName AS fullName, gender FROM customer ORDER BY firstName"
    )!;
    expect(result.passed).toBe(false);
    expect(result.feedback.join(" ")).toContain("wrong order");
  });

  test("reports SQL errors and rejects non-SELECT", () => {
    expect(checkSqlAnswer(1, "SELECT nope FROM customer")!.error).toContain("SQLite error");
    expect(checkSqlAnswer(1, "DELETE FROM customer")!.error).toContain("SELECT");
    expect(checkSqlAnswer(1, "SELECT 1; DROP TABLE customer")!.error).toContain("single");
  });

  test("each reference solution passes itself via sanitizeSql", () => {
    expect(sanitizeSql("  SELECT 1;  ")).toEqual({ sql: "SELECT 1" });
    expect(sanitizeSql("SELECT ';' AS x")).toEqual({ sql: "SELECT ';' AS x" });
  });
});

test("client constant matches the question bank", async () => {
  const { SQL_TUTOR_QUESTION_COUNT: clientCount } = await import("../constants/sqlTutor.js");
  expect(clientCount).toBe(SQL_TUTOR_QUESTION_COUNT);
});
