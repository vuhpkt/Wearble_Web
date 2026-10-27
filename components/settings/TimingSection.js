// components/settings/TimingSection.js
import React from "react";

export const DEVICE_MODE_OPTIONS = [
  { value: 0, label: "Continuous" },
  { value: 1, label: "Periodic" },
];

export const PPG_FREQ_OPTIONS = [50, 100, 200, 400, 800, 1000];
export const ECG_FREQ_PRESETS = [50, 125, 250, 500, 1000];
export const ECG_PACKET_PRESETS = [50, 100, 200, 500, 1000];

const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

export default function TimingSection({
  perm,
  deviceMode,
  setDeviceMode,
  lcdInterval,
  setLcdInterval,
  periodicInterval,
  setPeriodicInterval,
  captureWindow,
  setCaptureWindow,
  vitalInterval,
  setVitalInterval,
  ecgSampleFreq,
  setEcgSampleFreq,
  ecgPacketInterval,
  setEcgPacketInterval,
  ppgSampleFreq,
  setPpgSampleFreq,
  ppgHrSource,
  setPpgHrSource,
}) {
  return (
    <>
      {/* ── Operating mode ── */}
      {perm?.editModes && (
        <section className="settings-section">
          <div className="section-title">OPERATING MODE</div>
          <div className="section-sub">
            Saved as Shared attributes. <strong>Continuous</strong> samples
            non-stop and reports on the vital interval.{" "}
            <strong>Periodic</strong> wakes every interval, measures for the
            capture window, sends one averaged vital, then sleeps.{" "}
            <strong>ECG</strong> streams the 250&nbsp;Hz waveform.
          </div>
          <div className="interval-presets">
            {DEVICE_MODE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`preset-btn ${
                  deviceMode === opt.value ? "preset-btn--active" : ""
                }`}
                onClick={() => setDeviceMode(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {deviceMode === 0 && (
            <div className="ecg-field-group">
              <div className="ecg-field-label">
                LCD DASHBOARD INTERVAL
                <span className="ecg-field-unit">s</span>
              </div>
              <div className="ecg-field-sub">
                How often the on-device LCD dashboard refreshes (HR, SpO₂,
                temperature, BLE status) while in Continuous mode.
              </div>
              <div className="interval-row">
                <input
                  type="number"
                  min={1}
                  max={30}
                  step={1}
                  value={lcdInterval / 1000}
                  onChange={(e) =>
                    setLcdInterval(
                      clamp(Number(e.target.value) || 0, 1, 30) * 1000
                    )
                  }
                  className="interval-num-input"
                />
                <span className="interval-value">s</span>
              </div>
            </div>
          )}

          {deviceMode === 1 && (
            <>
              {/* Periodic wake-to-wake interval */}
              <div className="ecg-field-group">
                <div className="ecg-field-label">
                  WAKE INTERVAL
                  <span className="ecg-field-unit">s</span>
                </div>
                <div className="ecg-field-sub">
                  How often the device wakes to take a measurement.
                </div>
                <div className="interval-row">
                  <input
                    type="number"
                    step={1}
                    value={periodicInterval}
                    onChange={(e) => {
                      const v = Number(e.target.value) || 0;
                      setPeriodicInterval(v);
                      if (captureWindow >= v)
                        setCaptureWindow(Math.max(0, v - 1));
                    }}
                    className="interval-num-input"
                  />
                  <span className="interval-value">s</span>
                </div>
              </div>

              {/* Periodic capture window */}
              <div className="ecg-field-group">
                <div className="ecg-field-label">
                  CAPTURE WINDOW
                  <span className="ecg-field-unit">s</span>
                </div>
                <div className="ecg-field-sub">
                  How long the device measures each time it wakes (must be less
                  than wake interval).
                </div>
                <div className="interval-row">
                  <input
                    type="number"
                    min={0}
                    max={Math.max(0, periodicInterval - 1)}
                    step={1}
                    value={captureWindow}
                    onChange={(e) =>
                      setCaptureWindow(
                        clamp(
                          Number(e.target.value) || 0,
                          0,
                          Math.max(0, periodicInterval - 1)
                        )
                      )
                    }
                    className="interval-num-input"
                  />
                  <span className="interval-value">s</span>
                </div>
              </div>
            </>
          )}
        </section>
      )}

      {/* ── Vital interval ── */}
      {perm?.editIntervals && (
        <section className="settings-section">
          <div className="section-title">VITAL INTERVAL</div>
          <div className="section-sub">
            Saved as a Shared attribute. Controls how frequently the node
            reports vital signs (HR, SpO₂, temperature) to the gateway. Lower =
            more frequent updates, higher power consumption.
          </div>
          <div className="interval-row">
            <input
              type="number"
              min={1}
              max={30}
              step={1}
              value={vitalInterval / 1000}
              onChange={(e) =>
                setVitalInterval(
                  clamp(Number(e.target.value) || 0, 1, 30) * 1000
                )
              }
              className="interval-num-input"
            />
            <span className="interval-value">s</span>
          </div>
        </section>
      )}

      {/* ── ECG & PPG settings ── */}
      {perm?.editSensors && (
        <>
          <section className="settings-section">
            <div className="section-title">ECG SETTINGS</div>
            <div className="section-sub">
              Saved as Shared attributes. The firmware reads these values to
              configure ECG acquisition and streaming behaviour.
            </div>

            {/* ECG sample frequency */}
            <div className="ecg-field-group">
              <div className="ecg-field-label">
                SAMPLE FREQUENCY
                <span className="ecg-field-unit">Hz</span>
              </div>
              <div className="ecg-field-sub">
                ADC sampling rate for the ECG signal. Higher rate captures more
                detail but increases data volume.
              </div>
              <div className="interval-row">
                <input
                  type="range"
                  min={50}
                  max={1000}
                  step={50}
                  value={ecgSampleFreq}
                  onChange={(e) => setEcgSampleFreq(Number(e.target.value))}
                  className="interval-slider"
                />
                <span className="interval-value">{ecgSampleFreq} Hz</span>
              </div>
              <div className="interval-presets">
                {ECG_FREQ_PRESETS.map((v) => (
                  <button
                    key={v}
                    className={`preset-btn ${
                      ecgSampleFreq === v ? "preset-btn--active" : ""
                    }`}
                    onClick={() => setEcgSampleFreq(v)}
                  >
                    {v} Hz
                  </button>
                ))}
              </div>
            </div>

            {/* ECG packet send interval */}
            <div className="ecg-field-group">
              <div className="ecg-field-label">
                PACKET SEND INTERVAL
                <span className="ecg-field-unit">ms</span>
              </div>
              <div className="ecg-field-sub">
                How often accumulated ECG samples are sent as a packet. Lower =
                lower latency, more packets per second.
              </div>
              <div className="interval-row">
                <input
                  type="range"
                  min={50}
                  max={2000}
                  step={50}
                  value={ecgPacketInterval}
                  onChange={(e) => setEcgPacketInterval(Number(e.target.value))}
                  className="interval-slider"
                />
                <span className="interval-value">{ecgPacketInterval} ms</span>
              </div>
              <div className="interval-presets">
                {ECG_PACKET_PRESETS.map((v) => (
                  <button
                    key={v}
                    className={`preset-btn ${
                      ecgPacketInterval === v ? "preset-btn--active" : ""
                    }`}
                    onClick={() => setEcgPacketInterval(v)}
                  >
                    {v} ms
                  </button>
                ))}
              </div>
              <div className="interval-hint">
                Samples per packet = {ecgSampleFreq} Hz × {ecgPacketInterval} ms
                / 1000 ={" "}
                <strong>
                  {Math.round((ecgSampleFreq * ecgPacketInterval) / 1000)}{" "}
                  samples
                </strong>
              </div>
            </div>
          </section>

          {/* ── PPG settings ── */}
          <section className="settings-section">
            <div className="section-title">PPG SETTINGS</div>
            <div className="section-sub">
              Saved as Shared attributes. Controls the MAX30102 sensor:
              photodetector sampling rate and LED drive currents for SpO₂ and
              heart rate acquisition.
            </div>

            {/* PPG sample frequency */}
            <div className="ecg-field-group">
              <div className="ecg-field-label">
                SAMPLE FREQUENCY
                <span className="ecg-field-unit">Hz</span>
              </div>
              <div className="ecg-field-sub">
                Photodetector sampling rate. Higher rates improve signal quality
                but increase power consumption.
              </div>
              <div className="interval-row">
                <input
                  type="range"
                  min={PPG_FREQ_OPTIONS[0]}
                  max={PPG_FREQ_OPTIONS[PPG_FREQ_OPTIONS.length - 1]}
                  step={50}
                  value={ppgSampleFreq}
                  onChange={(e) => setPpgSampleFreq(Number(e.target.value))}
                  className="interval-slider"
                />
                <span className="interval-value">{ppgSampleFreq} Hz</span>
              </div>
              <div className="interval-presets">
                {PPG_FREQ_OPTIONS.map((v) => (
                  <button
                    key={v}
                    className={`preset-btn ${
                      ppgSampleFreq === v ? "preset-btn--active" : ""
                    }`}
                    onClick={() => setPpgSampleFreq(v)}
                  >
                    {v} Hz
                  </button>
                ))}
              </div>
            </div>

            {/* HR source LED */}
            <div className="ecg-field-group">
              <div className="ecg-field-label">HEART RATE SOURCE</div>
              <div className="ecg-field-sub">
                Which LED channel's pulse waveform is used to detect heartbeats
                for PPG heart rate.
              </div>
              <div className="interval-presets">
                <button
                  className={`preset-btn preset-btn--ir ${
                    ppgHrSource === "ir" ? "preset-btn--active" : ""
                  }`}
                  onClick={() => setPpgHrSource("ir")}
                >
                  IR LED
                </button>
                <button
                  className={`preset-btn preset-btn--red ${
                    ppgHrSource === "red" ? "preset-btn--active" : ""
                  }`}
                  onClick={() => setPpgHrSource("red")}
                >
                  RED LED
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
