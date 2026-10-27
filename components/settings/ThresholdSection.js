// components/settings/ThresholdSection.js
import React from "react";

export const VITAL_LABELS = {
  ppgHeartRate: { label: "PPG HEART RATE", unit: "bpm" },
  ecgHeartRate: { label: "ECG HEART RATE", unit: "bpm" },
  spo2:         { label: "SpO₂",           unit: "%"   },
  temperature:  { label: "TEMPERATURE",    unit: "°C"  },
  battery:      { label: "BATTERY",         unit: "%"   },
};

export default function ThresholdSection({ perm, thresholds, setField }) {
  if (!perm?.editThresholds) return null;

  return (
    <section className="settings-section">
      <div className="section-title">VITAL THRESHOLDS</div>
      <div className="section-sub">
        Saved as Shared attributes on this node in ThingsBoard. Dashboard uses
        all tiers for color-coding; gateway forwards warn thresholds to
        firmware.
      </div>

      {Object.entries(thresholds).map(([vital, vals]) => {
        const meta = VITAL_LABELS[vital] || {
          label: vital.toUpperCase(),
          unit: "",
        };
        const step = vital === "temperature" ? "0.1" : "1";
        return (
          <div className="threshold-card" key={vital}>
            <div className="threshold-card-header">
              <span className="threshold-vital-name">{meta.label}</span>
              <span className="threshold-unit">{meta.unit}</span>
            </div>
            <div className="threshold-tiers">
              <div className="tier-group tier-normal">
                <div className="tier-label">🟢 NORMAL</div>
                <div className="tier-fields">
                  <label className="threshold-field normal">
                    <span>Min</span>
                    <input
                      type="number"
                      step={step}
                      value={vals.normalMin}
                      onChange={(e) =>
                        setField(vital, "normalMin", e.target.value)
                      }
                    />
                  </label>
                  <label className="threshold-field normal">
                    <span>Max</span>
                    <input
                      type="number"
                      step={step}
                      value={vals.normalMax}
                      onChange={(e) =>
                        setField(vital, "normalMax", e.target.value)
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="tier-group tier-warning">
                <div className="tier-label">🟡 WARNING</div>
                <div className="tier-fields">
                  <label className="threshold-field warning">
                    <span>Min</span>
                    <input
                      type="number"
                      step={step}
                      value={vals.warnMin}
                      onChange={(e) =>
                        setField(vital, "warnMin", e.target.value)
                      }
                    />
                  </label>
                  <label className="threshold-field warning">
                    <span>Max</span>
                    <input
                      type="number"
                      step={step}
                      value={vals.warnMax}
                      onChange={(e) =>
                        setField(vital, "warnMax", e.target.value)
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="tier-group tier-danger">
                <div className="tier-label">🔴 DANGEROUS</div>
                <div className="tier-fields">
                  <label className="threshold-field danger">
                    <span>Min</span>
                    <input
                      type="number"
                      step={step}
                      value={vals.dangerMin}
                      onChange={(e) =>
                        setField(vital, "dangerMin", e.target.value)
                      }
                    />
                  </label>
                  <label className="threshold-field danger">
                    <span>Max</span>
                    <input
                      type="number"
                      step={step}
                      value={vals.dangerMax}
                      onChange={(e) =>
                        setField(vital, "dangerMax", e.target.value)
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
