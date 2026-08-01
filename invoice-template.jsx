import { useState, useEffect, useRef, useCallback } from "react";

// Original logo extracted from the PDF (pixel-identical)
const LOGO_SRC = "data:image/png;base64,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";

const DEFAULTS = {
  senderName: "Jared Michael Siskin",
  senderAddress: "5 Ash CT, Bayville\nNY, 11709",
  invoiceNumber: "007",
  client: "Morgan Stanley",
  invoiceDate: "07.08.2026",
  fields: [
    { id: "f1", label: "DATE:", value: "07/07/2026" },
    { id: "f2", label: "ASSIGNMENT:", value: "Analyst Day Westchester 2026" },
    { id: "f3", label: "DURATION:", value: "8:00am - 6:00pm" },
    { id: "f4", label: "TRAVEL:", value: "INCLUDED" },
    { id: "f5", label: "DISCOUNT:", value: "-150.00" },
  ],
  total: "4100.00",
};

const STORAGE_KEY = "invoice-template:data";

// Auto-growing input that looks like plain document text
function Line({ value, onChange, className, placeholder, bold }) {
  return (
    <span
      className={`grow-wrap ${className || ""}`}
      data-value={value || placeholder || ""}
      style={bold ? { fontWeight: 700 } : undefined}
    >
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </span>
  );
}

export default function InvoiceTemplate() {
  const [data, setData] = useState(DEFAULTS);
  const [status, setStatus] = useState("");
  const loaded = useRef(false);
  const saveTimer = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(STORAGE_KEY);
        if (result && result.value) {
          setData({ ...DEFAULTS, ...JSON.parse(result.value) });
        }
      } catch (e) {
        // no saved template yet
      } finally {
        loaded.current = true;
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify(data));
        setStatus("Saved");
        setTimeout(() => setStatus(""), 1500);
      } catch (e) {
        setStatus("Couldn't save");
      }
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [data]);

  const set = useCallback((k, v) => setData((d) => ({ ...d, [k]: v })), []);

  const setField = (id, part, value) =>
    setData((d) => ({
      ...d,
      fields: d.fields.map((f) => (f.id === id ? { ...f, [part]: value } : f)),
    }));

  const addField = () =>
    setData((d) => ({
      ...d,
      fields: [...d.fields, { id: "f" + Date.now(), label: "LABEL:", value: "" }],
    }));

  const removeField = (id) =>
    setData((d) => ({ ...d, fields: d.fields.filter((f) => f.id !== id) }));

  // Original layout: rows start at y=175pt, spaced 25pt apart; TOTAL sits at y=349pt
  const nRows = data.fields.length;
  const totalTop = Math.max(349, 175 + nRows * 25 + 40);

  return (
    <div className="app">
      <style>{`
        * { box-sizing: border-box; }

        .app {
          min-height: 100vh;
          background: #e8e8e6;
          padding: 24pt 8pt 48pt;
          font-family: Helvetica, Arial, sans-serif;
        }

        .toolbar {
          width: 612pt;
          max-width: 100%;
          margin: 0 auto 12pt;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .toolbar button {
          font: 600 13px Helvetica, Arial, sans-serif;
          padding: 8px 15px;
          border: 1px solid #1a1a1a;
          background: #1a1a1a;
          color: #fff;
          cursor: pointer;
          border-radius: 3px;
        }
        .toolbar button.secondary { background: transparent; color: #1a1a1a; }
        .toolbar button:hover { opacity: 0.85; }
        .status { margin-left: auto; font-size: 12px; color: #777; }

        /* The sheet uses the PDF's own coordinate system: 612pt x 792pt */
        .sheet {
          width: 612pt;
          height: 792pt;
          max-width: 100%;
          margin: 0 auto;
          background: #fff;
          position: relative;
          box-shadow: 0 2px 14px rgba(0,0,0,0.14);
          color: #030405;
          overflow: hidden;
        }

        input, textarea {
          font: inherit;
          color: inherit;
          border: none;
          background: transparent;
          padding: 0 1pt;
          margin: 0 -1pt;
          outline: none;
          border-radius: 2px;
          resize: none;
          line-height: inherit;
        }
        input:hover, textarea:hover { background: #f3f6fb; }
        input:focus, textarea:focus { background: #eaf1fb; box-shadow: 0 0 0 1px #b9cef2; }

        .grow-wrap { display: inline-grid; vertical-align: baseline; }
        .grow-wrap::after {
          content: attr(data-value) " ";
          white-space: pre;
          visibility: hidden;
          grid-area: 1 / 1;
          font: inherit;
          padding: 0 1pt;
          margin: 0 -1pt;
        }
        .grow-wrap input { grid-area: 1 / 1; width: 100%; min-width: 16pt; }

        .logo {
          position: absolute;
          left: 18pt;
          top: 19.2pt;
          width: 214.5pt;
          height: 52.7pt;
        }

        .sender {
          position: absolute;
          left: 417pt;
          top: 39pt;
          width: 130pt;
          font-size: 9pt;
          line-height: 11pt;
          color: #231f20;
        }
        .sender .name input { font-weight: 700; }
        .sender textarea { width: 100%; overflow: hidden; }

        .tick {
          position: absolute;
          left: 102pt;
          top: 130.5pt;
          width: 3pt;
          height: 18pt;
          background: #232120;
        }
        .inv-row {
          position: absolute;
          left: 110pt;
          top: 132.5pt;
          display: flex;
          align-items: baseline;
          font-size: 10pt;
          color: #231f20;
          white-space: pre;
        }
        .inv-row b { font-weight: 700; }
        .inv-row .sp { display: inline-block; width: 14pt; }
        .bar {
          position: absolute;
          left: 83pt;
          top: 147pt;
          width: 443pt;
          height: 5pt;
          background: #030405;
        }

        .row {
          position: absolute;
          left: 102pt;
          display: flex;
          align-items: baseline;
          font-size: 10.3pt;
          white-space: pre;
        }
        .row b { font-weight: 700; }
        .row .del {
          position: absolute;
          left: -22pt;
          top: 0;
          border: none;
          background: none;
          color: #c33;
          cursor: pointer;
          font-size: 11pt;
          opacity: 0;
          transition: opacity .15s;
          padding: 0 3pt;
        }
        .row:hover .del { opacity: 1; }
        .row .label input { font-weight: 700; }

        .add-row {
          position: absolute;
          left: 102pt;
          border: 1px dashed #bbb;
          background: none;
          color: #999;
          font: 9pt Helvetica, Arial, sans-serif;
          padding: 3pt 9pt;
          cursor: pointer;
          border-radius: 3px;
        }
        .add-row:hover { color: #555; border-color: #888; }

        .total-row {
          position: absolute;
          left: 426pt;
          display: flex;
          align-items: baseline;
          font-size: 10.3pt;
          font-weight: 700;
          white-space: pre;
        }
        .total-row .amount input { color: #ed2024; font-weight: 700; }

        @media print {
          .app { background: #fff; padding: 0; }
          .toolbar, .del, .add-row { display: none !important; }
          .sheet { box-shadow: none; }
          input:hover, textarea:hover, input:focus, textarea:focus {
            background: transparent; box-shadow: none;
          }
        }
      `}</style>

      <div className="toolbar">
        <button onClick={() => window.print()}>Print / Save as PDF</button>
        <button className="secondary" onClick={addField}>+ Add line</button>
        <button className="secondary" onClick={() => setData(DEFAULTS)}>Reset to defaults</button>
        <span className="status">{status}</span>
      </div>

      <div className="sheet">
        <img className="logo" src={LOGO_SRC} alt="Jared Michael Siskin Photography" />

        <div className="sender">
          <div className="name">
            <Line value={data.senderName} onChange={(v) => set("senderName", v)} />
          </div>
          <textarea
            rows={2}
            value={data.senderAddress}
            onChange={(e) => set("senderAddress", e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="tick" />
        <div className="inv-row">
          <b>INVOICE: </b>
          <Line value={data.invoiceNumber} onChange={(v) => set("invoiceNumber", v)} />
          <span className="sp" />
          <b>CLIENT: </b>
          <Line value={data.client} onChange={(v) => set("client", v)} />
          <span className="sp" />
          <b>DATE: </b>
          <Line value={data.invoiceDate} onChange={(v) => set("invoiceDate", v)} />
        </div>
        <div className="bar" />

        {data.fields.map((f, i) => (
          <div className="row" key={f.id} style={{ top: `${175 + i * 25}pt` }}>
            <button className="del" title="Remove line" onClick={() => removeField(f.id)}>✕</button>
            <span className="label">
              <Line value={f.label} onChange={(v) => setField(f.id, "label", v)} />
            </span>
            <span> </span>
            <Line value={f.value} onChange={(v) => setField(f.id, "value", v)} placeholder="value" />
          </div>
        ))}

        <button
          className="add-row"
          style={{ top: `${175 + nRows * 25}pt` }}
          onClick={addField}
        >
          + Add line
        </button>

        <div className="total-row" style={{ top: `${totalTop}pt` }}>
          <b>TOTAL: </b>
          <span className="amount">
            <Line value={data.total} onChange={(v) => set("total", v)} />
          </span>
        </div>
      </div>
    </div>
  );
}
