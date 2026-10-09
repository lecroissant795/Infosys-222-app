import { normalizeQuestion, QUESTION_TYPES } from "./schema/questionTypes.js";
import * as normalisation from "./chapters/normalisation.js";
import * as sql from "./chapters/sql.js";
import * as dbmsFundamentals from "./chapters/dbms-fundamentals.js";
import * as dataWarehouse from "./chapters/data-warehouse.js";

export const CHAPTERS = [
  normalisation,
  sql,
  dbmsFundamentals,
  dataWarehouse,
];
export const WRITTEN_CHAPTERS = [];
export const ALL_CATEGORIES = [...CHAPTERS, ...WRITTEN_CHAPTERS];

export const QUESTION_BANK = Object.fromEntries(
  ALL_CATEGORIES.map((chapter) => [
    chapter.title,
    chapter.questions.map((question) =>
      normalizeQuestion(
        { ...question, topic: chapter.title, chapter: chapter.title },
        { topic: chapter.title, chapter: chapter.title }
      )
    ),
  ])
);

export const QUESTIONS = Object.fromEntries(
  CHAPTERS.map((chapter) => [
    chapter.title,
    QUESTION_BANK[chapter.title].filter((question) => question.type === QUESTION_TYPES.MCQ),
  ])
);

export const topics = CHAPTERS
  .filter((chapter) =>
    QUESTION_BANK[chapter.title].some((question) => question.type === QUESTION_TYPES.MCQ)
  )
  .map((chapter) => chapter.title);

export const PRACTICE_GROUPS = [
  {
    type: QUESTION_TYPES.NUMERIC_INPUT,
    label: "Numeric Input",
    accent: "rgba(35, 131, 226, 0.08)",
    border: "rgba(35, 131, 226, 0.2)",
    textColor: "#2383e2",
  },
  {
    type: QUESTION_TYPES.JOURNAL_ENTRY,
    label: "Journal Entries",
    accent: "rgba(196, 145, 59, 0.08)",
    border: "rgba(196, 145, 59, 0.2)",
    textColor: "#c4913b",
  },
  {
    type: QUESTION_TYPES.TABLE_CLASSIFICATION,
    label: "Table Classification",
    accent: "rgba(68, 131, 97, 0.08)",
    border: "rgba(68, 131, 97, 0.2)",
    textColor: "#448361",
  },
  {
    type: QUESTION_TYPES.CASE_SET,
    label: "Case Sets",
    accent: "rgba(51, 126, 169, 0.08)",
    border: "rgba(51, 126, 169, 0.2)",
    textColor: "#337ea9",
  },
];

export const PRACTICE_QUESTIONS = Object.fromEntries(
  PRACTICE_GROUPS.map((group) => [
    group.label,
    Object.values(QUESTION_BANK)
      .flat()
      .filter((question) => question.type === group.type),
  ])
);

export const practiceGroups = PRACTICE_GROUPS.filter(
  (group) => PRACTICE_QUESTIONS[group.label].length > 0
);

export const allTopics = ALL_CATEGORIES.map((chapter) => chapter.title);

export const totalQuestionCount = topics.reduce(
  (sum, topic) => sum + QUESTIONS[topic].length,
  0
);

export const totalWrittenQuestionCount = WRITTEN_CHAPTERS.reduce(
  (sum, chapter) => sum + chapter.questions.length,
  0
);

export const totalPracticeQuestionCount = practiceGroups.reduce(
  (sum, group) => sum + PRACTICE_QUESTIONS[group.label].length,
  0
);

export function getQuestionById(id) {
  for (const chapterTitle of Object.keys(QUESTION_BANK)) {
    for (const question of QUESTION_BANK[chapterTitle]) {
      if (`${chapterTitle}::${question.q ?? question.prompt}` === id || question.id === id) {
        return { ...question, topic: chapterTitle };
      }
    }
  }
  return null;
}

function collectJournalAccountSuggestions() {
  const accounts = new Set();

  for (const questions of Object.values(QUESTION_BANK)) {
    for (const question of questions) {
      if (question.type !== QUESTION_TYPES.JOURNAL_ENTRY) continue;

      for (const line of question.answer?.lines ?? []) {
        if (line.account) accounts.add(line.account);
      }

      const aliases = question.answer?.rules?.acceptedAccountAliases ?? {};
      for (const [canonical, aliasList] of Object.entries(aliases)) {
        accounts.add(canonical);
        for (const alias of aliasList) accounts.add(alias);
      }
    }
  }

  return [...accounts].sort((a, b) => a.localeCompare(b));
}

/** Account name suggestions for journal entry practice (from all journal questions in the app). */
export const JOURNAL_ACCOUNT_SUGGESTIONS = collectJournalAccountSuggestions();
