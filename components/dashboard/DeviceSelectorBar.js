// components/dashboard/DeviceSelectorBar.js
import React from "react";

export default function DeviceSelectorBar({
  devices,
  devicesLoading,
  selectedDeviceId,
  setSelectedDeviceId,
  deviceAlerts = {},
  setModalDevice,
  tbAuthority,
  handleDeleteNode,
  setAddNodeModal,
  patient,
  setPatientModal,
  deviceModeMap = {},
  handleSetDeviceMode,
  ecgEnabledMap = {},
  handleToggleEcg,
  settings = {},
  handleSetVitalInterval,
  selectedDevice,
}) {
  return (
    <>
      {/* ── Device Selector ── */}
      <div className="device-selector-bar">
        <div className="device-selector-label">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line
              x1="12"
              y1="18"
              x2="12"
              y2="18"
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>
          DEVICES
        </div>

        <div className="device-list">
          {devicesLoading ? (
            <div className="device-skeleton-row">
              {[1, 2, 3].map((i) => (
                <div key={i} className="device-card-skeleton" />
              ))}
            </div>
          ) : devices.length === 0 ? (
            <div className="no-devices">No devices found. Check /api/devices.</div>
          ) : (
            devices.map((device) => {
              const isSelected = device.id === selectedDeviceId;
              const hasAlert = deviceAlerts[device.id];
              return (
                <div key={device.id} className="device-card-wrapper">
                  <button
                    className={`device-card ${
                      isSelected ? "device-card--active" : ""
                    } ${hasAlert ? "device-card--alert" : ""}`}
                    onClick={() => setSelectedDeviceId(device.id)}
                    title={device.name}
                  >
                    <div className="device-card-top">
                      <span className="device-icon">
                        {hasAlert ? "⚠" : "📡"}
                      </span>
                      {hasAlert && <span className="alert-dot" />}
                    </div>
                    <div className="device-card-name">
                      {device.patientName || device.name}
                    </div>
                    <div className="device-card-sub">{device.name}</div>
                    <div
                      className={`device-online-pill ${
                        device.online ? "" : "offline"
                      }`}
                    >
                      {device.online ? "LIVE" : "OFFLINE"}
                      {device.battery != null && ` · 🔋${Math.round(device.battery)}%`}
                    </div>
                  </button>
                  <button
                    className="device-detail-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalDevice(device);
                    }}
                    title="View history"
                  >
                    ⤢
                  </button>
                  {(tbAuthority === "TENANT_ADMIN" ||
                    tbAuthority === "SYS_ADMIN") && (
                    <button
                      className="device-detail-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNode(device.id, device.name);
                      }}
                      title="Delete node"
                      style={{
                        top: 26,
                        color: "#e53e3e",
                        background: "rgba(229,62,62,0.12)",
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
        {(tbAuthority === "TENANT_ADMIN" || tbAuthority === "SYS_ADMIN") && (
          <button
            className="add-node-btn"
            onClick={() => setAddNodeModal(true)}
            title="Add new node"
          >
            + Node
          </button>
        )}
      </div>

      {/* ── Patient bar ── */}
      {patient && (
        <div
          className="patient-bar patient-bar--clickable"
          onClick={() => setPatientModal(true)}
          title="Click to view full patient info"
        >
          <div className="patient-avatar">🧑‍⚕️</div>
          <div className="patient-info">
            <div className="patient-name">
              {patient.patientName || "Patient"}
            </div>
            <div className="patient-meta">
              ID: {patient.patientId || "N/A"} &nbsp;|&nbsp; Ward:{" "}
              {patient.ward || "N/A"} &nbsp;|&nbsp; Physician:{" "}
              {patient.physician || "N/A"}
            </div>
          </div>
          <div className="patient-attrs">
            {[
              ["AGE", patient.age ? `${patient.age} yr` : "—"],
              ["GENDER", patient.gender || "—"],
              ["BLOOD", patient.bloodType || "—"],
              ["WEIGHT", patient.weight ? `${patient.weight} kg` : "—"],
            ].map(([lbl, val]) => (
              <div className="attr-item" key={lbl}>
                <span className="attr-label">{lbl}</span>
                <span className="attr-value">{val}</span>
              </div>
            ))}
          </div>
          <div className="patient-expand-hint">▸ VIEW</div>
        </div>
      )}

      {/* ── Device mode tabs ── */}
      {selectedDeviceId &&
        (() => {
          const mode = deviceModeMap[selectedDeviceId] ?? 0;
          const ecgOn = ecgEnabledMap[selectedDeviceId] !== false;
          const MODES = [
            {
              id: 0,
              icon: "⚡",
              label: "Continuous",
              desc: "Real-time full data stream",
            },
            {
              id: 1,
              icon: "⏱",
              label: "Periodic",
              desc: "Reports at the vital interval",
            },
          ];
          const intervalLabel = `Wake ${settings.periodicInterval || 30}s · Capture ${
            settings.captureWindow || 10
          }s`;
          return (
            <div className="device-mode-bar">
              <span className="device-mode-label">MODE</span>
              <div className="device-mode-tabs">
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    className={`device-mode-tab${
                      mode === m.id ? " device-mode-tab--active" : ""
                    }`}
                    onClick={() =>
                      handleSetDeviceMode(selectedDeviceId, m.id)
                    }
                    title={m.desc}
                  >
                    <span className="mode-icon">{m.icon}</span>
                    <span className="mode-label">{m.label}</span>
                  </button>
                ))}
                {/* ECG is an independent flag, selectable alongside the base mode */}
                <button
                  className={`device-mode-tab${
                    ecgOn ? " device-mode-tab--active" : ""
                  }`}
                  onClick={() => handleToggleEcg(selectedDeviceId, ecgOn)}
                  title="Stream the ECG waveform alongside vitals — toggle off to stop ECG batches and hide the graph"
                >
                  <span className="mode-icon">💓</span>
                  <span className="mode-label">
                    ECG {ecgOn ? "ON" : "OFF"}
                  </span>
                </button>
              </div>

              {/* Quick vital reporting interval selector */}
              <div className="device-mode-tabs" style={{ marginLeft: "10px" }}>
                <span
                  className="device-mode-label"
                  style={{
                    alignSelf: "center",
                    marginRight: "4px",
                    fontSize: "10px",
                    fontWeight: "700",
                  }}
                >
                  RATE
                </span>
                {[1, 2, 5].map((sec) => {
                  const ms = sec * 1000;
                  const isActive = (settings.vitalInterval || 1000) === ms;
                  return (
                    <button
                      key={sec}
                      className={`device-mode-tab${
                        isActive ? " device-mode-tab--active" : ""
                      }`}
                      onClick={() =>
                        handleSetVitalInterval(selectedDeviceId, ms)
                      }
                      title={`Configure node reporting interval to ${sec}s (${ms}ms)`}
                    >
                      <span className="mode-label">{sec}s</span>
                    </button>
                  );
                })}
              </div>
              {mode === 1 && (
                <div className="device-mode-hint">
                  <strong>{intervalLabel}</strong>
                  &nbsp;·&nbsp;
                  <a
                    href={`/settings?deviceId=${selectedDeviceId}`}
                    className="mode-settings-link"
                  >
                    Adjust in Settings ⚙
                  </a>
                </div>
              )}
            </div>
          );
        })()}

      {/* ── Selected device header ── */}
      {selectedDevice && (
        <div className="active-device-banner">
          <span className="active-device-icon">📡</span>
          <span className="active-device-name">
            {selectedDevice.patientName || selectedDevice.name}
          </span>
          <span className="active-device-label">
            — {selectedDevice.name}
          </span>
          <span className="active-device-id">ID: {selectedDevice.id}</span>
        </div>
      )}
    </>
  );
}
