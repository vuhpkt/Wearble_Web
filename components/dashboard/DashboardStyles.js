// components/dashboard/DashboardStyles.js
import React from "react";

export default function DashboardStyles() {
  return (
    <style jsx global>{`
        /* ── Light mode base ── */
        .device-selector-bar {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 14px 24px;
          background: #f5f7fa;
          border-bottom: 1px solid #e2e8f0;
          transition: background 0.2s, border-color 0.2s;
        }

        .add-node-btn {
          flex-shrink: 0;
          align-self: center;
          padding: 6px 14px;
          border-radius: 8px;
          border: 1.5px dashed var(--border, #cbd5e1);
          background: none;
          color: var(--text-muted, #64748b);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }
        .add-node-btn:hover {
          border-color: var(--cyan, #5B9BD5);
          color: var(--cyan, #5B9BD5);
          background: rgba(91,155,213,0.06);
        }

        .patient-bar--clickable {
          cursor: pointer;
          transition: background 0.15s, box-shadow 0.15s;
        }
        .patient-bar--clickable:hover {
          background: var(--surface-hover, rgba(0,200,255,0.03));
          box-shadow: inset 0 0 0 1px rgba(0,200,255,0.2);
        }
        .patient-expand-hint {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #00c8ff;
          opacity: 0;
          transition: opacity 0.15s;
          white-space: nowrap;
          margin-left: 8px;
        }
        .patient-bar--clickable:hover .patient-expand-hint {
          opacity: 1;
        }

        .chart-section--clickable {
          cursor: pointer;
          transition: box-shadow 0.15s, border-color 0.15s;
        }
        .chart-section--clickable:hover {
          box-shadow: 0 0 0 1.5px rgba(0,200,255,0.25);
        }
        .chart-expand-hint {
          margin-left: auto;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #00c8ff;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .chart-section--clickable:hover .chart-expand-hint {
          opacity: 1;
        }

        .settings-btn {
          font-size: 16px;
          line-height: 1;
          padding: 6px 8px;
          border-radius: 8px;
          text-decoration: none;
          color: var(--text-muted, #94a3b8);
          transition: background 0.15s;
        }
        .settings-btn:hover { background: var(--surface-2, #f1f5f9); }

        .device-card-wrapper {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
        }

        .device-detail-btn {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 18px;
          height: 18px;
          font-size: 12px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,200,255,0.12);
          border: none;
          border-radius: 4px;
          color: #00c8ff;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.15s;
          font-family: inherit;
        }

        .device-card-wrapper:hover .device-detail-btn {
          opacity: 1;
        }


        .device-selector-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #94a3b8;
          white-space: nowrap;
          padding-top: 10px;
        }

        .device-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          flex: 1;
        }

        .device-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 10px 14px;
          min-width: 100px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #ffffff;
          color: #1e293b;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, box-shadow 0.18s, transform 0.18s;
          font-family: inherit;
        }

        .device-card:hover {
          border-color: #00c8ff;
          box-shadow: 0 0 0 3px rgba(0, 200, 255, 0.12);
          transform: translateY(-1px);
        }

        .device-card--active {
          border-color: #00c8ff;
          background: rgba(0, 200, 255, 0.07);
          box-shadow: 0 0 0 3px rgba(0, 200, 255, 0.18);
        }

        .device-card--alert {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
        }

        .device-card--alert:hover,
        .device-card--alert.device-card--active {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }

        .device-card-top {
          position: relative;
          font-size: 18px;
          line-height: 1;
        }

        .alert-dot {
          position: absolute;
          top: -2px;
          right: -4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
          animation: pulse-alert 1.2s ease-in-out infinite;
        }

        @keyframes pulse-alert {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }

        .device-card-name {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #1e293b;
          text-align: center;
          transition: color 0.2s;
        }

        .device-card-sub {
          font-size: 9px;
          color: #94a3b8;
          text-align: center;
          letter-spacing: 0.04em;
        }

        .device-online-pill {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #22c55e;
          background: rgba(34, 197, 94, 0.12);
          border-radius: 20px;
          padding: 2px 6px;
          margin-top: 2px;
          transition: background 0.2s;
        }

        .device-online-pill.offline {
          color: #94a3b8;
          background: rgba(148, 163, 184, 0.12);
        }

        .device-skeleton-row { display: flex; gap: 10px; }

        .device-card-skeleton {
          width: 100px;
          height: 80px;
          border-radius: 10px;
          background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite;
        }

        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .no-devices { font-size: 12px; color: #94a3b8; padding: 8px 0; }

        .active-device-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 24px;
          background: rgba(0, 200, 255, 0.05);
          border-bottom: 1px solid rgba(0, 200, 255, 0.15);
          font-size: 12px;
          transition: background 0.2s;
        }

        .active-device-icon { font-size: 14px; }

        .active-device-name {
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #1e293b;
          transition: color 0.2s;
        }

        .active-device-label { color: #94a3b8; }

        .active-device-id {
          margin-left: auto;
          font-size: 10px;
          letter-spacing: 0.08em;
          color: #94a3b8;
          font-family: monospace;
        }

        .no-selection {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 64px 24px;
          opacity: 0.5;
        }

        .no-selection-icon { font-size: 40px; }

        .no-selection-text {
          font-size: 13px;
          letter-spacing: 0.08em;
          color: #94a3b8;
          font-weight: 600;
        }

        /* ── Device mode bar ── */
        .device-mode-bar {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 9px 24px;
          background: rgba(91, 155, 213, 0.03);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          flex-wrap: wrap;
        }

        .device-mode-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #94a3b8;
          flex-shrink: 0;
        }

        .device-mode-tabs {
          display: flex;
          gap: 6px;
        }

        .device-mode-tab {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 13px;
          border-radius: 20px;
          border: 1px solid rgba(148, 163, 184, 0.3);
          background: transparent;
          cursor: pointer;
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
          transition: all 0.15s;
          font-family: inherit;
        }

        .device-mode-tab:hover {
          border-color: rgba(91, 155, 213, 0.5);
          color: #1e293b;
          background: rgba(91, 155, 213, 0.06);
        }

        .device-mode-tab--active {
          background: rgba(91, 155, 213, 0.12);
          border-color: rgba(91, 155, 213, 0.55);
          color: #1e4e8c;
        }

        .mode-icon  { font-size: 12px; line-height: 1; }
        .mode-label { letter-spacing: 0.04em; }

        .device-mode-hint {
          font-size: 11px;
          color: #64748b;
          margin-left: 2px;
        }

        .mode-settings-link {
          color: #5b9bd5;
          text-decoration: none;
        }

        .mode-settings-link:hover { text-decoration: underline; }

        /* ── Dark mode overrides ── */
        :global([data-theme="dark"]) .device-selector-bar {
          background: #0f172a;
          border-bottom-color: #1e293b;
        }

        :global([data-theme="dark"]) .device-selector-label {
          color: #475569;
        }

        :global([data-theme="dark"]) .device-card {
          background: #1e293b;
          border-color: #334155;
          color: #e2e8f0;
        }

        :global([data-theme="dark"]) .device-card:hover {
          border-color: #00c8ff;
          background: #1e293b;
          box-shadow: 0 0 0 3px rgba(0, 200, 255, 0.15);
        }

        :global([data-theme="dark"]) .device-card--active {
          background: rgba(0, 200, 255, 0.1);
          border-color: #00c8ff;
          box-shadow: 0 0 0 3px rgba(0, 200, 255, 0.2);
        }

        :global([data-theme="dark"]) .device-card--alert {
          background: rgba(239, 68, 68, 0.08);
          border-color: #ef4444;
        }

        :global([data-theme="dark"]) .device-card-name {
          color: #e2e8f0;
        }

        :global([data-theme="dark"]) .device-card-sub {
          color: #64748b;
        }

        :global([data-theme="dark"]) .device-online-pill {
          color: #4ade80;
          background: rgba(74, 222, 128, 0.12);
        }

        :global([data-theme="dark"]) .device-online-pill.offline {
          color: #475569;
          background: rgba(71, 85, 105, 0.15);
        }

        :global([data-theme="dark"]) .device-card-skeleton {
          background: linear-gradient(90deg, #1e293b 25%, #263347 50%, #1e293b 75%);
          background-size: 200% 100%;
        }

        :global([data-theme="dark"]) .active-device-banner {
          background: rgba(0, 200, 255, 0.04);
          border-bottom-color: rgba(0, 200, 255, 0.12);
        }

        :global([data-theme="dark"]) .active-device-name {
          color: #e2e8f0;
        }

        :global([data-theme="dark"]) .active-device-label,
        :global([data-theme="dark"]) .active-device-id {
          color: #475569;
        }

        :global([data-theme="dark"]) .device-mode-bar {
          background: rgba(0, 200, 255, 0.02);
          border-bottom-color: rgba(255, 255, 255, 0.05);
        }

        :global([data-theme="dark"]) .device-mode-tab {
          color: #64748b;
          border-color: rgba(255, 255, 255, 0.08);
        }

        :global([data-theme="dark"]) .device-mode-tab:hover {
          color: #e2e8f0;
          border-color: rgba(0, 200, 255, 0.3);
          background: rgba(0, 200, 255, 0.06);
        }

        :global([data-theme="dark"]) .device-mode-tab--active {
          background: rgba(0, 200, 255, 0.1);
          border-color: rgba(0, 200, 255, 0.4);
          color: #00c8ff;
        }

        :global([data-theme="dark"]) .device-mode-hint {
          color: #475569;
        }

        :global([data-theme="dark"]) .mode-settings-link {
          color: #38bdf8;
        }

        :global([data-theme="dark"]) .no-devices {
          color: #475569;
        }

        :global([data-theme="dark"]) .no-selection-text {
          color: #475569;
        }
    `}</style>
  );
}
