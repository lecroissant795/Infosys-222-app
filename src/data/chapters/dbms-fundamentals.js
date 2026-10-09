export const title = "DBMS Fundamentals";

export const questions = [
  {
    "id": "dbms-01",
    "q": "Which of the following is a primary advantage of a Database Management System (DBMS) over a traditional file-processing system?",
    "options": [
      "It reduces data redundancy and inconsistency across shared enterprise applications.",
      "It completely eliminates the operational requirement for database backup and recovery protocols.",
      "It eliminates the need for conceptual data modeling and formal database schema design.",
      "It automatically converts relational data into unindexed flat text files for maximum raw processing speed."
    ],
    "answer": 0,
    "explanation": "A key benefit of a DBMS is centralised data management, which greatly reduces data redundancy and prevents data inconsistency caused by duplicate records in disparate files."
  },
  {
    "id": "dbms-02",
    "q": "In the ANSI-SPARC three-schema architecture, which level describes how data is physically stored on disk and storage devices?",
    "options": [
      "External level (customized individual user views)",
      "Internal level (physical storage access paths)",
      "Conceptual level (logical community schema)",
      "Network level (distributed client-server communication)"
    ],
    "answer": 1,
    "explanation": "The Internal (or Physical) level describes the physical storage structure, file organisation, indexes, and access paths on physical storage media."
  },
  {
    "id": "dbms-03",
    "q": "What is physical data independence?",
    "options": [
      "The ability of client applications to query databases without establishing physical network sockets.",
      "The capacity to alter the conceptual schema without modifying any external user views.",
      "The capacity to change the internal schema without altering the conceptual schema.",
      "The isolation of server hardware configurations from high-availability database cluster backups."
    ],
    "answer": 2,
    "explanation": "Physical data independence allows DBAs to modify internal storage structures (e.g. adding indexes, changing storage locations) without requiring changes to the conceptual (logical) schema or user applications."
  },
  {
    "id": "dbms-04",
    "q": "In relational model terminology, what is the formal term for a row and a column in a relation?",
    "options": [
      "Row: Domain; Column: Cardinality",
      "Row: Schema; Column: Instance",
      "Row: Entity; Column: Relationship",
      "Row: Tuple; Column: Attribute"
    ],
    "answer": 3,
    "explanation": "In the formal relational model, a table is called a relation, each row is a tuple, and each column is an attribute."
  },
  {
    "id": "dbms-05",
    "q": "What do the cardinality and degree (arity) of a relation refer to?",
    "options": [
      "Cardinality is the count of tuples; Degree is the count of attributes.",
      "Cardinality is the total number of tables; Degree is the foreign key count.",
      "Cardinality is the count of attributes; Degree is the count of tuples.",
      "Cardinality is storage size in bytes; Degree is the query execution time."
    ],
    "answer": 0,
    "explanation": "Cardinality refers to the number of rows (tuples) currently in a relation, whereas degree (or arity) refers to the number of columns (attributes)."
  },
  {
    "id": "dbms-06",
    "q": "What defines a candidate key in a relational database?",
    "options": [
      "Any attribute column that contains non-null values across all stored table records.",
      "A minimal superkey whose proper subsets cannot uniquely identify a tuple.",
      "An attribute designated solely for creating clustered b-tree sorting indexes.",
      "A foreign key reference that connects a child entity to a weak parent relation."
    ],
    "answer": 1,
    "explanation": "A candidate key is a minimal superkey: it uniquely identifies every tuple in the relation, and no proper subset of its attributes possesses this uniqueness property."
  },
  {
    "id": "dbms-07",
    "q": "According to the entity integrity constraint in the relational model:",
    "options": [
      "Every foreign key attribute must match an indexed primary key value in another table.",
      "Every relation must possess at least five distinct columns and one unique index constraint.",
      "No primary key attribute (or component of a composite PK) may contain a NULL value.",
      "Numeric columns designated as keys must strictly contain positive integers greater than zero."
    ],
    "answer": 2,
    "explanation": "Entity integrity requires that no attribute participating in the primary key can be NULL, ensuring every tuple can be uniquely identified and referenced."
  },
  {
    "id": "dbms-08",
    "q": "What does the referential integrity constraint enforce?",
    "options": [
      "Primary key values cannot be altered once inserted into the database under any circumstance.",
      "Every relation in the schema must contain at least one foreign key pointing to a master table.",
      "All foreign key columns must be declared with a unique constraint to avoid duplicate references.",
      "A foreign key must either match an existing primary key value in the referenced relation or be NULL."
    ],
    "answer": 3,
    "explanation": "Referential integrity guarantees that relationships between tables remain consistent: a foreign key value must either match a valid primary key in the referenced parent relation or be NULL (if allowed)."
  },
  {
    "id": "dbms-09",
    "q": "If a foreign key constraint is declared with 'ON DELETE CASCADE', what occurs when a parent record is deleted?",
    "options": [
      "All matching child records in the referencing relation are automatically deleted.",
      "The database management system rejects the deletion and returns an integrity error.",
      "The foreign key values in matching child records are automatically converted to NULL.",
      "The parent tuple is moved to an audit table while leaving child records unchanged."
    ],
    "answer": 0,
    "explanation": "ON DELETE CASCADE automatically deletes all dependent child tuples when the corresponding referenced parent tuple is deleted, maintaining referential integrity."
  },
  {
    "id": "dbms-10",
    "q": "In an Entity-Relationship (ER) model, what is a composite attribute?",
    "options": [
      "An attribute that can store an array of multiple distinct values for a single entity instance.",
      "An attribute composed of multiple sub-components (e.g. Address split into Street, City, Postcode).",
      "An attribute whose value is dynamically calculated from stored database values, such as Age.",
      "An attribute that serves simultaneously as a primary key and a foreign key in the same entity."
    ],
    "answer": 1,
    "explanation": "A composite attribute can be divided into smaller sub-components that have independent meanings (e.g. Full Name divided into First Name and Last Name)."
  },
  {
    "id": "dbms-11",
    "q": "In Chen ER notation, how is a derived attribute represented?",
    "options": [
      "A double rectangle.",
      "A diamond containing an underline.",
      "A dashed (or dotted) oval.",
      "A solid double diamond."
    ],
    "answer": 2,
    "explanation": "In standard Chen ER notation, a derived attribute (whose value is computed from other attributes or stored data) is shown as a dashed (or dotted) oval."
  },
  {
    "id": "dbms-12",
    "q": "What characterizes a weak entity type in relational database design?",
    "options": [
      "It possesses many-to-many relationship cardinality with all other schema entities.",
      "It contains exclusively nullable text attributes and has no defined b-tree indexes.",
      "It is a temporary view definition that drops automatically when client sessions end.",
      "It lacks a primary key of its own and depends on an identifying entity for existence."
    ],
    "answer": 3,
    "explanation": "A weak entity does not possess sufficient attributes to form its own primary key; it relies on an identifying entity and forms its primary key using the owner's primary key plus its own partial key (discriminator)."
  },
  {
    "id": "dbms-13",
    "q": "When mapping a Many-to-Many (M:N) relationship from an ER model to a relational schema, what structure is required?",
    "options": [
      "An associative (junction) table with foreign keys referencing both participating entities.",
      "Merging the two entity types into a single denormalised table structure.",
      "Placing foreign keys directly into both original participating entity tables.",
      "Using a recursive foreign key that loops back to the primary key of the first table."
    ],
    "answer": 0,
    "explanation": "A Many-to-Many relationship is resolved in the relational model by introducing an associative (junction/bridge) table whose primary key is typically a composite key of the foreign keys referencing both parent entities."
  },
  {
    "id": "dbms-14",
    "q": "When mapping a 1:N (One-to-Many) relationship into relational tables, where should the foreign key be placed?",
    "options": [
      "In the table on the '1' (parent) side.",
      "In the table on the 'N' (many/child) side.",
      "In an entirely separate junction table with a single primary key.",
      "In both tables simultaneously to maintain symmetric referential integrity."
    ],
    "answer": 1,
    "explanation": "In a 1:N relationship, the foreign key is placed in the relation on the 'Many' (N) side, referencing the primary key of the 'One' side relation."
  },
  {
    "id": "dbms-15",
    "q": "Which ACID property guarantees that all operations in a database transaction complete successfully, or none of them take effect at all?",
    "options": [
      "Isolation (concurrency without intermediate interference)",
      "Consistency (preservation of database invariants)",
      "Atomicity (the all-or-nothing execution guarantee)",
      "Durability (committed data survives system crashes)"
    ],
    "answer": 2,
    "explanation": "Atomicity ensures the 'all-or-nothing' principle: if any statement in a transaction fails, the entire transaction is rolled back so the database remains in its pre-transaction state."
  },
  {
    "id": "dbms-16",
    "q": "Which ACID property ensures that committed transaction updates persist even in the event of a subsequent power failure or system crash?",
    "options": [
      "Atomicity",
      "Consistency",
      "Isolation",
      "Durability"
    ],
    "answer": 3,
    "explanation": "Durability guarantees that once a transaction commits, its modifications are permanently recorded in non-volatile storage (via write-ahead logs and checkpoints) and will survive system failures."
  },
  {
    "id": "dbms-17",
    "q": "Which concurrency anomaly occurs when Transaction A reads data modified by Transaction B before Transaction B commits, and Transaction B subsequently rolls back?",
    "options": [
      "Dirty read anomaly",
      "Lost update anomaly",
      "Non-repeatable read anomaly",
      "Phantom read anomaly"
    ],
    "answer": 0,
    "explanation": "A dirty read occurs when a transaction reads uncommitted modifications made by another concurrent transaction that later aborts (rolls back), meaning the read data never formally existed."
  },
  {
    "id": "dbms-18",
    "q": "What is a non-repeatable read concurrency anomaly?",
    "options": [
      "A transaction fails to read a row because the disk sector is locked by the operating system.",
      "A transaction re-reads a row and finds committed values modified by another transaction.",
      "Two transactions attempt to insert identical primary keys at the exact same millisecond.",
      "A range query returns a different count of rows because new records were inserted."
    ],
    "answer": 1,
    "explanation": "A non-repeatable read occurs when a transaction reads a row, another transaction updates and commits that row, and the first transaction re-reads the row to find the values have changed."
  },
  {
    "id": "dbms-19",
    "q": "What is a phantom read in concurrent transaction execution?",
    "options": [
      "A read operation that accesses archived records stored on off-site backup media.",
      "An uncommitted update that overwrites another transaction's changes without acquiring locks.",
      "A query re-executes with a search predicate and finds newly inserted rows committed by another transaction.",
      "A deadlock situation where two transactions wait indefinitely for shared resource releases."
    ],
    "answer": 2,
    "explanation": "A phantom read occurs when a transaction re-executes a range query (e.g. WHERE salary > 50000) and finds new 'phantom' rows that were inserted and committed by another transaction."
  },
  {
    "id": "dbms-20",
    "q": "What is the primary role of the DBMS Data Dictionary (also known as the System Catalog)?",
    "options": [
      "To store administrative master passwords in plain text for emergency system recovery.",
      "To store client application source code and graphical layout styles.",
      "To store temporary query cache memory buffers before flushing dirty blocks to disk.",
      "To store metadata describing schemas, column types, constraints, and user authorizations."
    ],
    "answer": 3,
    "explanation": "The data dictionary / system catalog stores metadata—data about data—including schema definitions, integrity constraints, indexes, views, and user access rights."
  },
  {
    "id": "dbms-21",
    "q": "What is the difference between total participation and partial participation in an ER relationship?",
    "options": [
      "Total participation requires every entity instance to be involved; partial means only some may participate.",
      "Total participation indicates an arity of three or more; partial indicates a binary relationship.",
      "Total participation requires all entity attributes to be numeric; partial permits text and dates.",
      "Total participation permits null foreign keys; partial strictly forbids any null foreign key values."
    ],
    "answer": 0,
    "explanation": "Total participation (mandatory) requires every entity instance to participate in at least one relationship instance, whereas partial participation (optional) allows entities to exist without participating."
  },
  {
    "id": "dbms-22",
    "q": "What is an alternate key in database design?",
    "options": [
      "A foreign key reference pointing to an external distributed database.",
      "A candidate key that was not selected as the primary key.",
      "A primary key composed exclusively of non-numeric textual attributes.",
      "A cryptographic hash value used for verifying transaction signatures."
    ],
    "answer": 1,
    "explanation": "Candidate keys that are not selected as the primary key are designated as alternate keys (often enforced with UNIQUE constraints)."
  },
  {
    "id": "dbms-23",
    "q": "What is a superkey?",
    "options": [
      "A key that can only be defined and managed by the database administrator superuser.",
      "A composite primary key that contains foreign keys referencing three or more distinct tables.",
      "A set of attributes uniquely identifying each tuple in a relation, potentially with redundant attributes.",
      "A database trigger key used to enforce complex business rules across distributed schemas."
    ],
    "answer": 2,
    "explanation": "A superkey is any set of attributes within a relation that uniquely identifies each tuple. A candidate key is a minimal superkey that contains no extraneous attributes."
  },
  {
    "id": "dbms-24",
    "q": "How does logical data independence differ from physical data independence?",
    "options": [
      "There is no architectural difference between the two terms within the standard ANSI-SPARC framework guidelines.",
      "Logical data independence manages disk partition blocks, whereas physical data independence manages SQL query grammar.",
      "Physical data independence applies exclusively to relational models, whereas logical applies to non-relational document stores.",
      "Logical data independence shields external schemas from conceptual changes; physical shields conceptual from internal changes."
    ],
    "answer": 3,
    "explanation": "Logical data independence shields user views and applications from alterations in the conceptual schema (e.g. adding new tables/columns), while physical data independence shields the conceptual schema from changes in physical storage mechanisms."
  },
  {
    "id": "dbms-25",
    "q": "What is a recursive (or unary) relationship in an ER model?",
    "options": [
      "A relationship where the same entity type participates more than once in distinct roles.",
      "A relationship that is invoked inside a recursive procedural SQL function.",
      "A relationship between two tables that triggers an infinite join loop during query execution.",
      "A relationship that simultaneously connects four or more distinct entity types in a hypergraph."
    ],
    "answer": 0,
    "explanation": "A recursive (unary) relationship connects an entity type to itself, where instances of the entity fulfill different roles (such as an Employee supervising another Employee)."
  },
  {
    "id": "dbms-26",
    "q": "What is the domain of an attribute in the relational model?",
    "options": [
      "The physical network IP address where the relational database host server resides.",
      "The complete set of permitted, atomic values that can be assigned to that attribute.",
      "The set of foreign key relations that reference that specific column across schemas.",
      "The total number of rows currently stored within the parent relation table."
    ],
    "answer": 1,
    "explanation": "An attribute domain defines the pool of legal, atomic values that can be assigned to that attribute (e.g. valid dates, positive integers, specific codes)."
  },
  {
    "id": "dbms-27",
    "q": "Which component of a DBMS is responsible for ensuring the Atomicity and Durability properties of transactions?",
    "options": [
      "The Cost-Based Query Optimizer",
      "The Data Definition Language Compiler",
      "The Recovery Manager (using write-ahead transaction logs)",
      "The Graphical User Interface Form Builder"
    ],
    "answer": 2,
    "explanation": "The Recovery Manager uses write-ahead logging (WAL) and checkpointing to undo uncommitted transactions (Atomicity) and redo committed transactions after a crash (Durability)."
  },
  {
    "id": "dbms-28",
    "q": "In an ER model, how is a multivalued attribute mapped to the relational model?",
    "options": [
      "By storing comma-delimited string values in a single VARCHAR attribute column.",
      "Multivalued attributes are strictly omitted because they cannot be modeled in relational schemas.",
      "By creating twenty redundant columns in the parent table (e.g. Phone1, Phone2, Phone3).",
      "A new relation with an attribute for the value and a foreign key to the parent entity."
    ],
    "answer": 3,
    "explanation": "To adhere to 1NF (atomic values), a multivalued attribute is mapped to a separate relation containing the attribute value along with a foreign key back to the parent entity's primary key."
  },
  {
    "id": "dbms-29",
    "q": "What is the primary purpose of database views?",
    "options": [
      "Provide security by restricting column/row access, simplify queries, and support logical data independence.",
      "Store duplicate physical copies of base table rows on all client desktop workstations.",
      "Permanently replace underlying base tables and eliminate the need for relational primary keys.",
      "Bypass foreign key referential integrity constraints during bulk data importation routines."
    ],
    "answer": 0,
    "explanation": "Views act as virtual tables that simplify complex queries, present customized data subsets to specific user groups without exposing raw underlying tables, and insulate clients from schema changes."
  },
  {
    "id": "dbms-30",
    "q": "Which transaction isolation level provides the highest level of isolation by preventing dirty reads, non-repeatable reads, and phantom reads?",
    "options": [
      "Read Uncommitted",
      "Serializable",
      "Repeatable Read",
      "Read Committed"
    ],
    "answer": 1,
    "explanation": "Serializable is the strictest SQL isolation level; it ensures transactions execute as if they were run serially one after another, eliminating dirty reads, non-repeatable reads, and phantoms."
  }
];
