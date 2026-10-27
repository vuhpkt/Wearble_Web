// components/settings/SettingsStyles.js
import React from "react";

export default function SettingsStyles() {
  return (
    <style jsx global>{`
        .settings-shell {
          min-height: 100vh;
          background: var(--bg-void, #f8f9fa);
          color: var(--text-primary, #2c3e50);
          font-family: inherit;
        }

        .settings-topbar {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 32px;
          background: var(--bg-card, #fff);
          border-bottom: 1px solid var(--border, #e2e8f0);
        }

        .back-btn {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted, #94a3b8);
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid var(--border, #e2e8f0);
          transition: background 0.15s;
        }
        .back-btn:hover { background: var(--bg-void, #f1f5f9); }

        .settings-title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-primary, #2c3e50);
        }

        .settings-body {
          max-width: 680px;
          margin: 32px auto;
          padding: 0 16px 64px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .settings-section {
          background: var(--bg-card, #fff);
          border-radius: 14px;
          border: 1px solid var(--border, #e2e8f0);
          padding: 22px 24px;
        }

        .section-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--text-primary, #2c3e50);
          margin-bottom: 4px;
        }

        .section-sub {
          font-size: 12px;
          color: var(--text-muted, #94a3b8);
          margin-bottom: 16px;
          line-height: 1.5;
        }

        /* Device pills */
        .device-select-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 10px;
        }
        .device-pill {
          font-size: 12px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 20px;
          border: 1.5px solid var(--border, #e2e8f0);
          background: var(--bg-void, #f8f9fa);
          color: var(--text-primary, #2c3e50);
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
        }
        .device-pill--active {
          border-color: #00c8ff;
          background: rgba(0,200,255,0.08);
          color: #00c8ff;
        }
        .device-id-label {
          font-size: 11px;
          color: var(--text-muted, #94a3b8);
          margin-top: 4px;
        }
        .mono { font-family: monospace; }
        .muted { opacity: 0.6; }
        .loading-label { font-size: 12px; color: #00c8ff; margin-top: 8px; }

        /* Threshold cards */
        .threshold-card {
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 10px;
          padding: 14px 16px;
          margin-bottom: 12px;
        }
        .threshold-card:last-child { margin-bottom: 0; }

        .threshold-card-header {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 12px;
        }
        .threshold-vital-name {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-primary, #2c3e50);
        }
        .threshold-unit {
          font-size: 11px;
          color: var(--text-muted, #94a3b8);
        }

        .threshold-tiers {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }
        @media (max-width: 560px) {
          .threshold-tiers { grid-template-columns: 1fr; }
        }
        .tier-group {
          border-radius: 8px;
          padding: 10px 12px;
        }
        .tier-normal  { background: rgba(34,197,94,0.06);  border: 1px solid rgba(34,197,94,0.22);  }
        .tier-warning { background: rgba(245,158,11,0.06); border: 1px solid rgba(245,158,11,0.22); }
        .tier-danger  { background: rgba(239,68,68,0.06);  border: 1px solid rgba(239,68,68,0.22);  }
        .tier-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
          color: var(--text-primary, #2c3e50);
        }
        .tier-fields {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .threshold-field {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .threshold-field span {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--text-muted, #94a3b8);
        }
        .threshold-field.normal span  { color: #22c55e; }
        .threshold-field.warning span { color: #f59e0b; }
        .threshold-field.danger span  { color: #ef4444; }
        .threshold-field input {
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid var(--border, #e2e8f0);
          background: var(--bg-card, #fff);
          color: var(--text-primary, #2c3e50);
          font-size: 13px;
          font-family: inherit;
          width: 100%;
          box-sizing: border-box;
        }
        .threshold-field.normal input  { border-color: rgba(34,197,94,0.35); }
        .threshold-field.warning input { border-color: rgba(245,158,11,0.35); }
        .threshold-field.danger input  { border-color: rgba(239,68,68,0.35); }
        .threshold-field input:focus {
          outline: none;
          border-color: #00c8ff;
          box-shadow: 0 0 0 2px rgba(0,200,255,0.12);
        }

        /* Interval */
        .interval-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 12px;
        }
        .interval-value {
          font-size: 14px;
          font-weight: 700;
          color: #00c8ff;
          min-width: 24px;
          text-align: left;
        }
        .interval-num-input {
          width: 64px;
          padding: 6px 8px;
          border-radius: 6px;
          border: 1px solid var(--border, #e2e8f0);
          background: var(--bg-card, #fff);
          color: var(--text-primary, #2c3e50);
          font-size: 14px;
          font-weight: 700;
          font-family: inherit;
          text-align: right;
        }
        .interval-num-input:focus {
          outline: none;
          border-color: #00c8ff;
          box-shadow: 0 0 0 2px rgba(0,200,255,0.12);
        }
        .interval-slider {
          flex: 1;
          accent-color: #00c8ff;
          cursor: pointer;
        }
        .interval-slider--red { accent-color: #ef4444; }
        .interval-slider--ir  { accent-color: #8b5cf6; }
        .interval-presets {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }
        .preset-btn {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid var(--border, #e2e8f0);
          background: var(--bg-void, #f8f9fa);
          color: var(--text-muted, #94a3b8);
          cursor: pointer;
          font-family: inherit;
          transition: all 0.15s;
        }
        .preset-btn--active {
          border-color: #00c8ff;
          background: rgba(0,200,255,0.08);
          color: #00c8ff;
        }
        .preset-btn--red.preset-btn--active {
          border-color: #ef4444;
          background: rgba(239,68,68,0.08);
          color: #ef4444;
        }
        .preset-btn--ir.preset-btn--active {
          border-color: #8b5cf6;
          background: rgba(139,92,246,0.08);
          color: #8b5cf6;
        }
        .interval-hint {
          font-size: 11px;
          color: var(--text-muted, #94a3b8);
          line-height: 1.5;
        }
        .interval-value--red   { color: #ef4444; }
        .interval-value--ir    { color: #8b5cf6; }

        /* ECG settings */
        .ecg-field-group {
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 10px;
          padding: 14px 16px;
          margin-bottom: 12px;
        }
        .ecg-field-group:last-child { margin-bottom: 0; }
        .ecg-field-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-primary, #2c3e50);
          margin-bottom: 4px;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .ecg-field-unit {
          font-size: 10px;
          font-weight: 400;
          color: var(--text-muted, #94a3b8);
          letter-spacing: 0;
        }
        .ecg-field-sub {
          font-size: 11px;
          color: var(--text-muted, #94a3b8);
          margin-bottom: 10px;
          line-height: 1.4;
        }
        .ecg-value-display {
          font-size: 18px;
          font-weight: 700;
          color: #00c8ff;
          margin-top: 8px;
        }

        /* Actions */
        .settings-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: flex-end;
          flex-wrap: wrap;
        }
        .save-msg {
          font-size: 12px;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 8px;
          margin-right: auto;
        }
        .save-msg--ok  { background: rgba(34,197,94,0.1);  color: #22c55e; }
        .save-msg--err { background: rgba(239,68,68,0.1);  color: #ef4444; }

        .btn-reset {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 10px 18px;
          border-radius: 8px;
          border: 1px solid var(--border, #e2e8f0);
          background: var(--bg-void, #f8f9fa);
          color: var(--text-muted, #94a3b8);
          cursor: pointer;
          font-family: inherit;
        }
        .btn-save {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 10px 22px;
          border-radius: 8px;
          border: none;
          background: #00c8ff;
          color: #fff;
          cursor: pointer;
          font-family: inherit;
          transition: opacity 0.15s;
        }
        .btn-save:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Dark mode */
        :global([data-theme="dark"]) .settings-section {
          background: #1e293b;
          border-color: #334155;
        }
        :global([data-theme="dark"]) .settings-topbar {
          background: #1e293b;
          border-bottom-color: #334155;
        }
        :global([data-theme="dark"]) .threshold-card {
          border-color: #334155;
        }
        :global([data-theme="dark"]) .threshold-field input {
          background: #0f172a;
          border-color: #334155;
          color: #e2e8f0;
        }
        :global([data-theme="dark"]) .device-pill {
          background: #0f172a;
          border-color: #334155;
          color: #e2e8f0;
        }
        :global([data-theme="dark"]) .btn-reset {
          background: #0f172a;
          border-color: #334155;
          color: #64748b;
        }
        :global([data-theme="dark"]) .preset-btn {
          background: #0f172a;
          border-color: #334155;
          color: #64748b;
        }
        :global([data-theme="dark"]) .ecg-field-group {
          border-color: #334155;
        }
        :global([data-theme="dark"]) .interval-num-input {
          background: #0f172a;
          border-color: #334155;
          color: #e2e8f0;
        }
    `}</style>
  );
}
