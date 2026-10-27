// components/OverviewModal.js
import React, { useEffect } from "react";
import OverviewGrid from "./OverviewGrid";

export default function OverviewModal({
  devices,
  vitalsMap,
  selectedDeviceId,
  onSelectDevice,
  onClose,
  settingsMap,
}) {
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        style={{
          background: "var(--bg-card, #fff)",
          borderRadius: 16,
          border: "0.5px solid var(--border, #e2e8f0)",
          width: "100%",
          maxWidth: 900,
          maxHeight: "90vh",
          overflowY: "auto",
          animation: "ov-in .18s ease",
        }}
      >
        <style>{`@keyframes ov-in{from{opacity:0;transform:scale(.96) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "0.5px solid var(--border, #e2e8f0)",
            position: "sticky",
            top: 0,
            background: "var(--bg-card, #fff)",
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "rgba(0,200,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              ⊞
            </div>
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--text-primary, #1e293b)",
                }}
              >
                Overview
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-muted, #94a3b8)",
                }}
              >
                All nodes — live vitals snapshot · {devices.length} node
                {devices.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              fontSize: 22,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted, #94a3b8)",
              padding: "4px 8px",
              borderRadius: 6,
              fontFamily: "inherit",
            }}
          >
            ×
          </button>
        </div>

        {/* Grid */}
        <OverviewGrid
          devices={devices}
          vitalsMap={vitalsMap}
          selectedDeviceId={selectedDeviceId}
          onSelectDevice={onSelectDevice}
          settingsMap={settingsMap}
        />
      </div>
    </div>
  );
}
