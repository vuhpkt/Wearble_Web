// components/SignalModal.js
import React, { useEffect } from "react";
import TrendChart from "./TrendChart";

export const SIGNAL_META = {
  ecg: { label: "ECG SIGNAL", color: "#FF96B7", unit: "µV" },
  ppg: { label: "PPG SIGNAL", color: "#70AD47", unit: "a.u." },
};

export const SIGNAL_WINDOWS = [
  { label: "3s",  value: 3  },
  { label: "5s",  value: 5  },
  { label: "10s", value: 10 },
  { label: "30s", value: 30 },
  { label: "60s", value: 60 },
];

export default function SignalModal({
  signalKey,
  series,
  sampleFreqHz = 250,
  windowSec = 10,
  onWindowSecChange,
  yMin = -7000,
  yMax = 7000,
  onClose,
}) {
  const meta = SIGNAL_META[signalKey];

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const latestTs = series?.length ? series[series.length - 1].ts : Date.now();
  const displayData = (series || []).filter(
    (d) => d.ts >= latestTs - windowSec * 1000
  );
  const pointCount = displayData.length;
  const effectiveHz =
    pointCount > 0 ? Math.round(pointCount / windowSec) : 0;

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
          border: `1.5px solid ${meta.color}30`,
          width: "100%",
          maxWidth: 900,
          maxHeight: "90vh",
          overflowY: "auto",
          animation: "sm-in .18s ease",
          boxShadow: `0 0 40px ${meta.color}18`,
        }}
      >
        <style>{`@keyframes sm-in{from{opacity:0;transform:scale(.97) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: `1px solid ${meta.color}20`,
            position: "sticky",
            top: 0,
            background: "var(--bg-card, #fff)",
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: `${meta.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                color: meta.color,
                fontWeight: 700,
              }}
            >
              〜
            </div>
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: "var(--text-primary, #1e293b)",
                }}
              >
                {meta.label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-muted, #94a3b8)",
                  marginTop: 2,
                }}
              >
                Live · WebSocket · {pointCount} pts · ~{effectiveHz} Hz · last{" "}
                {windowSec}s
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

        {/* Display window bar — synced with main page */}
        {onWindowSecChange && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderBottom: `1px solid ${meta.color}15`,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "var(--text-muted, #94a3b8)",
              }}
            >
              DISPLAY WINDOW
            </span>
            <div
              style={{
                display: "flex",
                gap: 3,
                background: "var(--bg-void, #f1f5f9)",
                borderRadius: 7,
                padding: 2,
              }}
            >
              {SIGNAL_WINDOWS.map((w) => (
                <button
                  key={w.label}
                  onClick={() => onWindowSecChange(w.value)}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 5,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    background:
                      windowSec === w.value
                        ? "var(--bg-card, #fff)"
                        : "transparent",
                    color:
                      windowSec === w.value
                        ? meta.color
                        : "var(--text-muted, #94a3b8)",
                    boxShadow:
                      windowSec === w.value
                        ? "0 1px 3px rgba(0,0,0,0.1)"
                        : "none",
                    transition: "all 0.12s",
                  }}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Large chart — no controls, window matches main page selection */}
        <div style={{ padding: "16px 20px 24px" }}>
          <TrendChart
            series={series}
            metricKey={signalKey}
            loading={false}
            isLiveWaveform={true}
            stroke={meta.color}
            sampleFreqHz={sampleFreqHz}
            liveWindowSec={windowSec}
            yMin={yMin}
            yMax={yMax}
            height={360}
          />
        </div>
      </div>
    </div>
  );
}
