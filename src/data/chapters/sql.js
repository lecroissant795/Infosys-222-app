export const title = "SQL";

export const questions = [
  {
    "id": "sql-01",
    "q": "Which sublanguage of SQL includes statements such as CREATE, ALTER, DROP, and TRUNCATE?",
    "options": [
      "Data Definition Language (DDL)",
      "Data Manipulation Language (DML)",
      "Data Control Language (DCL)",
      "Transaction Control Language (TCL)"
    ],
    "answer": 0,
    "explanation": "DDL (Data Definition Language) defines and manages database schema objects. It includes commands such as CREATE, ALTER, DROP, and TRUNCATE."
  },
  {
    "id": "sql-02",
    "q": "What is the key difference between the DELETE statement and the TRUNCATE statement in SQL?",
    "options": [
      "DELETE is a DDL command that resets identity sequences, while TRUNCATE is a DML command that logs changes row-by-row.",
      "DELETE can filter rows using WHERE and logs each row; TRUNCATE is a DDL operation that removes all rows quickly.",
      "DELETE permanently removes table structure definitions, whereas TRUNCATE merely clears index metadata.",
      "TRUNCATE can be targeted at specific table columns, whereas DELETE always purges entire table records."
    ],
    "answer": 1,
    "explanation": "DELETE is a DML command that removes rows one-by-one with full row-level logging and supports a WHERE clause. TRUNCATE is a DDL command that deallocates data pages quickly, removing all rows without a WHERE clause."
  },
  {
    "id": "sql-03",
    "q": "What is the result of evaluating the condition 'WHERE bonus = NULL' in standard SQL?",
    "options": [
      "It returns rows where bonus has a value of 0.",
      "It returns rows where bonus contains an empty string.",
      "It evaluates to UNKNOWN for every row, returning zero rows.",
      "It raises a fatal syntax error at query compile time."
    ],
    "answer": 2,
    "explanation": "Under SQL's three-valued logic (TRUE, FALSE, UNKNOWN), any comparison using equality '=' against NULL yields UNKNOWN. To check for NULL values, 'IS NULL' or 'IS NOT NULL' must be used."
  },
  {
    "id": "sql-04",
    "q": "Which SQL clause is used to eliminate duplicate rows from the query output?",
    "options": [
      "UNIQUE ROW",
      "FILTER DUPES",
      "GROUP ALL",
      "DISTINCT"
    ],
    "answer": 3,
    "explanation": "The DISTINCT keyword (e.g. SELECT DISTINCT country FROM customers) filters the result set to include only unique rows."
  },
  {
    "id": "sql-05",
    "q": "What does the SQL condition 'salary BETWEEN 50000 AND 80000' evaluate to?",
    "options": [
      "salary >= 50000 AND salary <= 80000 (inclusive of both boundaries)",
      "salary > 50000 AND salary < 80000 (exclusive of both boundaries)",
      "salary = 50000 OR salary = 80000 (matching only the exact endpoints)",
      "salary > 50000 AND salary <= 80000 (exclusive of lower bound only)"
    ],
    "answer": 0,
    "explanation": "In SQL, the BETWEEN operator is inclusive of both boundary values (equivalent to salary >= 50000 AND salary <= 80000)."
  },
  {
    "id": "sql-06",
    "q": "In a LIKE pattern search, which wildcard character matches exactly one single character?",
    "options": [
      "The percent sign (%)",
      "The underscore (_)",
      "The question mark (?)",
      "The asterisk (*)"
    ],
    "answer": 1,
    "explanation": "In SQL LIKE clauses, the underscore '_' matches exactly one character, while the percent sign '%' matches zero or more characters."
  },
  {
    "id": "sql-07",
    "q": "Consider: SELECT dept_id, AVG(salary) FROM employees WHERE salary > 40000 GROUP BY dept_id HAVING AVG(salary) > 70000. Which clause filters rows BEFORE aggregation?",
    "options": [
      "The HAVING clause",
      "The GROUP BY clause",
      "The WHERE clause",
      "The SELECT clause"
    ],
    "answer": 2,
    "explanation": "The WHERE clause filters individual records before any grouping or aggregation takes place. The HAVING clause filters grouped records after aggregation."
  },
  {
    "id": "sql-08",
    "q": "How does the aggregate function COUNT(*) differ from COUNT(commission_pct)?",
    "options": [
      "COUNT(*) is strictly non-standard SQL syntax; COUNT(column) is ANSI compliant across all engines.",
      "COUNT(*) counts only unique non-null rows; COUNT(column) counts all duplicate occurrences.",
      "COUNT(*) counts only rows where numeric fields are non-zero; COUNT(column) counts all strings.",
      "COUNT(*) counts all returned rows including NULLs; COUNT(column) ignores NULLs in that column."
    ],
    "answer": 3,
    "explanation": "COUNT(*) counts the total number of rows in the result set regardless of NULL values, whereas COUNT(column_name) counts only rows where column_name IS NOT NULL."
  },
  {
    "id": "sql-09",
    "q": "Which type of JOIN returns all records from the left table, and matched records from the right table with NULLs for unmatched right rows?",
    "options": [
      "LEFT OUTER JOIN",
      "INNER JOIN",
      "FULL OUTER JOIN",
      "CROSS JOIN"
    ],
    "answer": 0,
    "explanation": "A LEFT OUTER JOIN returns all rows from the left table. If there is no corresponding match in the right table, NULL values are filled in for the right table columns."
  },
  {
    "id": "sql-10",
    "q": "If Table A contains 10 rows and Table B contains 20 rows, how many rows will be returned by a CROSS JOIN between Table A and Table B?",
    "options": [
      "10 rows (limited by the smaller table)",
      "200 rows (the Cartesian product)",
      "30 rows (the arithmetic sum of both)",
      "20 rows (limited by the larger table)"
    ],
    "answer": 1,
    "explanation": "A CROSS JOIN produces the Cartesian product of two tables, matching every row of Table A with every row of Table B: 10 * 20 = 200 rows."
  },
  {
    "id": "sql-11",
    "q": "Which query correctly identifies customers who have NEVER placed an order?",
    "options": [
      "SELECT c.id FROM Customers c INNER JOIN Orders o ON c.id = o.customer_id WHERE o.id IS NULL;",
      "SELECT c.id FROM Customers c RIGHT JOIN Orders o ON c.id = o.customer_id WHERE c.id IS NULL;",
      "SELECT c.id FROM Customers c LEFT JOIN Orders o ON c.id = o.customer_id WHERE o.id IS NULL;",
      "SELECT c.id FROM Customers c CROSS JOIN Orders o WHERE c.id = o.customer_id AND o.id = 0;"
    ],
    "answer": 2,
    "explanation": "A LEFT JOIN with a WHERE clause checking that the right table's primary key IS NULL effectively finds unmatched left-table records (anti-join pattern)."
  },
  {
    "id": "sql-12",
    "q": "What is the difference between UNION and UNION ALL in SQL?",
    "options": [
      "UNION requires identical table structures; UNION ALL allows mismatched column quantities.",
      "UNION sorts output rows in descending order; UNION ALL preserves original table disk order.",
      "UNION can only combine columns; UNION ALL can only combine partitioned table partitions.",
      "UNION removes duplicate rows from the output; UNION ALL retains all duplicate rows."
    ],
    "answer": 3,
    "explanation": "UNION combines the results of two queries and eliminates duplicate rows (involving an internal sort/hash), whereas UNION ALL retains duplicates and executes faster."
  },
  {
    "id": "sql-13",
    "q": "What are the structural requirements for two queries combined with UNION, INTERSECT, or EXCEPT?",
    "options": [
      "Both queries must select the same number of columns with compatible data types in order.",
      "Both queries must reference the exact same underlying physical base table.",
      "Both queries must define identical column aliases and index cluster orders.",
      "Both queries must contain an embedded ORDER BY clause inside each individual subquery."
    ],
    "answer": 0,
    "explanation": "Set operations in SQL require that each component query produces the same number of columns and that corresponding columns have compatible data types."
  },
  {
    "id": "sql-14",
    "q": "What is a correlated subquery in SQL?",
    "options": [
      "A subquery that executes once independently and caches its entire result table into buffer memory.",
      "A subquery referencing outer query columns, evaluated once for each outer row candidate.",
      "A subquery that joins more than five tables simultaneously to improve execution performance.",
      "A subquery that defines temporary schema views that persist after database sessions disconnect."
    ],
    "answer": 1,
    "explanation": "A correlated subquery references columns from the outer query; because of this dependency, the subquery cannot be executed independently and is re-evaluated for each row considered by the outer query."
  },
  {
    "id": "sql-15",
    "q": "Which operator checks for the existence of rows returned by a subquery and short-circuits as soon as a single match is located?",
    "options": [
      "The IN operator",
      "The LIKE operator",
      "The EXISTS operator",
      "The ANY operator"
    ],
    "answer": 2,
    "explanation": "The EXISTS operator evaluates to TRUE as soon as the inner subquery returns at least one row, allowing the query engine to stop scanning (short-circuit optimization)."
  },
  {
    "id": "sql-16",
    "q": "What does the SQL COALESCE function return?",
    "options": [
      "The total count of non-null arguments.",
      "The statistical median of all numeric arguments.",
      "A boolean true if all supplied parameters are null.",
      "The first non-null expression in its argument list."
    ],
    "answer": 3,
    "explanation": "COALESCE(val1, val2, ..., valN) evaluates its arguments in order and returns the first non-null value encountered, or NULL if all arguments evaluate to NULL."
  },
  {
    "id": "sql-17",
    "q": "In an SQL query containing GROUP BY, which columns are permitted in the SELECT list?",
    "options": [
      "Only columns that appear in the GROUP BY clause or are wrapped in aggregate functions.",
      "Any column from the queried tables regardless of whether it is grouped or aggregated.",
      "Only columns that possess unique index constraints or are foreign keys to other tables.",
      "Any column with integer data types, while string columns must be omitted from grouping."
    ],
    "answer": 0,
    "explanation": "In standard SQL, every column in the SELECT list of a grouped query must either appear in the GROUP BY clause or be an argument to an aggregate function (e.g. SUM, COUNT)."
  },
  {
    "id": "sql-18",
    "q": "What does ALTER TABLE Students ADD CONSTRAINT chk_age CHECK (age >= 18); accomplish?",
    "options": [
      "It automatically updates all existing student records below 18 to 18.",
      "It rejects insertions or updates where age is less than 18.",
      "It drops all student records currently stored where age is under 18.",
      "It creates an index on age to improve range filter execution performance."
    ],
    "answer": 1,
    "explanation": "A CHECK constraint enforces a domain integrity condition; future INSERT and UPDATE operations that violate 'age >= 18' will be rejected by the DBMS."
  },
  {
    "id": "sql-19",
    "q": "What does a Self-Join refer to in SQL query writing?",
    "options": [
      "A query that joins a virtual view to its underlying base table for index optimisation.",
      "Joining two unrelated tables that share identical column names and primary key types.",
      "Joining a table to itself using distinct aliases to compare rows within that table.",
      "An automated join executed by the DBMS optimizer without an explicit ON condition."
    ],
    "answer": 2,
    "explanation": "A self-join is a regular join in which a table is joined with itself (using two different aliases, e.g. e1 and e2) to compare rows within the same table (such as employees and their managers)."
  },
  {
    "id": "sql-20",
    "q": "What is a major operational danger of using NATURAL JOIN in production code?",
    "options": [
      "It automatically converts null values to zeros without generating warning logs.",
      "It strictly forbids using WHERE clauses or aggregate grouping within the same query.",
      "It causes the query optimizer to disable all index seeks across both joined relations.",
      "Schema changes adding same-named columns can unintentionally alter join conditions."
    ],
    "answer": 3,
    "explanation": "NATURAL JOIN implicitly joins on all columns having matching names in both tables. If a column with a shared name is later added to either table, the join criteria change unintentionally, potentially breaking applications."
  },
  {
    "id": "sql-21",
    "q": "Which SQL constraint ensures that all values in a column are distinct and allows at most one NULL value (in most RDBMSs)?",
    "options": [
      "The UNIQUE constraint",
      "The FOREIGN KEY constraint",
      "The CHECK constraint",
      "The DEFAULT constraint"
    ],
    "answer": 0,
    "explanation": "The UNIQUE constraint ensures that all non-null values in a column are distinct, preventing duplicate entries."
  },
  {
    "id": "sql-22",
    "q": "What is the function of NULLIF(expr1, expr2) in SQL?",
    "options": [
      "Replaces NULL with expr2 whenever expr1 is missing.",
      "Returns NULL if expr1 equals expr2; otherwise returns expr1.",
      "Returns boolean TRUE whenever both expr1 and expr2 are NULL.",
      "Sets the target database column to NULL if it exceeds expr2."
    ],
    "answer": 1,
    "explanation": "NULLIF(expr1, expr2) compares two expressions: if expr1 = expr2, it returns NULL; otherwise, it returns expr1. This is commonly used to prevent division by zero (e.g. total / NULLIF(qty, 0))."
  },
  {
    "id": "sql-23",
    "q": "How does the EXCEPT (or MINUS) operator operate in SQL?",
    "options": [
      "It returns only rows that appear in both the first and second queries.",
      "It returns all rows from both queries except rows containing NULL column values.",
      "It returns distinct rows from the first query that do not appear in the second query.",
      "It permanently deletes matching records from the underlying target database tables."
    ],
    "answer": 2,
    "explanation": "EXCEPT (known as MINUS in Oracle) returns distinct rows from the first query that do not exist in the output of the second query."
  },
  {
    "id": "sql-24",
    "q": "What occurs if 'WHERE id NOT IN (SELECT manager_id FROM departments)' encounters a NULL in the subquery?",
    "options": [
      "The query automatically ignores the NULL and filters using the valid IDs.",
      "A fatal runtime exception is thrown, aborting the active client transaction immediately.",
      "The database management system replaces NULL with zero and returns all matching rows.",
      "The condition evaluates to UNKNOWN for all rows, returning an empty result set."
    ],
    "answer": 3,
    "explanation": "Because 'x NOT IN (a, b, NULL)' expands to 'x != a AND x != b AND x != NULL', and 'x != NULL' is UNKNOWN, the entire conjunction evaluates to UNKNOWN (or FALSE), returning zero rows. Using NOT EXISTS avoids this pitfall."
  },
  {
    "id": "sql-25",
    "q": "Which SQL command is used to remove previously granted access privileges from a user?",
    "options": [
      "REVOKE",
      "DENY PRIVILEGE",
      "DROP PERMISSION",
      "REMOVE ACCESS"
    ],
    "answer": 0,
    "explanation": "REVOKE is a Data Control Language (DCL) command used to remove user permissions (e.g. REVOKE SELECT ON Customers FROM user_alice)."
  },
  {
    "id": "sql-26",
    "q": "What is the primary characteristic of an SQL View?",
    "options": [
      "It physically duplicates base table storage on isolated disks for faster reads.",
      "It is a virtual table defined by a stored query, without duplicate data storage.",
      "It is a temporary staging table that drops automatically upon session disconnect.",
      "It disables foreign key integrity checks on underlying tables during updates."
    ],
    "answer": 1,
    "explanation": "A view is a stored SELECT statement that dynamically presents data from one or more base tables without storing separate physical copies of that data."
  },
  {
    "id": "sql-27",
    "q": "What does the SQL clause 'ORDER BY score DESC, student_name ASC' do?",
    "options": [
      "Sorts names alphabetically first, then sorts tied names by highest score.",
      "Sorts lowest to highest score; ties sorted reverse-alphabetically Z to A by name.",
      "Sorts highest to lowest score; ties sorted alphabetically A to Z by name.",
      "Sorts scores descending, but ignores student_name unless scores are null."
    ],
    "answer": 2,
    "explanation": "The ORDER BY clause evaluates columns from left to right: it first sorts by score in descending order (highest to lowest), and breaks ties by sorting student_name ascending (A to Z)."
  },
  {
    "id": "sql-28",
    "q": "What does the SQL command 'ROLLBACK' do in Transaction Control Language (TCL)?",
    "options": [
      "Permanently commits all pending database changes to non-volatile disk files.",
      "Reverts table permissions granted during the current administrative session.",
      "Restores database schema definitions to the previous night's scheduled snapshot.",
      "Reverses all database modifications made within the current uncommitted transaction."
    ],
    "answer": 3,
    "explanation": "ROLLBACK undoes all data modifications executed since the start of the current transaction or up to a designated SAVEPOINT, preserving database consistency."
  },
  {
    "id": "sql-29",
    "q": "Which query correctly finds departments with more than 5 employees?",
    "options": [
      "SELECT dept_id, COUNT(*) FROM emp GROUP BY dept_id HAVING COUNT(*) > 5;",
      "SELECT dept_id, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept_id;",
      "SELECT dept_id, COUNT(*) FROM emp HAVING dept_id > 5 GROUP BY dept_id;",
      "SELECT dept_id, COUNT(*) FROM emp GROUP BY dept_id WHERE COUNT(*) > 5;"
    ],
    "answer": 0,
    "explanation": "Aggregate functions cannot appear in the WHERE clause; conditions filtering groups based on aggregate results (e.g. COUNT(*) > 5) must be placed in the HAVING clause."
  },
  {
    "id": "sql-30",
    "q": "In PostgreSQL or MySQL, what does the 'LIMIT 10 OFFSET 20' clause do?",
    "options": [
      "Skips the first 10 rows and returns the next 20 rows.",
      "Skips the first 20 rows and returns the next 10 rows.",
      "Limits query execution time to 10 ms with 20 retries.",
      "Retrieves rows with primary key values between 10 and 20."
    ],
    "answer": 1,
    "explanation": "OFFSET 20 specifies that the first 20 rows of the ordered result set are skipped, and LIMIT 10 specifies that up to 10 subsequent rows are returned."
  }
];
