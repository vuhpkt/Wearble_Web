// components/dashboard/Sidebar.js
import React from "react";

export default function Sidebar({
  tbUsername,
  tbAuthority,
  setOverviewModal,
  notificationsOn,
  setNotificationsOn,
  setOtaModal,
  setPrintModal,
  selectedDeviceId,
  setAssignModal,
  devicesLoading,
  connected,
  lastUpdate,
  theme,
  toggleTheme,
  fetchDevices,
  logout,
}) {
  const formatTime = (date) =>
    date ? (date instanceof Date ? date : new Date(date)).toLocaleTimeString() : "";

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12h3l3-9 3 18 3-9h3"
              stroke="#00c8ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <div className="brand-name">WearableDev</div>
          <div className="brand-sub">HEALTH MONITOR</div>
        </div>
      </div>

      {tbUsername && (
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "0.5px solid var(--border,#e2e8f0)",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "var(--text-muted,#94a3b8)",
              marginBottom: 6,
            }}
          >
            SIGNED IN AS
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <span
              title={tbUsername}
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text-primary,#1e293b)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {tbUsername}
            </span>
            <span
              style={{
                flexShrink: 0,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.04em",
                padding: "2px 8px",
                borderRadius: 20,
                background:
                  tbAuthority === "TENANT_ADMIN" || tbAuthority === "SYS_ADMIN"
                    ? "rgba(0,200,255,0.15)"
                    : "rgba(148,163,184,0.15)",
                color:
                  tbAuthority === "TENANT_ADMIN" || tbAuthority === "SYS_ADMIN"
                    ? "#0088aa"
                    : "#64748b",
              }}
            >
              {tbAuthority === "TENANT_ADMIN" || tbAuthority === "SYS_ADMIN"
                ? "Admin"
                : tbAuthority === "CUSTOMER_USER"
                ? "Client"
                : "—"}
            </span>
          </div>
        </div>
      )}

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">FEATURES</div>

        <button
          className="nav-item"
          onClick={() => setOverviewModal(true)}
        >
          <span className="nav-icon">⊞</span>
          <span className="nav-label">Overview</span>
        </button>

        <button
          className={`nav-item${!notificationsOn ? " nav-item--muted" : ""}`}
          onClick={() => setNotificationsOn((v) => !v)}
        >
          <span className="nav-icon">{notificationsOn ? "🔔" : "🔕"}</span>
          <span className="nav-label">Alerts</span>
          {!notificationsOn && <span className="nav-badge">MUTED</span>}
        </button>

        <button
          className="nav-item"
          onClick={() => setOtaModal(true)}
        >
          <span className="nav-icon">⬆️</span>
          <span className="nav-label">OTA Update</span>
        </button>

        <button
          className="nav-item"
          onClick={() => setPrintModal(true)}
        >
          <span className="nav-icon">🖨️</span>
          <span className="nav-label">Print / Export</span>
        </button>

        <a
          href={
            selectedDeviceId
              ? `/settings?deviceId=${selectedDeviceId}`
              : "/settings"
          }
          className="nav-item"
        >
          <span className="nav-icon">⚙</span>
          <span className="nav-label">Settings</span>
        </a>

        {(tbAuthority === "TENANT_ADMIN" || tbAuthority === "SYS_ADMIN") && (
          <button
            className="nav-item"
            onClick={() => setAssignModal(true)}
          >
            <span className="nav-icon">➕</span>
            <span className="nav-label">Assign User</span>
          </button>
        )}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-status">
          <span
            className={`status-dot ${
              devicesLoading ? "connecting" : connected ? "" : "offline"
            }`}
          />
          <span className="sidebar-status-text">
            {devicesLoading
              ? "CONNECTING..."
              : connected
              ? "LIVE"
              : "OFFLINE"}
          </span>
        </div>
        {lastUpdate && (
          <div className="sidebar-last-update">
            Updated {formatTime(lastUpdate)}
          </div>
        )}
        <button
          className="nav-item"
          onClick={toggleTheme}
          title={
            theme === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          }
        >
          <span className="nav-icon">{theme === "light" ? "🌙" : "☀️"}</span>
          <span className="nav-label">
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </span>
        </button>
        <button
          className="refresh-btn"
          style={{ margin: "4px 2px 0" }}
          onClick={fetchDevices}
        >
          ⟳ REFRESH
        </button>
        <button
          className="refresh-btn"
          style={{ margin: "2px 2px 0", opacity: 0.7 }}
          onClick={logout}
        >
          ⏻ SIGN OUT
        </button>
      </div>
    </aside>
  );
}
