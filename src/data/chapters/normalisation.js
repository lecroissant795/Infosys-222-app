export const title = "Normalisation";

export const questions = [
  {
    "id": "norm-01",
    "q": "What is the primary objective of normalisation in relational database design?",
    "options": [
      "To minimise data redundancy and eliminate update, insertion, and deletion anomalies.",
      "To optimize high-throughput analytical aggregate queries by adding redundant summary columns.",
      "To compress physical disk block allocations using proprietary binary encoding schemes.",
      "To enforce strict referential constraints by ensuring every table references at least three foreign keys."
    ],
    "answer": 0,
    "explanation": "Normalisation structures a relational database to reduce redundant data storage and eliminate modification anomalies (insert, update, delete) while preserving data integrity."
  },
  {
    "id": "norm-02",
    "q": "What is an insertion anomaly in an unnormalised relation?",
    "options": [
      "A database constraint violation triggered when attempting to store multiple identical primary key values.",
      "The inability to record information about an entity without also entering details of an unrelated entity.",
      "A storage engine error caused by inserting records when available log file capacity is fully exhausted.",
      "A condition where inserting a new row automatically forces a cascading delete across child tables."
    ],
    "answer": 1,
    "explanation": "An insertion anomaly occurs when certain facts cannot be recorded in the database without adding unrelated data (e.g. inability to add a new department until at least one employee is hired into it)."
  },
  {
    "id": "norm-03",
    "q": "What is a deletion anomaly?",
    "options": [
      "The refusal of the database management system to execute a drop table statement with active foreign keys.",
      "A transaction deadlock occurring when multiple concurrent processes delete the same indexed page.",
      "The unintentional loss of desirable independent data when deleting a record containing unrelated information.",
      "The automatic purging of historical audit log records whenever parent entity rows are permanently removed."
    ],
    "answer": 2,
    "explanation": "A deletion anomaly occurs when deleting one set of facts inadvertently deletes other unrelated and valuable information (e.g. deleting the last employee in a department also loses all record of the department's existence)."
  },
  {
    "id": "norm-04",
    "q": "What is an update (or modification) anomaly?",
    "options": [
      "A failure that occurs when two transactions attempt to update disparate columns of the same row simultaneously.",
      "A query timeout triggered by attempting to update non-indexed foreign key attributes in large tables.",
      "An unexpected schema modification resulting from executing uncommitted data definition language statements.",
      "Inconsistent data states caused by redundant copies when an update is made in some rows but missed in others."
    ],
    "answer": 3,
    "explanation": "An update anomaly happens when redundant data stored across multiple tuples is updated in some tuples but not others, creating data inconsistency within the database."
  },
  {
    "id": "norm-05",
    "q": "In the functional dependency X → Y, what is X referred to as?",
    "options": [
      "The determinant",
      "The dependent attribute set",
      "The surrogate foreign reference",
      "The candidate relation identifier"
    ],
    "answer": 0,
    "explanation": "In the functional dependency X → Y, X is called the determinant because its values uniquely determine the values of Y (the dependent)."
  },
  {
    "id": "norm-06",
    "q": "Which of the following represents a trivial functional dependency?",
    "options": [
      "{StudentID, CourseID} → FinalGrade",
      "{StudentID, CourseID} → StudentID",
      "CourseID → InstructorOfficeNumber",
      "DepartmentID → TotalDepartmentBudget"
    ],
    "answer": 1,
    "explanation": "A functional dependency X → Y is trivial if Y is a subset of X (Y ⊆ X). Since StudentID is an element of {StudentID, CourseID}, the dependency is trivial and holds automatically."
  },
  {
    "id": "norm-07",
    "q": "What constitutes a full functional dependency in a relation?",
    "options": [
      "A dependency where the determinant contains every single attribute declared within the relation schema.",
      "A dependency where every non-prime attribute determines all candidate keys in the entire relation.",
      "A dependency X → Y where removing any attribute from X causes the dependency to no longer hold.",
      "A dependency that remains strictly preserved across all decomposed tables without executing any joins."
    ],
    "answer": 2,
    "explanation": "Y is fully functionally dependent on X if X → Y holds and no proper subset of X functionally determines Y. If any attribute can be removed from X while the dependency remains, it is a partial dependency."
  },
  {
    "id": "norm-08",
    "q": "What is a partial functional dependency?",
    "options": [
      "A functional dependency that holds for some tuples in a table but is violated by others with null values.",
      "A foreign key attribute references only a portion of a composite primary key in the parent relation.",
      "A candidate key attribute is functionally determined by a non-prime attribute within the same table.",
      "A non-prime attribute depends on only a proper subset of a composite candidate key."
    ],
    "answer": 3,
    "explanation": "A partial dependency occurs when a non-prime attribute is functionally determined by part of a composite candidate key rather than the entire candidate key."
  },
  {
    "id": "norm-09",
    "q": "What defines a transitive functional dependency?",
    "options": [
      "X → Y and Y → Z, where X is a candidate key and Y and Z are non-prime attributes.",
      "X → Y and Y → X, where both X and Y independently serve as composite superkeys.",
      "A dependency where a composite key references attributes across two completely unrelated relations.",
      "A dependency that shifts dynamically whenever new records are inserted by concurrent users."
    ],
    "answer": 0,
    "explanation": "A transitive dependency exists when a non-prime attribute Z depends on a candidate key X via another non-prime attribute Y (i.e. X → Y and Y → Z, with Y not determining X)."
  },
  {
    "id": "norm-10",
    "q": "What is a prime attribute in relational schema design?",
    "options": [
      "An attribute assigned an auto-incrementing integer data type.",
      "An attribute that is a member of at least one candidate key.",
      "An attribute containing uniquely non-repeating positive prime numbers.",
      "An attribute explicitly designated to store encrypted passwords."
    ],
    "answer": 1,
    "explanation": "A prime attribute (or key attribute) is any attribute that forms part of any candidate key for that relation. An attribute not participating in any candidate key is non-prime."
  },
  {
    "id": "norm-11",
    "q": "What is required for a relation to satisfy First Normal Form (1NF)?",
    "options": [
      "Every non-prime column must have a foreign key constraint referencing an external master table.",
      "All candidate keys must be composed of exactly one single attribute without composites.",
      "All attribute values must be atomic, with no repeating groups, arrays, or nested sets.",
      "Every determinant in the relation must be verified as a superkey across the entire database."
    ],
    "answer": 2,
    "explanation": "A relation is in 1NF if all domain values are atomic (indivisible) scalars, meaning no cell contains sets, lists, arrays, or repeating groups."
  },
  {
    "id": "norm-12",
    "q": "If a relation is in 1NF and its candidate key consists of a single attribute, which statement is true?",
    "options": [
      "It violates 2NF whenever it contains more than three non-prime descriptive attributes.",
      "It is automatically in BCNF because transitive dependencies are impossible with single-column keys.",
      "It must be decomposed into at least two distinct tables before reaching second normal form.",
      "It is automatically in 2NF because partial dependencies cannot exist on a single-attribute key."
    ],
    "answer": 3,
    "explanation": "2NF requires eliminating partial dependencies (dependencies on a proper subset of a composite candidate key). Since a single-attribute key has no proper non-empty subsets, partial dependencies cannot exist, guaranteeing 2NF."
  },
  {
    "id": "norm-13",
    "q": "What condition must be met for a relation to be in Second Normal Form (2NF)?",
    "options": [
      "It is in 1NF and has no partial dependencies (every non-prime attribute depends on the full key).",
      "It is in 1NF and contains no transitive dependencies between any pair of non-prime attributes.",
      "Every determinant in every non-trivial functional dependency must be an established candidate key.",
      "All foreign key references must be indexed and enforced with cascade delete actions."
    ],
    "answer": 0,
    "explanation": "A relation is in 2NF if it is in 1NF and no non-prime attribute is partially dependent on any candidate key of the relation."
  },
  {
    "id": "norm-14",
    "q": "Consider Enrollments(StudentID, CourseID, Grade, CourseFee) with primary key {StudentID, CourseID}. If CourseID → CourseFee, which normal form is violated?",
    "options": [
      "1NF, because CourseFee contains multiple non-atomic monetary denominations.",
      "2NF, because CourseFee depends on only part of the composite primary key.",
      "3NF, because Grade and CourseFee exhibit a transitive dependency relationship.",
      "BCNF only, because the composite key is already fully normalised through 3NF."
    ],
    "answer": 1,
    "explanation": "CourseFee is a non-prime attribute that depends solely on CourseID, which is a proper subset of the composite candidate key {StudentID, CourseID}. This is a partial dependency, violating 2NF."
  },
  {
    "id": "norm-15",
    "q": "What condition must be satisfied for a relation to be in Third Normal Form (3NF)?",
    "options": [
      "Every attribute in the table must participate directly as a component of the primary key.",
      "All candidate keys must be reduced to single-column artificial surrogate identifiers.",
      "It is in 2NF and contains no transitive dependencies for non-prime attributes on the primary key.",
      "It must be decomposed until every resulting relation has a degree of exactly two columns."
    ],
    "answer": 2,
    "explanation": "A relation is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on any candidate key (i.e. no non-key attribute determines another non-key attribute)."
  },
  {
    "id": "norm-16",
    "q": "According to the formal definition of 3NF, for every non-trivial functional dependency X → Y:",
    "options": [
      "X must be a foreign key and Y must be an indexed primary key in another table.",
      "X must be declared with a unique constraint and Y must allow null values.",
      "X and Y must both be composite attributes derived from a common parent relation.",
      "Either X is a superkey, or Y is a prime attribute."
    ],
    "answer": 3,
    "explanation": "The formal definition of 3NF states that for every non-trivial FD X → Y, at least one of the following must hold: (1) X is a superkey, or (2) Y is a prime attribute (part of some candidate key)."
  },
  {
    "id": "norm-17",
    "q": "Given Employee(EmpID, Name, DeptID, DeptName) with primary key EmpID, and dependencies EmpID → DeptID and DeptID → DeptName, which normal form is violated?",
    "options": [
      "3NF, because DeptName transitively depends on EmpID through the non-key attribute DeptID.",
      "2NF, because DeptID is only a partial identifier of individual working employees.",
      "1NF, because DeptName constitutes a repeating multi-valued group of department descriptions.",
      "BCNF only, because the table satisfies 3NF under the prime attribute exception rule."
    ],
    "answer": 0,
    "explanation": "Because EmpID is a single attribute key, it is in 2NF. However, DeptName (non-prime) is functionally dependent on DeptID (non-prime), which in turn depends on EmpID. This transitive dependency violates 3NF."
  },
  {
    "id": "norm-18",
    "q": "How does Boyce-Codd Normal Form (BCNF) differ from Third Normal Form (3NF)?",
    "options": [
      "BCNF allows non-atomic repeating groups provided that every non-key column is fully indexed.",
      "In BCNF, every determinant X of a non-trivial dependency X → Y must be a superkey, without exception.",
      "BCNF relaxes 3NF constraints by permitting non-superkey determinants when candidate keys overlap.",
      "3NF strictly prohibits null values, whereas BCNF permits nulls in composite primary keys."
    ],
    "answer": 1,
    "explanation": "In BCNF, every determinant X in any non-trivial functional dependency X → Y must be a superkey. Unlike 3NF, BCNF does not allow non-superkey determinants even if Y is a prime attribute."
  },
  {
    "id": "norm-19",
    "q": "Under what specific condition can a relation be in 3NF but violate BCNF?",
    "options": [
      "When the relation contains no foreign keys and has a degree strictly greater than four.",
      "When the primary key consists of a single attribute and all non-prime columns are nullable.",
      "When the relation has multiple overlapping candidate keys and an FD has a non-superkey determinant.",
      "When all candidate keys are disjoint and contain no shared attributes across any dependencies."
    ],
    "answer": 2,
    "explanation": "A relation in 3NF can only violate BCNF if there are multiple candidate keys that overlap (share at least one attribute), and a non-superkey determinant determines an attribute belonging to another candidate key."
  },
  {
    "id": "norm-20",
    "q": "What defines a lossless-join decomposition of relation R into R1 and R2?",
    "options": [
      "No disk storage blocks are deallocated during the table normalization restructuring process.",
      "The decomposed relations can be joined without requiring any primary key or foreign key indexes.",
      "All functional dependencies from relation R are guaranteed to be verifiable within R1 alone.",
      "Natural join of R1 and R2 produces exactly the original relation R with no spurious tuples."
    ],
    "answer": 3,
    "explanation": "Lossless-join guarantees that when relations R1 and R2 are rejoined (R1 ⨝ R2), the result matches the original relation R exactly, without losing records or generating invalid spurious (false) tuples."
  },
  {
    "id": "norm-21",
    "q": "Which condition guarantees that decomposing relation R into R1 and R2 is lossless?",
    "options": [
      "The intersection (R1 ∩ R2) must be a superkey for R1 or a superkey for R2.",
      "The attribute sets of R1 and R2 must be completely mutually exclusive and disjoint.",
      "Both R1 and R2 must contain identical cardinalities and matching tuple counts.",
      "Every attribute in (R1 ∩ R2) must be declared with an explicit check constraint."
    ],
    "answer": 0,
    "explanation": "A binary decomposition is lossless if and only if the common attribute set (R1 ∩ R2) forms a superkey for at least one of the decomposed relations (R1 ∩ R2 → R1 or R1 ∩ R2 → R2)."
  },
  {
    "id": "norm-22",
    "q": "What does dependency preservation mean in relational decomposition?",
    "options": [
      "Database foreign key constraints cannot be removed or altered by application updates.",
      "Every original dependency can be enforced within an individual decomposed table without joins.",
      "The primary keys of all decomposed relations remain identical to the original primary key.",
      "All historical database transaction records are retained in an immutable log repository."
    ],
    "answer": 1,
    "explanation": "Dependency preservation means that all functional dependencies in the original relation can be validated using individual decomposed relations directly, without requiring expensive join operations across tables."
  },
  {
    "id": "norm-23",
    "q": "Can every relation always be decomposed into BCNF while achieving both lossless join and dependency preservation?",
    "options": [
      "Yes, BCNF algorithms always guarantee both lossless joins and complete dependency preservation.",
      "No; BCNF decomposition guarantees dependency preservation, but frequently generates spurious tuples on joins.",
      "No; while a lossless decomposition into BCNF is always possible, dependency preservation cannot always be guaranteed.",
      "Yes, provided that the initial schema contains only composite candidate keys with no text fields."
    ],
    "answer": 2,
    "explanation": "A lossless decomposition into 3NF that preserves all functional dependencies is always achievable. In contrast, while BCNF decomposition is always lossless, it may not be possible to preserve all functional dependencies."
  },
  {
    "id": "norm-24",
    "q": "What is denormalisation in database engineering?",
    "options": [
      "A database corruption anomaly caused by uncommitted concurrent update operations.",
      "Removing unique constraints from primary key columns to permit duplicate transaction entries.",
      "The systematic process of converting complex relational tables into unstructured document graphs.",
      "The deliberate introduction of redundancy into a normalised schema to reduce expensive joins and boost read speed."
    ],
    "answer": 3,
    "explanation": "Denormalisation is the strategic decision to combine normalised tables or reintroduce redundancy to speed up critical read-heavy queries by reducing the overhead of multi-table joins."
  },
  {
    "id": "norm-25",
    "q": "What is the primary operational trade-off introduced by denormalisation?",
    "options": [
      "It speeds up read operations, but slows updates and increases the risk of data inconsistency.",
      "It reduces total disk storage usage, but limits the maximum number of concurrent client connections.",
      "It completely eliminates query syntax errors, but requires upgrading server hardware processors.",
      "It guarantees ACID transaction atomicity, but invalidates foreign key referential relationships."
    ],
    "answer": 0,
    "explanation": "Denormalisation trades off data consistency and write/update performance for read performance: applications must maintain redundant copies, increasing storage and modification complexity."
  },
  {
    "id": "norm-26",
    "q": "Given R(A, B, C, D) with candidate key {A, B} and dependencies {A, B} → C, {A, B} → D, and C → D, what normal form is R in?",
    "options": [
      "1NF (violates 2NF due to a partial dependency)",
      "2NF (violates 3NF due to a transitive dependency between non-prime attributes)",
      "3NF (violates BCNF due to overlapping candidate keys)",
      "BCNF (satisfies all normal form requirements up to 4NF)"
    ],
    "answer": 1,
    "explanation": "The candidate key is {A, B}. All non-prime attributes (C and D) depend on the full key {A, B}, so there are no partial dependencies (it is in 2NF). However, C → D is a transitive dependency between non-prime attributes, so it violates 3NF."
  },
  {
    "id": "norm-27",
    "q": "Which of Armstrong's axioms states that if X → Y and Y → Z, then X → Z?",
    "options": [
      "Reflexivity rule",
      "Augmentation rule",
      "Transitivity rule",
      "Decomposition rule"
    ],
    "answer": 2,
    "explanation": "The Transitivity rule in Armstrong's Axioms states that if X determines Y and Y determines Z, then X functionally determines Z."
  },
  {
    "id": "norm-28",
    "q": "According to Armstrong's reflexivity axiom, if Y is a subset of X (Y ⊆ X), which statement holds?",
    "options": [
      "The dependency is strictly non-trivial and requires 2NF decomposition.",
      "Y → X must hold across all valid database instances.",
      "X and Y are both guaranteed to be candidate keys.",
      "X → Y holds unconditionally as a trivial dependency."
    ],
    "answer": 3,
    "explanation": "The Reflexivity axiom states that if Y ⊆ X, then X → Y (this is also the definition of a trivial functional dependency)."
  },
  {
    "id": "norm-29",
    "q": "What is the closure of an attribute set X (denoted X⁺)?",
    "options": [
      "The set of all attributes functionally determined by X under given FDs.",
      "The set of candidate keys that share at least one attribute with X.",
      "The total count of distinct non-null values stored within column X.",
      "The collection of foreign keys that reference attribute set X in other tables."
    ],
    "answer": 0,
    "explanation": "The attribute closure X⁺ is the set of all attributes that can be functionally derived from X using Armstrong's axioms on the given set of functional dependencies."
  },
  {
    "id": "norm-30",
    "q": "How can you determine whether an attribute set X is a superkey for relation R(A, B, C, D)?",
    "options": [
      "Verify that X contains at least three distinct attributes.",
      "Compute X⁺ and confirm that it contains all attributes of R.",
      "Check whether attribute set X is defined with an explicit foreign key.",
      "Verify that X contains no integer or floating-point numeric attributes."
    ],
    "answer": 1,
    "explanation": "X is a superkey for relation R if and only if its attribute closure X⁺ contains every attribute in R (i.e. X⁺ = R)."
  }
];
