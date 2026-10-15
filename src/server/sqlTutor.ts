import { Database } from "bun:sqlite";

export type SqlValue = string | number | null;

export interface SqlTableColumn {
  name: string;
  type: string;
  note?: string;
}

export interface SqlTableSchema {
  table: string;
  columns: SqlTableColumn[];
}

interface SqlTutorQuestionDef {
  title: string;
  level: "Intermediate" | "Advanced";
  skills: string[];
  prompt: string;
  tables: string[];
  /** Server-only reference answer. Never sent to the client. */
  solution: string;
  ordered: boolean;
}

export interface SqlTutorQuestion {
  number: number;
  total: number;
  title: string;
  level: string;
  skills: string[];
  prompt: string;
  schema: SqlTableSchema[];
  example: { columns: string[]; rows: SqlValue[][]; totalRows: number };
}

export interface SqlCheckResult {
  passed: boolean;
  error: string | null;
  columnMatches: { expected: string | null; got: string | null; match: boolean }[];
  expected: { columns: string[]; rows: SqlValue[][] };
  got: { columns: string[]; rows: SqlValue[][] } | null;
  rowMatches: { expected: boolean; got: boolean }[];
  feedback: string[];
}

const SCHEMA_SQL = `
CREATE TABLE customer (
  customerId INTEGER PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  gender TEXT NOT NULL,
  city TEXT NOT NULL,
  email TEXT NOT NULL,
  joinDate TEXT NOT NULL,
  creditLimit INTEGER NOT NULL
);
CREATE TABLE orderHeader (
  orderId INTEGER PRIMARY KEY,
  customerId INTEGER NOT NULL REFERENCES customer(customerId),
  orderDate TEXT NOT NULL,
  totalAmount REAL NOT NULL
);
INSERT INTO customer VALUES
  (1, 'Cassi',    'Demaris',   'F', 'Auckland',     'cassi.demaris@mail.co.nz',    '2019-03-14', 1500),
  (2, 'Dania',    'Fowler',    'F', 'Wellington',   'dania.fowler@mail.co.nz',     '2020-07-02', 2000),
  (3, 'Deborah',  'Okafor',    'F', 'Auckland',     'deborah.okafor@mail.co.nz',   '2018-11-23', 3000),
  (4, 'Donetta',  'Pryce',     'F', 'Hamilton',     'donetta.pryce@mail.co.nz',    '2021-01-09', 1000),
  (5, 'Frederic', 'Lindqvist', 'M', 'Wellington',   'frederic.lindqvist@mail.co.nz','2017-05-30', 2500),
  (6, 'Joanna',   'Hartley',   'F', 'Christchurch', 'joanna.hartley@mail.co.nz',   '2020-09-18', 1800),
  (7, 'Lowell',   'Dacanay',   'M', 'Auckland',     'lowell.dacanay@mail.co.nz',   '2022-02-11', 1200),
  (8, 'Shonna',   'Whitaker',  'F', 'Hamilton',     'shonna.whitaker@mail.co.nz',  '2019-12-05', 2200),
  (9, 'Tyler',    'Nakamura',  'M', 'Wellington',   'tyler.nakamura@mail.co.nz',   '2021-06-27', 900),
  (10,'Whitney',  'Brooks',    'M', 'Christchurch', 'whitney.brooks@mail.co.nz',   '2023-04-19', 1600);
INSERT INTO orderHeader VALUES
  (101, 1, '2023-01-15', 250.00),
  (102, 1, '2023-03-02', 120.50),
  (103, 2, '2023-02-20', 980.00),
  (104, 3, '2023-05-11', 45.75),
  (105, 3, '2023-06-30', 310.00),
  (106, 3, '2024-01-08', 75.25),
  (107, 5, '2023-08-14', 1500.00),
  (108, 6, '2024-02-29', 60.00),
  (109, 7, '2024-03-17', 410.40),
  (110, 7, '2024-04-01', 89.99),
  (111, 9, '2023-12-24', 205.00),
  (112, 1, '2024-05-09', 330.00);

-- Un-normalised (1NF) tables used by the normalisation questions
CREATE TABLE orderFlat (
  orderNo INTEGER NOT NULL,
  itemCode TEXT NOT NULL,
  orderDate TEXT NOT NULL,
  customerNo TEXT NOT NULL,
  customerName TEXT NOT NULL,
  customerAddress TEXT NOT NULL,
  description TEXT NOT NULL,
  unit TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  dateRequired TEXT NOT NULL,
  methodDelivery TEXT NOT NULL,
  salesperson TEXT NOT NULL,
  PRIMARY KEY (orderNo, itemCode)
);
INSERT INTO orderFlat VALUES
  (5001, 'P10', '2024-02-01', 'C01', 'Harper Hardware',  '12 Queen St, Auckland',   'Hex Bolt',     'box',   20, '2024-02-10', 'Courier', 'Mia'),
  (5001, 'P20', '2024-02-01', 'C01', 'Harper Hardware',  '12 Queen St, Auckland',   'Nut',          'box',   20, '2024-02-10', 'Courier', 'Mia'),
  (5002, 'P10', '2024-02-03', 'C02', 'Kiwi Builders',    '4 Bond Rd, Hamilton',     'Hex Bolt',     'box',   50, '2024-02-12', 'Pickup',  'Sam'),
  (5002, 'P30', '2024-02-03', 'C02', 'Kiwi Builders',    '4 Bond Rd, Hamilton',     'Washer',       'bag',   30, '2024-02-12', 'Pickup',  'Sam'),
  (5002, 'P40', '2024-02-03', 'C02', 'Kiwi Builders',    '4 Bond Rd, Hamilton',     'Bracket',      'each',  10, '2024-02-12', 'Pickup',  'Sam'),
  (5003, 'P20', '2024-02-07', 'C01', 'Harper Hardware',  '12 Queen St, Auckland',   'Nut',          'box',   15, '2024-02-15', 'Courier', 'Mia'),
  (5004, 'P40', '2024-02-09', 'C03', 'Southern Supplies','88 Dee St, Invercargill', 'Bracket',      'each',  25, '2024-02-20', 'Freight', 'Ravi'),
  (5004, 'P30', '2024-02-09', 'C03', 'Southern Supplies','88 Dee St, Invercargill', 'Washer',       'bag',   40, '2024-02-20', 'Freight', 'Ravi');

CREATE TABLE workFlat (
  projNum INTEGER NOT NULL,
  projName TEXT NOT NULL,
  empNum INTEGER NOT NULL,
  empName TEXT NOT NULL,
  jobClass TEXT NOT NULL,
  chgHour REAL NOT NULL,
  hours REAL NOT NULL,
  PRIMARY KEY (projNum, empNum)
);
INSERT INTO workFlat VALUES
  (15, 'Evergreen',   103, 'A. Arbough',  'Elec. Engineer', 84.50, 23.8),
  (15, 'Evergreen',   101, 'J. Newson',   'Database Designer', 105.00, 19.4),
  (15, 'Evergreen',   105, 'D. Bryanski', 'Database Designer', 105.00, 35.7),
  (18, 'Amber Wave',  104, 'A. Smith',    'Programmer',     35.75, 12.6),
  (18, 'Amber Wave',  101, 'J. Newson',   'Database Designer', 105.00, 45.3),
  (18, 'Amber Wave',  114, 'A. Alonzo',   'Programmer',     35.75, 32.4),
  (22, 'Rolling Tide',103, 'A. Arbough',  'Elec. Engineer', 84.50, 8.0),
  (22, 'Rolling Tide',104, 'A. Smith',    'Programmer',     35.75, 22.0);
`;

const SCHEMA_DOCS: Record<string, SqlTableSchema> = {
  customer: {
    table: "customer",
    columns: [
      { name: "customerId", type: "INTEGER", note: "primary key" },
      { name: "firstName", type: "TEXT" },
      { name: "lastName", type: "TEXT" },
      { name: "gender", type: "TEXT", note: "'M' or 'F'" },
      { name: "city", type: "TEXT" },
      { name: "email", type: "TEXT" },
      { name: "joinDate", type: "TEXT", note: "ISO date, YYYY-MM-DD" },
      { name: "creditLimit", type: "INTEGER" },
    ],
  },
  orderHeader: {
    table: "orderHeader",
    columns: [
      { name: "orderId", type: "INTEGER", note: "primary key" },
      { name: "customerId", type: "INTEGER", note: "foreign key → customer.customerId" },
      { name: "orderDate", type: "TEXT", note: "ISO date, YYYY-MM-DD" },
      { name: "totalAmount", type: "REAL" },
    ],
  },
  orderFlat: {
    table: "orderFlat",
    columns: [
      { name: "orderNo", type: "INTEGER", note: "part of the composite primary key" },
      { name: "itemCode", type: "TEXT", note: "part of the composite primary key" },
      { name: "orderDate", type: "TEXT" },
      { name: "customerNo", type: "TEXT" },
      { name: "customerName", type: "TEXT" },
      { name: "customerAddress", type: "TEXT" },
      { name: "description", type: "TEXT" },
      { name: "unit", type: "TEXT" },
      { name: "quantity", type: "INTEGER" },
      { name: "dateRequired", type: "TEXT" },
      { name: "methodDelivery", type: "TEXT" },
      { name: "salesperson", type: "TEXT" },
    ],
  },
  workFlat: {
    table: "workFlat",
    columns: [
      { name: "projNum", type: "INTEGER", note: "part of the composite primary key" },
      { name: "projName", type: "TEXT" },
      { name: "empNum", type: "INTEGER", note: "part of the composite primary key" },
      { name: "empName", type: "TEXT" },
      { name: "jobClass", type: "TEXT" },
      { name: "chgHour", type: "REAL", note: "charge per hour" },
      { name: "hours", type: "REAL" },
    ],
  },
};

const QUESTION_BANK: SqlTutorQuestionDef[] = [
  {
    title: "Formatted full name",
    level: "Intermediate",
    skills: ["SELECT", "String manipulation", "Aliasing", "ORDER BY"],
    prompt:
      "Write a single SQL statement to output the full name and gender of all customers ordered by last name. " +
      "The full name should be formatted like this: SMITH, John (last name in upper case, a comma and a space, then the first name as stored). " +
      "Name the output columns fullName and gender.",
    tables: ["customer"],
    solution:
      "SELECT UPPER(lastName) || ', ' || firstName AS fullName, gender FROM customer ORDER BY lastName",
    ordered: true,
  },
  {
    title: "Customer initials in one city",
    level: "Intermediate",
    skills: ["SUBSTR", "WHERE", "Aliasing", "ORDER BY"],
    prompt:
      "Write a single SQL statement to output the customer ID and the initials of every customer who lives in Auckland, " +
      "ordered by customer ID. Initials are the first letter of the first name followed by the first letter of the last name, " +
      "for example LD. Name the output columns customerId and initials.",
    tables: ["customer"],
    solution:
      "SELECT customerId, SUBSTR(firstName, 1, 1) || SUBSTR(lastName, 1, 1) AS initials FROM customer WHERE city = 'Auckland' ORDER BY customerId",
    ordered: true,
  },
  {
    title: "Name length ranking",
    level: "Intermediate",
    skills: ["LENGTH", "WHERE", "Multi-column ORDER BY"],
    prompt:
      "Write a single SQL statement to output the first name and the number of characters in the first name " +
      "(as nameLength) for all customers whose first name is longer than 5 characters. " +
      "Order the result by nameLength with the longest first, then by first name alphabetically.",
    tables: ["customer"],
    solution:
      "SELECT firstName, LENGTH(firstName) AS nameLength FROM customer WHERE LENGTH(firstName) > 5 ORDER BY nameLength DESC, firstName",
    ordered: true,
  },
  {
    title: "Customers per city",
    level: "Intermediate",
    skills: ["COUNT", "GROUP BY", "ORDER BY"],
    prompt:
      "Write a single SQL statement to output each city and the number of customers living there (as numCustomers). " +
      "Order the result by numCustomers with the largest first, then by city alphabetically.",
    tables: ["customer"],
    solution:
      "SELECT city, COUNT(*) AS numCustomers FROM customer GROUP BY city ORDER BY numCustomers DESC, city",
    ordered: true,
  },
  {
    title: "Spend per customer",
    level: "Intermediate",
    skills: ["INNER JOIN", "SUM", "GROUP BY", "String concatenation"],
    prompt:
      "Write a single SQL statement to output the full name of each customer who has placed at least one order, " +
      "together with the total value of their orders (as totalSpent). " +
      "The full name should be formatted like this: Lowell Dacanay (first name, a space, then last name) and named fullName. " +
      "Order the result by totalSpent with the largest first.",
    tables: ["customer", "orderHeader"],
    solution:
      "SELECT c.firstName || ' ' || c.lastName AS fullName, SUM(o.totalAmount) AS totalSpent FROM customer c JOIN orderHeader o ON o.customerId = c.customerId GROUP BY c.customerId ORDER BY totalSpent DESC",
    ordered: true,
  },
  {
    title: "Frequent customers",
    level: "Advanced",
    skills: ["JOIN", "GROUP BY", "HAVING", "COUNT"],
    prompt:
      "Write a single SQL statement to output the last name and the number of orders (as numOrders) " +
      "for every customer who has placed 2 or more orders. Order the result by last name.",
    tables: ["customer", "orderHeader"],
    solution:
      "SELECT c.lastName, COUNT(*) AS numOrders FROM customer c JOIN orderHeader o ON o.customerId = c.customerId GROUP BY c.customerId HAVING COUNT(*) >= 2 ORDER BY c.lastName",
    ordered: true,
  },
  {
    title: "Join year summary",
    level: "Advanced",
    skills: ["Date functions", "GROUP BY", "AVG", "ROUND"],
    prompt:
      "Write a single SQL statement to output the year each customer joined (as joinYear, from joinDate) and the average " +
      "credit limit of the customers who joined that year (as avgCreditLimit), rounded to 2 decimal places. " +
      "Order the result by joinYear. SQLite stores dates as text, so think about which function can extract the year.",
    tables: ["customer"],
    solution:
      "SELECT SUBSTR(joinDate, 1, 4) AS joinYear, ROUND(AVG(creditLimit), 2) AS avgCreditLimit FROM customer GROUP BY joinYear ORDER BY joinYear",
    ordered: true,
  },
  {
    title: "Customers who never ordered",
    level: "Advanced",
    skills: ["LEFT JOIN", "IS NULL", "String functions", "ORDER BY"],
    prompt:
      "Write a single SQL statement to output the full name (formatted like this: Brooks, Whitney, i.e. last name, a comma and a space, " +
      "then first name; named fullName) and the city of every customer who has never placed an order. " +
      "Order the result by last name.",
    tables: ["customer", "orderHeader"],
    solution:
      "SELECT c.lastName || ', ' || c.firstName AS fullName, c.city FROM customer c LEFT JOIN orderHeader o ON o.customerId = c.customerId WHERE o.orderId IS NULL ORDER BY c.lastName",
    ordered: true,
  },
  {
    title: "2NF: extract the ITEM relation",
    level: "Intermediate",
    skills: ["Normalisation", "Partial dependency", "2NF", "DISTINCT"],
    prompt:
      "The orderFlat table is in 1NF with the composite primary key (orderNo, itemCode). " +
      "The attributes description and unit depend only on itemCode, which is a partial dependency. " +
      "Write a single SQL statement to output the rows of the ITEM relation (itemCode, description, unit) " +
      "that results from removing this partial dependency, with no duplicate rows, ordered by itemCode.",
    tables: ["orderFlat"],
    solution: "SELECT DISTINCT itemCode, description, unit FROM orderFlat ORDER BY itemCode",
    ordered: true,
  },
  {
    title: "3NF: extract the CUSTOMER relation",
    level: "Intermediate",
    skills: ["Normalisation", "Transitive dependency", "3NF", "DISTINCT"],
    prompt:
      "In orderFlat, orderNo → customerNo and customerNo → customerName, customerAddress, so customerName and " +
      "customerAddress are transitively dependent on orderNo. Write a single SQL statement to output the rows of the " +
      "CUSTOMER relation (customerNo, customerName, customerAddress) created by removing this transitive dependency, " +
      "with no duplicate rows, ordered by customerNo.",
    tables: ["orderFlat"],
    solution:
      "SELECT DISTINCT customerNo, customerName, customerAddress FROM orderFlat ORDER BY customerNo",
    ordered: true,
  },
  {
    title: "3NF: the remaining ORDER relation",
    level: "Intermediate",
    skills: ["Normalisation", "2NF", "3NF", "DISTINCT"],
    prompt:
      "After the ITEM and CUSTOMER relations are removed from orderFlat, the ORDER relation keeps only the facts about " +
      "the order itself, plus customerNo as a foreign key. Write a single SQL statement to output the rows of the 3NF " +
      "ORDER relation with the columns orderNo, orderDate, customerNo, dateRequired, methodDelivery and salesperson " +
      "(in that order), with no duplicate rows, ordered by orderNo.",
    tables: ["orderFlat"],
    solution:
      "SELECT DISTINCT orderNo, orderDate, customerNo, dateRequired, methodDelivery, salesperson FROM orderFlat ORDER BY orderNo",
    ordered: true,
  },
  {
    title: "Testing a functional dependency",
    level: "Advanced",
    skills: ["Normalisation", "Functional dependency", "GROUP BY", "COUNT DISTINCT"],
    prompt:
      "A functional dependency jobClass → chgHour holds only if every job class has exactly one charge rate. " +
      "Write a single SQL statement to output each jobClass and the number of different charge rates recorded for it " +
      "(as numRates), ordered by jobClass. If the dependency holds, every numRates value will be 1.",
    tables: ["workFlat"],
    solution:
      "SELECT jobClass, COUNT(DISTINCT chgHour) AS numRates FROM workFlat GROUP BY jobClass ORDER BY jobClass",
    ordered: true,
  },
  {
    title: "3NF: extract the EMPLOYEE relation",
    level: "Advanced",
    skills: ["Normalisation", "Transitive dependency", "3NF", "DISTINCT"],
    prompt:
      "In workFlat the dependency empNum → jobClass → chgHour is transitive. After removing it, EMPLOYEE keeps jobClass " +
      "as a foreign key but no longer stores chgHour. Write a single SQL statement to output the rows of the 3NF " +
      "EMPLOYEE relation (empNum, empName, jobClass), with no duplicate rows, ordered by empNum.",
    tables: ["workFlat"],
    solution: "SELECT DISTINCT empNum, empName, jobClass FROM workFlat ORDER BY empNum",
    ordered: true,
  },
  {
    title: "3NF: JOB relation with headcount",
    level: "Advanced",
    skills: ["Normalisation", "3NF", "GROUP BY", "COUNT DISTINCT"],
    prompt:
      "Write a single SQL statement to output the rows of the JOB relation (jobClass, chgHour) created when the " +
      "transitive dependency in workFlat is removed, together with the number of different employees who hold each " +
      "job class (as numEmployees). Order the result by jobClass.",
    tables: ["workFlat"],
    solution:
      "SELECT jobClass, chgHour, COUNT(DISTINCT empNum) AS numEmployees FROM workFlat GROUP BY jobClass, chgHour ORDER BY jobClass",
    ordered: true,
  },
];

export const SQL_TUTOR_QUESTION_COUNT = QUESTION_BANK.length;
const EXAMPLE_ROW_LIMIT = 5;

function createDatabase(): Database {
  const db = new Database(":memory:");
  db.exec(SCHEMA_SQL);
  return db;
}

interface QueryOutput {
  columns: string[];
  rows: SqlValue[][];
}

function normalizeValue(value: unknown): SqlValue {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return Number.isInteger(value) ? value : Math.round(value * 1e6) / 1e6;
  if (typeof value === "bigint") return Number(value);
  return String(value);
}

function runQuery(db: Database, sql: string): QueryOutput {
  const statement = db.query(sql);
  const columns = [...statement.columnNames];
  const rows = (statement.values() as unknown[][]).map((row) => row.map(normalizeValue));
  return { columns, rows };
}

/** Accepts exactly one read-only SELECT (or WITH ... SELECT) statement. */
export function sanitizeSql(raw: unknown): { sql: string } | { error: string } {
  if (typeof raw !== "string" || !raw.trim()) {
    return { error: "Type a SQL statement before checking." };
  }
  const sql = raw.trim().replace(/;+\s*$/, "").trim();
  if (!sql) return { error: "Type a SQL statement before checking." };
  if (sql.length > 4000) return { error: "Query is too long." };
  const withoutStrings = sql.replace(/'(?:[^']|'')*'/g, "''");
  if (withoutStrings.includes(";")) {
    return { error: "Write a single SQL statement — remove the extra statement after the semicolon." };
  }
  if (!/^(select|with)\b/i.test(sql)) {
    return { error: "This exercise only accepts a SELECT statement." };
  }
  return { sql };
}

function rowsEqual(a: SqlValue[], b: SqlValue[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function rowKey(row: SqlValue[]): string {
  return JSON.stringify(row);
}

function sameRowSet(a: SqlValue[][], b: SqlValue[][]): boolean {
  if (a.length !== b.length) return false;
  const counts = new Map<string, number>();
  for (const row of a) counts.set(rowKey(row), (counts.get(rowKey(row)) ?? 0) + 1);
  for (const row of b) {
    const key = rowKey(row);
    const count = counts.get(key);
    if (!count) return false;
    counts.set(key, count - 1);
  }
  return true;
}

export function getSqlTutorQuestion(number: number): SqlTutorQuestion | null {
  const def = QUESTION_BANK[number - 1];
  if (!def || !Number.isInteger(number)) return null;

  const db = createDatabase();
  try {
    const expected = runQuery(db, def.solution);
    return {
      number,
      total: QUESTION_BANK.length,
      title: def.title,
      level: def.level,
      skills: def.skills,
      prompt: def.prompt,
      schema: def.tables.map((table) => SCHEMA_DOCS[table]!),
      example: {
        columns: expected.columns,
        rows: expected.rows.slice(0, EXAMPLE_ROW_LIMIT),
        totalRows: expected.rows.length,
      },
    };
  } finally {
    db.close();
  }
}

export function checkSqlAnswer(number: number, rawSql: unknown): SqlCheckResult | null {
  const def = QUESTION_BANK[number - 1];
  if (!def || !Number.isInteger(number)) return null;

  const db = createDatabase();
  try {
    const expected = runQuery(db, def.solution);
    const empty = (error: string): SqlCheckResult => ({
      passed: false,
      error,
      columnMatches: expected.columns.map((column) => ({ expected: column, got: null, match: false })),
      expected,
      got: null,
      rowMatches: [],
      feedback: [],
    });

    const cleaned = sanitizeSql(rawSql);
    if ("error" in cleaned) return empty(cleaned.error);

    db.exec("PRAGMA query_only = ON");
    let got: QueryOutput;
    try {
      got = runQuery(db, cleaned.sql);
    } catch (error) {
      const message = error instanceof Error ? error.message : "The query could not be run.";
      return empty(`SQLite error: ${message}`);
    }

    const width = Math.max(expected.columns.length, got.columns.length);
    const columnMatches = Array.from({ length: width }, (_, index) => {
      const e = expected.columns[index] ?? null;
      const g = got.columns[index] ?? null;
      return { expected: e, got: g, match: e !== null && e === g };
    });
    const columnsOk = columnMatches.every((column) => column.match);

    const rowCount = Math.max(expected.rows.length, got.rows.length);
    const matchedIndexes = Array.from({ length: rowCount }, (_, index) => {
      const e = expected.rows[index];
      const g = got.rows[index];
      return e !== undefined && g !== undefined && rowsEqual(e, g);
    });
    const rowMatches = matchedIndexes.map((match) => ({ expected: match, got: match }));
    const rowsOk = matchedIndexes.every(Boolean);

    const passed = columnsOk && (def.ordered ? rowsOk : sameRowSet(expected.rows, got.rows));

    const feedback: string[] = [];
    if (!passed) {
      if (got.columns.length !== expected.columns.length) {
        feedback.push(
          `Expected ${expected.columns.length} output column(s) but your query returned ${got.columns.length}.`
        );
      } else if (!columnsOk) {
        feedback.push(
          "The column headers don't match exactly. Check your aliases (AS) and their spelling and capitalisation."
        );
      }
      if (got.rows.length !== expected.rows.length) {
        feedback.push(
          `Expected ${expected.rows.length} row(s) but your query returned ${got.rows.length}. Check your WHERE, JOIN, GROUP BY or HAVING logic.`
        );
      } else if (sameRowSet(expected.rows, got.rows) && def.ordered) {
        feedback.push("You have the right rows but in the wrong order. Check your ORDER BY (column and ASC/DESC).");
      } else if (!rowsOk) {
        const firstBad = matchedIndexes.findIndex((match) => !match);
        feedback.push(
          `The values start to differ at row ${firstBad + 1}. Check the string formatting, functions or calculation used for that column.`
        );
      }
    }

    return { passed, error: null, columnMatches, expected, got, rowMatches, feedback };
  } finally {
    db.close();
  }
}
