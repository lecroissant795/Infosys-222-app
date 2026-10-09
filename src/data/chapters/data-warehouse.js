export const title = "Data Warehouse";

export const questions = [
  {
    "id": "dw-01",
    "q": "According to W. H. Inmon, what are the four fundamental characteristics of a Data Warehouse?",
    "options": [
      "Subject-oriented, integrated, time-variant, and non-volatile (the canonical Inmon definition)",
      "Dynamic, normalized into third normal form, volatile, and application-specific",
      "Transactional, real-time, unstructured document store, and departmental",
      "Distributed across nodes, decentralized, volatile, and cryptographically signed"
    ],
    "answer": 0,
    "explanation": "Inmon defined a data warehouse as a subject-oriented, integrated, time-variant, and non-volatile collection of data in support of management's decision-making process."
  },
  {
    "id": "dw-02",
    "q": "How does an OLTP (Online Transaction Processing) system differ primarily from an OLAP (Online Analytical Processing) system?",
    "options": [
      "OLTP executes complex multi-year batch queries; OLAP manages real-time POS checkouts with low latency.",
      "OLTP focuses on fast transactional updates on normalized data; OLAP focuses on analytical queries over historical data.",
      "OLTP utilizes denormalised star schemas; OLAP enforces strict Boyce-Codd normal forms with zero redundancy across tables.",
      "OLTP stores unstructured document blobs; OLAP requires relational databases with single-attribute surrogate keys."
    ],
    "answer": 1,
    "explanation": "OLTP systems support operational business transactions (fast, frequent inserts/updates on current normalized data), whereas OLAP systems support analytical reporting and business intelligence (complex queries over historical consolidated data)."
  },
  {
    "id": "dw-03",
    "q": "What does the 'non-volatile' characteristic of a data warehouse mean?",
    "options": [
      "Data held in volatile memory registers is completely erased when electricity to the database server is interrupted.",
      "Data attribute values are continuously randomised in background processes to prevent security and privacy breaches.",
      "Data is loaded and read; it is not updated or overwritten in-place during standard operations.",
      "The storage engine automatically purges and deletes historical fact rows that exceed thirty calendar days of age."
    ],
    "answer": 2,
    "explanation": "Non-volatile means operational transactions do not update or delete historical warehouse data in-place; new snapshots are appended, and existing data remains stable for consistent historical reporting."
  },
  {
    "id": "dw-04",
    "q": "What is the 'grain' (or granularity) of a fact table?",
    "options": [
      "The physical block allocation size of an individual table partition in gigabytes.",
      "The ingestion rate at which ETL pipelines load records into the target database.",
      "The total count of b-tree indexes defined on foreign keys in the fact table.",
      "The exact level of detail represented by a single row in the fact table."
    ],
    "answer": 3,
    "explanation": "The grain specifies exactly what a single fact table record represents (e.g. an individual item on a customer receipt vs daily sales summary by store)."
  },
  {
    "id": "dw-05",
    "q": "In dimensional modeling, what are the two main types of tables?",
    "options": [
      "Fact tables and Dimension tables",
      "Master tables and Transaction tables",
      "Parent tables and Dependent tables",
      "Entity tables and Relationship tables"
    ],
    "answer": 0,
    "explanation": "Dimensional modeling organizes data into Fact tables (containing numerical business measurements and foreign keys) and Dimension tables (containing textual context and attributes for filtering/slicing)."
  },
  {
    "id": "dw-06",
    "q": "What does a Fact Table typically contain?",
    "options": [
      "Descriptive textual customer profiles, contact numbers, and category hierarchies.",
      "Numeric measures (quantitative business metrics) and foreign keys that reference surrounding dimension tables.",
      "Transactional logging records tracking administrative database connections and permissions.",
      "Stored SQL procedures and database access control privilege definitions."
    ],
    "answer": 1,
    "explanation": "A fact table stores quantitative business metrics (e.g. sales amount, units sold) alongside foreign keys linking to the surrounding dimension tables."
  },
  {
    "id": "dw-07",
    "q": "Which type of measure can be meaningfully summed across all dimensions in a fact table?",
    "options": [
      "Non-additive measure (cannot be aggregated with addition across any dimension, such as profit margin ratio)",
      "Semi-additive measure (can only be summed across selected non-temporal dimensions such as branch or account)",
      "Additive measure",
      "Calculated dimension attribute (derived exclusively from string concatenation and textual formatting rules)"
    ],
    "answer": 2,
    "explanation": "Additive measures (e.g. total revenue, quantity sold) can be validly aggregated (summed) across any and all dimensions (time, store, product, etc.)."
  },
  {
    "id": "dw-08",
    "q": "Which of the following is the best example of a semi-additive measure?",
    "options": [
      "Sales dollar amount on an individual purchase receipt",
      "Overall gross profit margin percentage across quarters",
      "Unit retail price of an individual inventory product",
      "Bank account balance recorded at the end of each day"
    ],
    "answer": 3,
    "explanation": "A bank account balance is semi-additive: it can be summed across branches or accounts, but summing daily balances across time (e.g. adding Monday through Friday balances) produces a meaningless figure."
  },
  {
    "id": "dw-09",
    "q": "What is a non-additive measure?",
    "options": [
      "A measure that cannot be meaningfully summed across any dimension, such as profit margin percentage.",
      "A measure that can only be added when filtered by a specific calendar date and branch location dimension.",
      "A numeric balance column that allows arithmetic addition but strictly prohibits computing averages or medians.",
      "An encrypted floating-point metric whose sign changes depending on whether currency exchange rates fluctuate."
    ],
    "answer": 0,
    "explanation": "Non-additive measures (e.g. ratios, percentages, unit prices) cannot be meaningfully combined using addition across any dimension and must be computed from underlying additive components."
  },
  {
    "id": "dw-10",
    "q": "What is a key structural feature of a Star Schema?",
    "options": [
      "Dimension tables are normalised into multiple related sub-tables to eliminate redundant text.",
      "A central fact table is connected directly to multiple denormalised dimension tables.",
      "There are no foreign keys or primary keys defined within the analytical database schema.",
      "All dimension attributes are packed into a single unstructured JSON column in the fact table."
    ],
    "answer": 1,
    "explanation": "In a star schema, a central fact table connects radially to denormalised dimension tables. This simple structure minimizes joins and optimizes query performance."
  },
  {
    "id": "dw-11",
    "q": "How does a Snowflake Schema differ from a Star Schema?",
    "options": [
      "A snowflake schema is used exclusively for unstructured audio and video files across distributed blob containers.",
      "A snowflake schema completely omits fact tables and stores all measures directly in views and stored procedures.",
      "In a snowflake schema, dimension tables are normalized into sub-tables to reduce redundancy.",
      "A snowflake schema eliminates foreign keys by using natural business keys across all dimensional join operations."
    ],
    "answer": 2,
    "explanation": "A snowflake schema normalizes dimension tables (e.g. decomposing Product into Product, Subcategory, and Category tables), saving storage space but increasing join complexity in queries."
  },
  {
    "id": "dw-12",
    "q": "What is a Surrogate Key in a dimension table?",
    "options": [
      "A natural business identifier inherited directly from an operational source system like an ERP account code.",
      "A cryptographically hashed security token used to authenticate reporting analysts accessing the data warehouse.",
      "A composite foreign key created by concatenating customer postal codes with transaction timestamps.",
      "An artificial, system-generated integer used as the primary key of a dimension table."
    ],
    "answer": 3,
    "explanation": "Surrogate keys are meaningless system-generated integers (e.g. 1, 2, 3...) used as dimension primary keys. They decouple the warehouse from source operational keys and enable tracking historical changes."
  },
  {
    "id": "dw-13",
    "q": "What is a conformed dimension?",
    "options": [
      "A shared dimension with consistent meaning, attribute names, and domain values across multiple fact tables.",
      "A dimension table that strictly complies with Boyce-Codd normal form rules.",
      "A temporary dimension table created on the fly during complex SQL query execution.",
      "A dimension table that stores exclusively calendar dates, weeks, and fiscal quarters."
    ],
    "answer": 0,
    "explanation": "A conformed dimension (e.g. a shared Date, Customer, or Product dimension) has consistent attribute definitions across different business processes, enabling cross-functional analysis across multiple fact tables."
  },
  {
    "id": "dw-14",
    "q": "What does the ETL process stand for in data warehousing?",
    "options": [
      "Evaluate, Test, and Launch",
      "Extract (from source systems), Transform (cleanse and restructure), and Load (into target warehouse tables)",
      "Encrypt, Transmit, and Log",
      "Execute, Transcribe, and Lock"
    ],
    "answer": 1,
    "explanation": "ETL stands for Extract (ingesting data from heterogeneous source systems), Transform (cleansing, standardising, restructuring), and Load (inserting into target warehouse tables)."
  },
  {
    "id": "dw-15",
    "q": "How does ELT (Extract, Load, Transform) differ from traditional ETL?",
    "options": [
      "ELT can only be executed when reading from flat CSV files stored locally on physical magnetic hard drives.",
      "ELT completely eliminates the requirement for data cleansing and duplicate checks across incoming staging files.",
      "Raw data is loaded into the warehouse first, then transformed using the warehouse engine.",
      "ELT executes complex mathematical transformations on edge client laptops before transmitting records over the WAN."
    ],
    "answer": 2,
    "explanation": "ELT leverages modern high-performance cloud data warehouses (e.g. Snowflake, BigQuery) to load raw data first and execute transformations in-database using scalable SQL engines."
  },
  {
    "id": "dw-16",
    "q": "Which OLAP operation summarizes data by climbing up a hierarchy (e.g. moving from daily sales to monthly sales)?",
    "options": [
      "Drill-Down (navigating downwards to finer levels of granular detail)",
      "Dice (filtering across two or more dimensions to isolate a specific sub-cube)",
      "Slice (filtering along a single dimensional axis to obtain a two-dimensional view)",
      "Roll-Up (aggregating data by ascending concept hierarchies or dropping dimensions)"
    ],
    "answer": 3,
    "explanation": "Roll-up aggregates data by ascending a dimensional hierarchy (e.g. Day → Month → Quarter → Year) or by dropping a dimension to view higher-level summaries."
  },
  {
    "id": "dw-17",
    "q": "Which OLAP operation navigates from less detailed (summary) data to more detailed data?",
    "options": [
      "Drill-Down",
      "Roll-Up (navigating up)",
      "Slice (single cut)",
      "Pivot (rotate axes)"
    ],
    "answer": 0,
    "explanation": "Drill-down is the inverse of roll-up: it breaks down summary figures into finer levels of granularity (e.g. navigating from Year down to individual Months or Days)."
  },
  {
    "id": "dw-18",
    "q": "What is the OLAP 'Slice' operation?",
    "options": [
      "Filtering multiple complex value ranges across three or more dimensions simultaneously in a query.",
      "Selecting a single value on one dimension to produce a sub-cube (e.g. Region = 'North').",
      "Permanently deleting corrupted transactional records from physical dimensional fact tables.",
      "Rotating multidimensional visualization axes to swap column headers with row headers in BI reports."
    ],
    "answer": 1,
    "explanation": "A slice operation performs a selection on a single dimension (fixing one attribute, e.g. Region = 'Auckland') to produce a rectangular sub-slice of the data cube."
  },
  {
    "id": "dw-19",
    "q": "What is the OLAP 'Dice' operation?",
    "options": [
      "Running pseudo-random Monte Carlo simulations against data warehouse fact tables.",
      "Normalising wide dimension tables into strict third normal form structures.",
      "Defining a sub-cube by selecting specific values or ranges across two or more dimensions simultaneously.",
      "Combining two completely independent data marts into an enterprise repository."
    ],
    "answer": 2,
    "explanation": "A dice operation selects a sub-cube by applying selection conditions across multiple dimensions simultaneously (e.g. Region IN ('North', 'South') AND Year IN (2023, 2024))."
  },
  {
    "id": "dw-20",
    "q": "What does the OLAP 'Pivot' (or Rotate) operation do?",
    "options": [
      "Serializes dimensional data into compressed binary format for encrypted network transfer between clusters.",
      "Overwrites dimension attribute records with current operational OLTP values from transactional source feeds.",
      "Decomposes a denormalised star schema into a deeply normalized snowflake schema hierarchy to save disk space.",
      "Reorients presentation axes, such as swapping rows and columns in a cross-tab view."
    ],
    "answer": 3,
    "explanation": "Pivot (or Rotate) changes the orientation of the dimensions displayed on the screen (e.g. rotating time from columns to rows) to provide alternative perspectives on data."
  },
  {
    "id": "dw-21",
    "q": "In Kimball's Slowly Changing Dimensions (SCD), how does Type 1 handle changes in dimensional attributes?",
    "options": [
      "It overwrites the existing attribute value in place, preserving no historical record of prior values.",
      "It appends a new record to the dimension with updated start and end date timestamps.",
      "It inserts a new column into the dimension table to retain the prior historical value.",
      "It rejects the transaction and logs an audit constraint exception in the warehouse."
    ],
    "answer": 0,
    "explanation": "SCD Type 1 simply overwrites the old attribute value with the new value. While easy to maintain, it does not retain historical context (e.g. past sales will appear under the customer's new address)."
  },
  {
    "id": "dw-22",
    "q": "How does SCD Type 2 maintain historical records when a dimensional attribute changes?",
    "options": [
      "By overwriting existing table rows with updated values from operational systems.",
      "By adding a new row with a new surrogate key, valid date range (start/end dates), and a current active flag.",
      "By adding an auxiliary column named 'previous_value' within the same table record.",
      "By permanently archiving and deleting all historical facts referencing that customer."
    ],
    "answer": 1,
    "explanation": "SCD Type 2 preserves complete history by inserting a new row with a new surrogate key, marking the old record as inactive (setting an end date), and setting the new record with a start date and active flag."
  },
  {
    "id": "dw-23",
    "q": "How does SCD Type 3 handle historical changes?",
    "options": [
      "By spawning a brand new database partition on disk for each updated dimensional customer record.",
      "By writing all attribute changes to an external append-only audit file stored on optical media.",
      "By adding a new column to store the previous value alongside the current value.",
      "By recomputing all historical fact table measures using the original insertion timestamps."
    ],
    "answer": 2,
    "explanation": "SCD Type 3 retains limited history (typically only the previous value) by adding a new attribute column (e.g. Current_City and Previous_City) within the existing row."
  },
  {
    "id": "dw-24",
    "q": "What is a Data Mart?",
    "options": [
      "A public cloud marketplace where organisations sell proprietary corporate datasets to external buyers.",
      "A client-side browser cache storing user authentication tokens and customized visualization preferences.",
      "An automated ETL execution server that schedules nightly data transformation pipelines and monitoring alerts.",
      "A focused subset of a data warehouse tailored to a specific department or line of business."
    ],
    "answer": 3,
    "explanation": "A data mart is a departmental or subject-specific analytical repository (e.g. Marketing Data Mart, Finance Data Mart) containing a curated subset of data for a specific group of users."
  },
  {
    "id": "dw-25",
    "q": "What is the difference between a Dependent Data Mart and an Independent Data Mart?",
    "options": [
      "Dependent marts source data from an enterprise warehouse; independent marts source from source systems.",
      "Dependent marts require Linux servers; independent marts run exclusively on distributed Windows hosts.",
      "Independent marts never contain fact tables and store exclusively dimension lookup codes across all databases.",
      "Dependent marts are publicly accessible via web browsers; independent marts require VPN authorization."
    ],
    "answer": 0,
    "explanation": "A dependent data mart is fed consistently from a central Enterprise Data Warehouse (EDW). An independent data mart extracts data directly from operational sources, often leading to inconsistent definitions and silos."
  },
  {
    "id": "dw-26",
    "q": "What is a Fact Constellation (or Galaxy) Schema?",
    "options": [
      "A schema designed exclusively to process astronomical satellite telemetry datasets in real-time.",
      "A schema featuring multiple fact tables that share one or more conformed dimensions.",
      "A single fact table linked to more than one hundred distinct dimension tables in radial star patterns.",
      "A non-relational graph database model that avoids using tables and foreign keys for analytical reporting."
    ],
    "answer": 1,
    "explanation": "A fact constellation (galaxy) schema consists of multiple fact tables that share common conformed dimension tables, representing multiple interlinked business processes across an enterprise."
  },
  {
    "id": "dw-27",
    "q": "What is a Factless Fact Table?",
    "options": [
      "A damaged fact table that contains index corruption and cannot be queried by business intelligence dashboards.",
      "A dimension table that has been accidentally misclassified and named as a fact table during ETL ingestion.",
      "A fact table containing only foreign keys representing events, with no numeric measures.",
      "A staging table containing metadata about database backup and restoration history across server environments."
    ],
    "answer": 2,
    "explanation": "A factless fact table contains only foreign key references to dimensions and captures event occurrences (e.g. student course attendance, web page click events) without numeric metric measures."
  },
  {
    "id": "dw-28",
    "q": "What is data staging in the ETL architecture?",
    "options": [
      "The presentation layer where interactive dashboards are displayed for executive business users.",
      "The cold physical magnetic tape archive used for long-term legal compliance and disaster recovery protocols.",
      "The live production transactional database where customer orders are processed and billed in real time.",
      "An intermediate storage area where raw data is landed, cleansed, and transformed before loading."
    ],
    "answer": 3,
    "explanation": "The staging area is a temporary storage zone where raw source data is extracted and staged to undergo validation, deduplication, cleansing, and key lookups without impacting production OLTP systems."
  },
  {
    "id": "dw-29",
    "q": "Why is a surrogate key preferred over a natural key as the primary key of a dimension table?",
    "options": [
      "It supports SCD Type 2 history, decouples from source keys, and speeds up joins with compact integers.",
      "It forces the relational database engine to compress long text attributes on physical storage blocks automatically.",
      "Natural keys are explicitly illegal in dimensional modeling standards across all business intelligence frameworks.",
      "Surrogate keys allow analysts to write SQL aggregate queries without needing WHERE clauses or join conditions."
    ],
    "answer": 0,
    "explanation": "Surrogate keys decouple the warehouse from source operational keys, allow multiple records for the same entity over time (SCD Type 2), integrate heterogeneous keys from multiple source systems, and yield faster join performance."
  },
  {
    "id": "dw-30",
    "q": "What is ROLAP compared to MOLAP in Business Intelligence architectures?",
    "options": [
      "ROLAP supports read-only operations, whereas MOLAP permits high-concurrency real-time transactional writes.",
      "ROLAP queries relational databases with SQL; MOLAP stores data in pre-computed multidimensional array cubes.",
      "ROLAP cannot perform drill-down or slice operations across any dimensional hierarchy defined in analytical models.",
      "MOLAP runs exclusively on mobile devices, whereas ROLAP is restricted to enterprise mainframe host environments."
    ],
    "answer": 1,
    "explanation": "ROLAP (Relational OLAP) accesses data stored in relational database tables using SQL, offering high scalability. MOLAP (Multidimensional OLAP) pre-aggregates data into proprietary multidimensional array cubes for ultra-fast query responses on smaller volumes."
  }
];
