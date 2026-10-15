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
  },
  {
    "id": "sql-n01",
    "q": "Why is SQL described as a fourth-generation language (4GL)?",
    "options": [
      "You write step-by-step procedures describing exactly how the DBMS should locate each row on disk.",
      "It compiles directly into machine code, so every statement runs faster than any third-generation language.",
      "You describe what result you want and the DBMS decides how to retrieve it.",
      "It can only be run from inside an application written in a third-generation language such as C."
    ],
    "answer": 2,
    "explanation": "A 4GL is declarative: you state what you want, not how to get it. The procedural 'how' belongs to third-generation languages, and SQL is neither compiled to machine code by the user nor limited to embedding in 3GL programs."
  },
  {
    "id": "sql-n02",
    "q": "Which category of SQL commands does CREATE TABLE belong to?",
    "options": [
      "DDL (Data Definition Language)",
      "DML (Data Manipulation Language), because it adds a new object that will contain rows",
      "DQL (Data Query Language), because it asks the database to describe a structure",
      "DCL (Data Control Language), because it grants a user permission to own a table"
    ],
    "answer": 0,
    "explanation": "CREATE TABLE, ALTER TABLE and DROP TABLE create and restructure database objects, so they are DDL. DML works on the data inside objects, DQL queries data, and DCL controls access."
  },
  {
    "id": "sql-n03",
    "q": "Which category do INSERT, UPDATE and DELETE belong to?",
    "options": [
      "DDL, because each statement changes the structure of the table it is applied to",
      "DQL, because each statement retrieves rows from the database and presents them",
      "DCL, because each statement controls which users are permitted to change data",
      "DML, because each statement manipulates data within existing objects"
    ],
    "answer": 3,
    "explanation": "INSERT, UPDATE and DELETE manipulate the data held inside existing objects, which is the definition of DML. They do not change structure (DDL), return query results (DQL) or manage permissions (DCL)."
  },
  {
    "id": "sql-n04",
    "q": "Which description matches a multiple-row (aggregate) function in SQL?",
    "options": [
      "It acts on each row separately and returns one result per row, and it can be nested.",
      "It works on many rows and returns one result per group of rows.",
      "It returns a separate result for every column of the table it is applied to.",
      "It can only be used in the WHERE clause to compare one row against another."
    ],
    "answer": 1,
    "explanation": "Multiple-row (group or aggregate) functions such as COUNT, SUM and AVG work across many rows and give one result per group. The first option describes single-row functions."
  },
  {
    "id": "sql-n05",
    "q": "Which statement about SQL syntax rules is correct?",
    "options": [
      "Keywords and table or column names are case insensitive, and a semicolon ends a statement.",
      "Keywords may be abbreviated provided the abbreviation is unambiguous, and a statement ends at the first carriage return.",
      "Statements must be written on one line, because carriage returns and white space change the meaning of a statement.",
      "Keywords are case sensitive and must be capitalised, otherwise SQLite treats the statement as a syntax error."
    ],
    "answer": 0,
    "explanation": "SQL is case insensitive, ignores white space and carriage returns, does not allow keywords to be abbreviated or split across lines, and uses a semicolon to end a statement. Capitalising keywords is a readability habit, not a rule."
  },
  {
    "id": "sql-n06",
    "q": "Which DBMS is used for all SQL content and assessments in this course?",
    "options": [
      "PostgreSQL, a server-based object-relational DBMS",
      "Microsoft Access, a desktop DBMS with a graphical query builder",
      "SQLite, an open-source embedded relational DBMS",
      "Oracle Database, a commercial enterprise client-server DBMS"
    ],
    "answer": 2,
    "explanation": "The course runs everything in SQLite, an open-source, cross-platform, embedded relational DBMS, using the Employee test database."
  },
  {
    "id": "sql-n07",
    "q": "Which query returns every column and every row of the Department table?",
    "options": [
      "SELECT Department FROM *;",
      "SELECT * FROM Department;",
      "FROM Department SELECT *;",
      "SELECT COLUMNS(*) FROM Department;"
    ],
    "answer": 1,
    "explanation": "SELECT identifies which columns and FROM identifies which table, in that order. The asterisk selects all columns."
  },
  {
    "id": "sql-n08",
    "q": "What does SELECT DISTINCT departmentID FROM Employee return?",
    "options": [
      "One row per employee, with each department ID repeated as many times as it occurs",
      "Only the departments that have no employees assigned to them in the Employee table",
      "A single value giving the number of different departments in the Employee table",
      "Each department ID that appears in Employee, listed only once"
    ],
    "answer": 3,
    "explanation": "DISTINCT removes duplicate rows from the result, so each department that has employees assigned is listed once. It does not count them and it does not look for departments with no employees."
  },
  {
    "id": "sql-n09",
    "q": "What does SELECT employeeID, empName FROM Employee LIMIT 3; return?",
    "options": [
      "Only the first three rows of the result",
      "Only the rows where employeeID equals 3, with the name column included",
      "The three employees with the highest employeeID values, sorted in descending order",
      "Three columns of the Employee table, starting from the employeeID column"
    ],
    "answer": 0,
    "explanation": "LIMIT places an upper bound on the number of rows returned by the whole SELECT, so only the first three rows come back. It does not sort or filter on a value."
  },
  {
    "id": "sql-n10",
    "q": "When OFFSET is used with LIMIT, what does OFFSET define?",
    "options": [
      "The maximum number of rows that the whole SELECT statement may return",
      "The column by which the result set is sorted before any rows are returned",
      "The starting point from which LIMIT begins counting rows",
      "The number of duplicate rows to be removed before LIMIT is applied"
    ],
    "answer": 2,
    "explanation": "LIMIT sets the upper bound on rows, and the optional OFFSET defines the starting point for LIMIT, effectively skipping that many rows first."
  },
  {
    "id": "sql-n11",
    "q": "Where is the WHERE clause placed in a SELECT statement, and what does it do?",
    "options": [
      "Before SELECT, so that rows are removed before any columns are chosen",
      "After ORDER BY, so that only sorted rows are tested against the condition",
      "Immediately after SELECT, and before the table is named in the statement",
      "After FROM, restricting the rows that are returned"
    ],
    "answer": 3,
    "explanation": "WHERE follows FROM and evaluates a boolean condition for each input row. Only rows evaluating to TRUE are kept."
  },
  {
    "id": "sql-n12",
    "q": "A row's WHERE condition evaluates to NULL. What happens to that row?",
    "options": [
      "It is kept, because NULL is treated the same as TRUE",
      "It is excluded, in the same way as a row that evaluates to FALSE",
      "It is kept, but each of its column values is displayed as NULL",
      "The query stops with an error because the condition is undefined"
    ],
    "answer": 1,
    "explanation": "Only rows where the condition is TRUE are kept; rows evaluating to FALSE or NULL are excluded."
  },
  {
    "id": "sql-n13",
    "q": "Which condition returns employees whose salary is from 1250 to 1500, including both of those values?",
    "options": [
      "WHERE salary BETWEEN 1250 AND 1500",
      "WHERE salary > 1250 AND salary < 1500",
      "WHERE salary IN (1250, 1500)",
      "WHERE salary >= 1250 OR salary <= 1500"
    ],
    "answer": 0,
    "explanation": "BETWEEN is inclusive of both boundaries. IN matches only the listed values, the strict comparisons exclude the endpoints, and the OR version matches every row."
  },
  {
    "id": "sql-n14",
    "q": "What does WHERE empName LIKE '_a%' match?",
    "options": [
      "Names that start with a literal underscore followed by the letter a",
      "Names that begin with 'a' followed by any number of characters",
      "Names with 'a' as the second character",
      "Names that are exactly two characters long and end in 'a'"
    ],
    "answer": 2,
    "explanation": "The underscore matches exactly one character and % matches zero or many, so the pattern means any first character, 'a' second, then anything."
  },
  {
    "id": "sql-n15",
    "q": "In a LIKE pattern, what do the wildcards % and _ represent?",
    "options": [
      "% matches exactly one character and _ matches zero or many characters",
      "% matches zero or many characters and _ matches exactly one character",
      "% matches any single digit and _ matches any single letter",
      "% matches only an empty string and _ matches a single space"
    ],
    "answer": 1,
    "explanation": "% stands for zero or many characters and _ stands for exactly one character."
  },
  {
    "id": "sql-n16",
    "q": "Which condition correctly finds employees who have no commission?",
    "options": [
      "WHERE commission = NULL",
      "WHERE commission = 0 OR commission = ' '",
      "WHERE commission LIKE NULL",
      "WHERE commission IS NULL"
    ],
    "answer": 3,
    "explanation": "NULL is not equal to anything, including zero or a blank space, so it must be tested with IS NULL (or IS NOT NULL)."
  },
  {
    "id": "sql-n17",
    "q": "A column contains only NULL values. What do SUM(X) and TOTAL(X) return?",
    "options": [
      "SUM returns NULL and TOTAL returns 0.0",
      "Both return 0 because NULL values are treated as zero",
      "SUM returns 0 and TOTAL returns NULL because TOTAL preserves NULL",
      "Both raise an error because NULL cannot be aggregated"
    ],
    "answer": 0,
    "explanation": "SUM returns NULL when all values are NULL, while TOTAL always returns a floating-point number, so it returns 0.0."
  },
  {
    "id": "sql-n18",
    "q": "Which is the order of precedence for the operators in a WHERE clause?",
    "options": [
      "OR, then AND, then NOT, with comparison operators evaluated last",
      "AND, then OR, then NOT, with comparison operators evaluated first",
      "Comparison operators, then NOT, then AND, then OR",
      "NOT, then comparison operators, then OR, then AND"
    ],
    "answer": 2,
    "explanation": "Comparison operators come first, then NOT, then AND, then OR. Parentheses override this order."
  },
  {
    "id": "sql-n19",
    "q": "Which rows does WHERE jobDescription = 'clerk' OR jobDescription = 'salesman' AND salary > 2000 return?",
    "options": [
      "Clerks and salesmen, but only those whose salary is above 2000",
      "All clerks, plus only those salesmen who earn more than 2000",
      "Only clerks earning above 2000, plus all salesmen",
      "No rows, because OR and AND cannot appear in the same WHERE clause"
    ],
    "answer": 1,
    "explanation": "AND is evaluated before OR, so the condition is clerk OR (salesman AND salary > 2000). Parentheses would be needed to filter both jobs by salary."
  },
  {
    "id": "sql-n20",
    "q": "Which statement about arithmetic operator precedence is correct?",
    "options": [
      "Addition and subtraction take priority over multiplication and division.",
      "All operators have equal priority and are evaluated strictly right to left.",
      "Parentheses are ignored, so priority depends only on the order columns appear in the SELECT list.",
      "Multiplication, division and modulo take priority, and equal priorities are evaluated left to right."
    ],
    "answer": 3,
    "explanation": "*, / and % are evaluated before + and -, operators of equal priority run left to right, and parentheses force priority."
  },
  {
    "id": "sql-n21",
    "q": "KING has a NULL commission. What does SELECT 12*salary + commission return for KING?",
    "options": [
      "Twelve times KING's salary, because NULL is treated as zero",
      "An error, because NULL cannot be used in an arithmetic expression",
      "NULL, because any arithmetic expression containing NULL evaluates to NULL",
      "Zero, because the missing commission cancels out 12*salary"
    ],
    "answer": 2,
    "explanation": "Any arithmetic expression that includes a NULL evaluates to NULL, so the result is NULL unless the NULL is replaced, for example with IFNULL."
  },
  {
    "id": "sql-n22",
    "q": "Which function replaces a NULL commission with 0 so a calculation still gives a number?",
    "options": [
      "IFNULL(commission, 0)",
      "TYPEOF(commission, 0)",
      "NULLIF(commission, 0)",
      "REPLACE(commission, NULL, 0)"
    ],
    "answer": 0,
    "explanation": "IFNULL(X,Y) returns the first non-NULL argument. NULLIF does the opposite, returning NULL when the values match."
  },
  {
    "id": "sql-n23",
    "q": "What does a column alias do?",
    "options": [
      "It permanently renames the column in the underlying table",
      "It renames the column heading in the query result only",
      "It creates an index on the column to speed up the query",
      "It restricts the column so that it can only be used in calculations"
    ],
    "answer": 1,
    "explanation": "An alias renames the heading in the result and does not change the table. It is especially useful for calculated columns."
  },
  {
    "id": "sql-n24",
    "q": "Which statement correctly gives salary*12 the heading Annual Salary?",
    "options": [
      "SELECT salary*12 AS Annual Salary FROM Employee;",
      "SELECT salary*12 = \"Annual Salary\" FROM Employee;",
      "SELECT \"Annual Salary\" salary*12 FROM Employee;",
      "SELECT salary*12 \"Annual Salary\" FROM Employee;"
    ],
    "answer": 3,
    "explanation": "The alias follows the expression and must be quoted (or in []) when it contains spaces. AS is optional."
  },
  {
    "id": "sql-n25",
    "q": "What does SELECT empName || ' is a ' || jobDescription return for a clerk named SMITH?",
    "options": [
      "SMITH is a clerk",
      "SMITHis aclerk, because literal spaces are removed",
      "SMITH clerk, because literal text is discarded",
      "An error, because literals cannot appear in the SELECT list"
    ],
    "answer": 0,
    "explanation": "The || operator concatenates columns and literal strings into one expression, and the literal is printed once per row."
  },
  {
    "id": "sql-n26",
    "q": "If ORDER BY is used without ASC or DESC, how are the rows sorted?",
    "options": [
      "Descending order, so the highest value is listed first",
      "Ascending order, so the lowest value is listed first",
      "No order at all, because ASC or DESC must always be written",
      "Insertion order, because ORDER BY only breaks ties between rows"
    ],
    "answer": 1,
    "explanation": "ASC (ascending) is the default sort order."
  },
  {
    "id": "sql-n27",
    "q": "Where does ORDER BY appear in a SELECT statement?",
    "options": [
      "Directly after SELECT, before the list of columns",
      "Between FROM and WHERE, so rows are sorted before they are filtered",
      "At the end, just before LIMIT and OFFSET",
      "After LIMIT, so only the limited rows are sorted"
    ],
    "answer": 2,
    "explanation": "ORDER BY comes last in the SELECT statement, just before LIMIT and OFFSET if they are present."
  },
  {
    "id": "sql-n28",
    "q": "Which function returns the position of the first occurrence of Y in X, or 0 if it is not found?",
    "options": [
      "SUBSTR(X,Y,Z)",
      "REPLACE(X,Y,Z)",
      "LENGTH(X)",
      "INSTR(X,Y)"
    ],
    "answer": 3,
    "explanation": "INSTR(X,Y) returns the position of the first match, or 0 if there is none. LOWER is often nested inside it to match reliably."
  },
  {
    "id": "sql-n29",
    "q": "What does SELECT SUBSTR('University of Auckland', 4, 7); return?",
    "options": [
      "versity",
      "iversit",
      "Univers",
      "ersity "
    ],
    "answer": 0,
    "explanation": "SUBSTR(X,Y,Z) starts at the Y-th character and returns Z characters: starting at character 4 gives 'versity'."
  },
  {
    "id": "sql-n30",
    "q": "Which function is most useful for finding the number of days between two dates?",
    "options": [
      "DATETIME(X), because it returns the date and time together as a string",
      "STRFTIME('%Y', X), because it extracts the year of each date",
      "TIME(X), because it returns the time portion as HH:MM:SS",
      "JULIANDAY(X)"
    ],
    "answer": 3,
    "explanation": "JULIANDAY returns the Julian day number, so subtracting two values gives the difference in days (divide by 7 for weeks)."
  },
  {
    "id": "sql-n31",
    "q": "What is the difference between COUNT(*) and COUNT(commission)?",
    "options": [
      "They are identical, because COUNT always ignores NULL values",
      "COUNT(*) counts all rows, whereas COUNT(commission) counts only rows where commission is not NULL",
      "COUNT(*) counts only non-NULL rows, whereas COUNT(commission) counts every row in the table",
      "COUNT(*) sums the values in the table, whereas COUNT(commission) averages them"
    ],
    "answer": 1,
    "explanation": "COUNT(X) counts rows where X is not NULL, while COUNT(*) gives the total number of rows."
  }
];
