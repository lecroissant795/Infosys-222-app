# MCQ Answer & Quality Design Rules

This document outlines the rules for authoring, updating, and generating Multiple-Choice Questions (MCQs) in this project to prevent unintended cues and ensure pedagogical rigor.

---

## 1. The Core Problem: Longest-Answer Bias

In multiple-choice testing, test-takers can frequently guess the correct answer without mastering the material if the author spends extra effort making the correct option detailed and qualified, while drafting short, simplistic distractors (incorrect options).

> **Rule**: The correct answer must **NOT** systematically be the longest or most detailed option.

---

## 2. Option Length Parity Standards

1. **Target Benchmark**:
   - In a 4-option question, the expected random probability of any single option being the longest is **~25%**.
   - Across any chapter or question bank, the proportion of questions where the correct answer is the longest option must stay within **25% – 35%**. It should **never exceed 40%**.

2. **Substantive Distractors**:
   - Every distractor must be written with the same depth, technical vocabulary, and grammatical complexity as the correct answer.
   - Avoid superficial or half-sentence distractors when the correct answer is a full explanation.

3. **Intentional Length Variation**:
   - **Make distractors the longest option**: Frequently make one or more incorrect distractors the longest and most detailed choices.
   - **Make the correct answer concise**: When the correct concept is simple, keep the correct option short and let the distractors be more elaborate.
   - **Maintain comparable length bounds**: Keep all four options within a comparable character length range (ideally within ±20% to ±30% of each other).

---

## 3. Distractor Quality & Misconceptions

- **No Absurd Throwaways**: Never use obviously false or comical options (e.g., *"deletes the internet"*, *"erases the operating system"*).
- **Target Real Misconceptions**: Ground distractors in common curriculum confusions:
  - **Normalisation**: Confusing 2NF partial dependencies with 3NF transitive dependencies; confusing BCNF superkey requirements with 3NF prime attribute exceptions.
  - **SQL**: Confusing `WHERE` (pre-aggregation row filter) with `HAVING` (post-aggregation group filter); confusing `TRUNCATE` (DDL) with `DELETE` (DML); confusing `UNION` with `UNION ALL`.
  - **DBMS Fundamentals**: Confusing physical vs logical data independence; confusing dirty reads, non-repeatable reads, and phantom reads; confusing candidate keys with superkeys.
  - **Data Warehouse**: Confusing Star vs Snowflake schemas; confusing additive, semi-additive, and non-additive measures; confusing OLTP vs OLAP characteristics.

---

## 4. Balanced Answer Positions (A, B, C, D)

- The correct answer index (`answer: 0 | 1 | 2 | 3`) must be distributed evenly across all four options:
  - **Option 0 (A)**: ~25%
  - **Option 1 (B)**: ~25%
  - **Option 2 (C)**: ~25%
  - **Option 3 (D)**: ~25%
- Shuffling functions (such as `shuffleQuestionOptions`) randomize options during quizzes, but the base data files must also be evenly balanced.

---

## 5. Question Schema Template

Each MCQ in `src/data/chapters/` must adhere to this structure:

```javascript
{
  id: "topic-01",
  q: "Clear, scenario- or concept-based question stem?",
  options: [
    "Plausible distractor with balanced detail and technical vocabulary.",
    "Correct answer that is precise and comparable in length to distractors.",
    "Plausible distractor representing a common student misconception.",
    "Detailed distractor addressing an edge case or alternate definition."
  ],
  answer: 1, // 0 = A, 1 = B, 2 = C, 3 = D (balanced across the chapter)
  explanation: "Clear pedagogical reasoning explaining why option B is correct and why other choices fail."
}
```

---

## 6. How to Audit Question Quality

To check for length bias and position distribution across all chapters, run:

```bash
bun -e "import { QUESTION_BANK } from './src/data/index.js';
for (const [topic, questions] of Object.entries(QUESTION_BANK)) {
  const counts = [0, 0, 0, 0];
  let longestCorrect = 0;
  for (const q of questions) {
    counts[q.answer]++;
    const lengths = q.options.map(o => o.length);
    if (lengths[q.answer] === Math.max(...lengths)) longestCorrect++;
  }
  const pct = Math.round((longestCorrect / questions.length) * 100);
  console.log(\`\${topic}: Longest=\${longestCorrect}/\${questions.length} (\${pct}%), Positions=\${JSON.stringify(counts)}\`);
}"
```

### Current Target Metrics

| Chapter | Target Longest Rate | Actual Verified Rate | Target Positions (A/B/C/D) |
| :--- | :---: | :---: | :---: |
| Normalisation | 25% – 35% | **30%** (9 / 30) | 8 / 8 / 7 / 7 |
| SQL | 25% – 35% | **30%** (9 / 30) | 8 / 8 / 7 / 7 |
| DBMS Fundamentals | 25% – 35% | **37%** (11 / 30) | 8 / 8 / 7 / 7 |
| Data Warehouse | 25% – 35% | **27%** (8 / 30) | 8 / 8 / 7 / 7 |
