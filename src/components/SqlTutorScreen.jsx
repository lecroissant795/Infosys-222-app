import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_CLICK_SOUND_PROPS } from "../constants/clickSound.js";
import { SQL_TUTOR_LABEL, SQL_TUTOR_QUESTION_COUNT } from "../constants/sqlTutor.js";
import { useNavigation } from "../contexts/NavigationContext.jsx";
import { backButtonStyle, theme } from "../styles/theme.js";
import { AppNavMenu } from "./AppNavMenu.jsx";
import { AppShell, SidebarCollapseButton, SidebarDivider } from "./AppShell.jsx";

const PROGRESS_KEY = "infosys-sql-tutor-passed";
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

function readPassed() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter(Number.isInteger) : [];
  } catch {
    return [];
  }
}

function writePassed(passed) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(passed));
  } catch {
    // progress is a convenience only
  }
}

function display(value) {
  return value === null || value === undefined ? "NULL" : String(value);
}

const cellStyle = {
  padding: "4px 10px",
  fontFamily: MONO,
  fontSize: 13,
  textAlign: "left",
  borderBottom: `1px solid ${theme.colors.border}`,
  whiteSpace: "pre",
};

function ResultTable({ columns, rows, rowStatus, caption }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", background: theme.colors.bgTertiary, minWidth: 180 }}>
        {caption && <caption style={{ display: "none" }}>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={`${column}-${index}`} style={{ ...cellStyle, fontWeight: 600, borderBottom: `1px solid ${theme.colors.borderStrong}` }}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((_, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    ...cellStyle,
                    color: rowStatus && rowStatus[rowIndex] === false ? theme.colors.error : theme.colors.text,
                  }}
                >
                  {display(row[colIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SchemaBlock({ table }) {
  return (
    <div
      style={{
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.lg,
        padding: "10px 12px",
        background: theme.colors.bg,
        minWidth: 220,
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{table.table}</div>
      {table.columns.map((column) => (
        <div key={column.name} style={{ fontFamily: MONO, fontSize: 12, color: theme.colors.textSecondary, lineHeight: 1.7 }}>
          <span style={{ color: theme.colors.text }}>{column.name}</span> {column.type}
          {column.note && <span style={{ color: theme.colors.textTertiary }}> — {column.note}</span>}
        </div>
      ))}
    </div>
  );
}

function ComparisonPanel({ result }) {
  const { expected, got, columnMatches, rowMatches, passed } = result;
  const gotColumns = got?.columns ?? [];
  const rowCount = Math.max(expected.rows.length, got?.rows.length ?? 0);
  const rowStatus = Array.from({ length: rowCount }, (_, i) => rowMatches[i]?.expected ?? false);

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Column headers</div>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ borderCollapse: "collapse", background: theme.colors.bgTertiary }}>
          <thead>
            <tr>
              {["Status", "Expected Result Columns", "Query Output Columns"].map((label) => (
                <th key={label} style={{ ...cellStyle, fontFamily: theme.fonts.sans, fontWeight: 600, borderBottom: `1px solid ${theme.colors.borderStrong}` }}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {columnMatches.map((column, index) => (
              <tr key={index}>
                <td style={{ ...cellStyle, color: column.match ? theme.colors.success : theme.colors.error }}>
                  {column.match ? "✓" : "✗"}
                </td>
                <td style={cellStyle}>{column.expected ?? "—"}</td>
                <td style={cellStyle}>{column.got ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Expected</div>
          <ResultTable columns={expected.columns} rows={expected.rows} rowStatus={passed ? null : rowStatus} caption="Expected" />
        </div>
        {got && (
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Got</div>
            <ResultTable
              columns={gotColumns}
              rows={got.rows}
              rowStatus={passed ? null : rowStatus}
              caption="Got"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Sidebar() {
  const nav = useNavigation();
  return (
    <>
      <div style={{ padding: "12px 14px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "4px 6px", marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            <span style={{ fontSize: 20 }}>📒</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text }}>INFOSYS 222</span>
          </div>
          <SidebarCollapseButton />
        </div>
        <div style={{ fontSize: 12, color: theme.colors.textTertiary, paddingLeft: 34 }}>Exam Prep</div>
      </div>
      <SidebarDivider />
      <AppNavMenu {...nav} />
    </>
  );
}

export function SqlTutorScreen({ number, onNavigate, onBack }) {
  const [question, setQuestion] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [sql, setSql] = useState("");
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);
  const [passedSet, setPassedSet] = useState(readPassed);
  const textareaRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setQuestion(null);
    setLoadError(null);
    setResult(null);
    setSql("");
    fetch(`/api/sql-tutor?number=${number}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Could not load question");
        if (!cancelled) setQuestion(data);
      })
      .catch((error) => {
        if (!cancelled) setLoadError(error instanceof Error ? error.message : "Could not load question");
      });
    return () => {
      cancelled = true;
    };
  }, [number]);

  const check = useCallback(async () => {
    if (checking || !question) return;
    setChecking(true);
    try {
      const response = await fetch("/api/sql-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: question.number, sql }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Check failed");
      setResult(data);
      if (data.passed) {
        setPassedSet((current) => {
          if (current.includes(question.number)) return current;
          const next = [...current, question.number];
          writePassed(next);
          return next;
        });
      }
    } catch (error) {
      setResult({
        passed: false,
        error: error instanceof Error ? error.message : "Check failed",
        columnMatches: [],
        expected: { columns: [], rows: [] },
        got: null,
        rowMatches: [],
        feedback: [],
      });
    } finally {
      setChecking(false);
    }
  }, [checking, question, sql]);

  const handleKeyDown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      check();
    } else if (event.key === "Tab") {
      event.preventDefault();
      const el = event.currentTarget;
      const { selectionStart, selectionEnd } = el;
      const next = `${sql.slice(0, selectionStart)}  ${sql.slice(selectionEnd)}`;
      setSql(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = selectionStart + 2;
      });
    }
  };

  const total = question?.total ?? SQL_TUTOR_QUESTION_COUNT;
  const hasNext = number < total;
  const primaryButton = {
    padding: "8px 18px",
    background: theme.colors.buttonPrimaryBg,
    color: theme.colors.buttonPrimaryText,
    border: "none",
    borderRadius: theme.radius.md,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
  };

  return (
    <AppShell sidebar={<Sidebar />}>
      <header style={{ marginBottom: 24 }}>
        <button type="button" onClick={onBack} style={backButtonStyle} {...NAV_CLICK_SOUND_PROPS}>
          ← Home
        </button>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "12px 0 4px", letterSpacing: "-0.02em" }}>
          {SQL_TUTOR_LABEL}
        </h1>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", marginTop: 12 }}>
          {Array.from({ length: total }, (_, index) => {
            const n = index + 1;
            const done = passedSet.includes(n);
            const active = n === number;
            return (
              <button
                key={n}
                type="button"
                onClick={() => onNavigate(n)}
                aria-label={`Question ${n}${done ? " (passed)" : ""}`}
                aria-current={active ? "step" : undefined}
                {...NAV_CLICK_SOUND_PROPS}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: theme.radius.md,
                  border: `1px solid ${active ? theme.colors.accent : theme.colors.borderStrong}`,
                  background: done ? theme.colors.successBg : active ? theme.colors.accentBg : theme.colors.bg,
                  color: done ? theme.colors.success : theme.colors.text,
                  fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  cursor: "pointer",
                }}
              >
                {done ? "✓" : n}
              </button>
            );
          })}
          <span style={{ fontSize: 13, color: theme.colors.textSecondary, marginLeft: 8 }}>
            {passedSet.length} / {total} passed
          </span>
        </div>
      </header>

      {loadError && (
        <div role="alert" style={{ color: theme.colors.error, marginBottom: 16 }}>
          {loadError}
        </div>
      )}
      {!question && !loadError && <div style={{ color: theme.colors.textSecondary }}>Loading question…</div>}

      {question && (
        <>
          <section
            style={{
              background: theme.colors.calloutBlue,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.lg,
              padding: "18px 20px",
              marginBottom: 20,
            }}
          >
            <div style={{ fontSize: 12, color: theme.colors.textSecondary, marginBottom: 6 }}>
              Question {question.number} of {question.total} · {question.level} · {question.skills.join(" · ")}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, margin: "0 0 16px" }}>{question.prompt}</p>

            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Schema context (SQLite):</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
              {question.schema.map((table) => (
                <SchemaBlock key={table.table} table={table} />
              ))}
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>For example:</div>
            <ResultTable columns={question.example.columns} rows={question.example.rows} caption="Example result" />
            {question.example.totalRows > question.example.rows.length && (
              <div style={{ fontSize: 12, color: theme.colors.textTertiary, marginTop: 6 }}>
                Showing {question.example.rows.length} of {question.example.totalRows} rows.
              </div>
            )}
          </section>

          <section style={{ marginBottom: 20 }}>
            <label htmlFor="sql-answer" style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>
              Answer:
            </label>
            <textarea
              id="sql-answer"
              ref={textareaRef}
              value={sql}
              onChange={(event) => setSql(event.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              rows={7}
              placeholder="SELECT ..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "10px 12px",
                fontFamily: MONO,
                fontSize: 14,
                lineHeight: 1.5,
                background: theme.colors.bg,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.borderStrong}`,
                borderRadius: theme.radius.md,
                resize: "vertical",
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
              <button
                type="button"
                onClick={check}
                disabled={checking || !sql.trim()}
                {...NAV_CLICK_SOUND_PROPS}
                style={{ ...primaryButton, opacity: checking || !sql.trim() ? 0.5 : 1, cursor: checking || !sql.trim() ? "not-allowed" : "pointer" }}
              >
                {checking ? "Checking…" : "Check"}
              </button>
              <span style={{ fontSize: 12, color: theme.colors.textTertiary }}>⌘/Ctrl + Enter to check</span>
            </div>
          </section>

          {result && (
            <section
              aria-live="polite"
              style={{
                border: `1px solid ${result.passed ? theme.colors.successBorder : theme.colors.errorBorder}`,
                background: result.passed ? theme.colors.successBg : theme.colors.errorBg,
                borderRadius: theme.radius.lg,
                padding: "16px 18px",
                marginBottom: 20,
              }}
            >
              {result.error ? (
                <div style={{ color: theme.colors.error, fontWeight: 600 }}>{result.error}</div>
              ) : (
                <>
                  <ComparisonPanel result={result} />
                  <div
                    style={{
                      marginTop: 16,
                      fontWeight: 700,
                      color: result.passed ? theme.colors.success : theme.colors.error,
                    }}
                  >
                    {result.passed ? "Passed all tests! ✓" : "Some tests failed. ✗"}
                  </div>
                </>
              )}

              {!result.passed && result.feedback.length > 0 && (
                <ul style={{ margin: "12px 0 0", paddingLeft: 20, lineHeight: 1.6, fontSize: 14 }}>
                  {result.feedback.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
              {!result.passed && <div style={{ marginTop: 10, fontSize: 13, color: theme.colors.textSecondary }}>Edit your query and try again.</div>}

              {result.passed && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Correct · Marks for this submission: 1.00/1.00</span>
                  {hasNext ? (
                    <button type="button" onClick={() => onNavigate(number + 1)} style={primaryButton} {...NAV_CLICK_SOUND_PROPS}>
                      Next question →
                    </button>
                  ) : (
                    <button type="button" onClick={onBack} style={primaryButton} {...NAV_CLICK_SOUND_PROPS}>
                      Finish
                    </button>
                  )}
                </div>
              )}
            </section>
          )}
        </>
      )}
    </AppShell>
  );
}
