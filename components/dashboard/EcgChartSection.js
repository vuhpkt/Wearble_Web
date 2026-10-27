// components/dashboard/EcgChartSection.js
import React, { memo } from "react";
import TrendChart from "../TrendChart";
import { SIGNAL_WINDOWS } from "../SignalModal";

function EcgChartSection({
  selectedDeviceId,
  isEcgEnabled,
  ecgSampleFreq = 250,
  ecgPacketInterval = 200,
  ecgPaused,
  setEcgPaused,
  noSignal,
  ecgWindowSec,
  setEcgWindowSec,
  ecgYMin,
  setEcgYMin,
  ecgYMax,
  setEcgYMax,
  ecgZoomInput,
  setEcgZoomInput,
  pausedEcgDataRef,
  ecgData,
  onOpenModal,
}) {
  if (!selectedDeviceId || isEcgEnabled === false) {
    return null;
  }

  return (
    <div
      className="chart-section chart-section--clickable"
      onClick={onOpenModal}
    >
      <div className="chart-header">
        <span className="chart-title">ECG SIGNAL</span>
        <span className="chart-subtitle">
          (Live · {ecgSampleFreq}Hz · pkt {ecgPacketInterval}ms)
        </span>
        <span
          className="chart-badge"
          style={{
            color: ecgPaused
              ? "var(--amber,#f59e0b)"
              : noSignal
              ? "var(--amber)"
              : "var(--green)",
          }}
        >
          {ecgPaused ? "PAUSED" : noSignal ? "NO SIGNAL" : "LIVE"}
        </span>
        <span className="chart-expand-hint">⤢ EXPAND</span>
      </div>

      {/* Display window + zoom controls — stop propagation so clicks don't open modal */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 0 8px",
          flexWrap: "wrap",
        }}
        onClick={(e) => e.stopPropagation()}
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
              onClick={() => setEcgWindowSec(w.value)}
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: 5,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                background:
                  ecgWindowSec === w.value
                    ? "var(--bg-card, #fff)"
                    : "transparent",
                color:
                  ecgWindowSec === w.value
                    ? "var(--green, #70AD47)"
                    : "var(--text-muted, #94a3b8)",
                boxShadow:
                  ecgWindowSec === w.value
                    ? "0 1px 3px rgba(0,0,0,0.1)"
                    : "none",
                transition: "all 0.12s",
              }}
            >
              {w.label}
            </button>
          ))}
        </div>

        {/* Y-axis zoom */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginLeft: 6,
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
            ZOOM
          </span>
          <button
            onClick={() => {
              const h = Math.round(Math.abs(ecgYMax) * 1.5);
              setEcgYMin(-h);
              setEcgYMax(h);
              setEcgZoomInput(String((h / 1000).toFixed(1)));
            }}
            title="Zoom out"
            style={{
              width: 24,
              height: 24,
              borderRadius: 5,
              border: "1px solid var(--border,#e2e8f0)",
              background: "var(--bg-void,#f1f5f9)",
              cursor: "pointer",
              fontSize: 15,
              lineHeight: 1,
              fontFamily: "inherit",
              color: "var(--text-muted,#94a3b8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            −
          </button>
          <span
            style={{ fontSize: 10, color: "var(--text-muted,#94a3b8)" }}
          >
            ±
          </span>
          <input
            type="number"
            value={ecgZoomInput}
            onChange={(e) => setEcgZoomInput(e.target.value)}
            onBlur={() => {
              const k = parseFloat(ecgZoomInput);
              if (!isNaN(k) && k > 0) {
                const h = Math.round(k * 1000);
                setEcgYMin(-h);
                setEcgYMax(h);
              } else {
                setEcgZoomInput(String((ecgYMax / 1000).toFixed(1)));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.target.blur();
            }}
            title="Y-axis range in k (e.g. 7 = ±7000)"
            style={{
              width: 52,
              height: 24,
              borderRadius: 5,
              border: "1px solid var(--border,#e2e8f0)",
              background: "var(--bg-void,#f1f5f9)",
              cursor: "text",
              fontSize: 11,
              fontFamily: "inherit",
              color: "var(--text-muted,#94a3b8)",
              textAlign: "center",
              padding: "0 4px",
            }}
          />
          <span
            style={{ fontSize: 10, color: "var(--text-muted,#94a3b8)" }}
          >
            k
          </span>
          <button
            onClick={() => {
              const h = Math.max(
                100,
                Math.round(Math.abs(ecgYMax) / 1.5)
              );
              setEcgYMin(-h);
              setEcgYMax(h);
              setEcgZoomInput(String((h / 1000).toFixed(1)));
            }}
            title="Zoom in"
            style={{
              width: 24,
              height: 24,
              borderRadius: 5,
              border: "1px solid var(--border,#e2e8f0)",
              background: "var(--bg-void,#f1f5f9)",
              cursor: "pointer",
              fontSize: 15,
              lineHeight: 1,
              fontFamily: "inherit",
              color: "var(--text-muted,#94a3b8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </button>
        </div>

        {/* Pause / Resume live graph */}
        <button
          onClick={() => {
            if (!ecgPaused) {
              pausedEcgDataRef.current = ecgData;
            }
            setEcgPaused((p) => !p);
          }}
          title={ecgPaused ? "Resume live graph" : "Pause graph"}
          style={{
            marginLeft: 6,
            height: 24,
            padding: "0 10px",
            borderRadius: 5,
            border: "1px solid var(--border,#e2e8f0)",
            background: ecgPaused
              ? "var(--amber,#f59e0b)"
              : "var(--bg-void,#f1f5f9)",
            cursor: "pointer",
            fontSize: 10,
            fontWeight: 700,
            fontFamily: "inherit",
            color: ecgPaused ? "#fff" : "var(--text-muted,#94a3b8)",
            letterSpacing: "0.05em",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {ecgPaused ? "▶ RESUME" : "⏸ PAUSE"}
        </button>
      </div>

      <TrendChart
        series={ecgPaused ? pausedEcgDataRef.current : ecgData}
        metricKey="ecg"
        loading={false}
        isLiveWaveform={true}
        stroke="var(--green)"
        sampleFreqHz={ecgSampleFreq}
        liveWindowSec={ecgWindowSec}
        yMin={ecgYMin}
        yMax={ecgYMax}
      />
    </div>
  );
}

export default memo(EcgChartSection);
