// components/AddNodeModal.js
import React, { useState, useEffect } from "react";
import { createDevice } from "../lib/tbBrowserClient";

export default function AddNodeModal({ onClose, onCreated, token, gatewayId }) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const handleCreate = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setMsg({ type: "err", text: "Node name is required." });
      return;
    }
    if (!trimmed.toLowerCase().includes("node")) {
      setMsg({
        type: "err",
        text: 'Name must contain "node" (e.g. Node7, NodeBed3).',
      });
      return;
    }
    setSaving(true);
    setMsg(null);
    try {
      await createDevice(token, trimmed);
      setMsg({ type: "ok", text: `"${trimmed}" created ✓` });
      setTimeout(() => {
        onCreated();
        onClose();
      }, 800);
    } catch (e) {
      setMsg({ type: "err", text: e.message });
      setSaving(false);
    }
  };

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
          background: "var(--bg-card,#fff)",
          borderRadius: 16,
          border: "0.5px solid var(--border,#e2e8f0)",
          width: "100%",
          maxWidth: 460,
          animation: "ota-in .18s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`@keyframes ota-in{from{opacity:0;transform:scale(.96) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "0.5px solid var(--border,#e2e8f0)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "rgba(91,155,213,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              📡
            </div>
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--text-primary,#1e293b)",
                }}
              >
                Add New Node
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-muted,#94a3b8)",
                }}
              >
                Create a new device in ThingsBoard
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
              color: "var(--text-muted,#94a3b8)",
              padding: "4px 8px",
              borderRadius: 6,
              fontFamily: "inherit",
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "16px 20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--text-muted,#64748b)",
                letterSpacing: "0.06em",
                marginBottom: 8,
              }}
            >
              DEVICE NAME
            </div>
            <input
              autoFocus
              type="text"
              placeholder="e.g. Node7, NodeBed3, NodeICU"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate();
              }}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "9px 12px",
                borderRadius: 8,
                border: "1.5px solid var(--border,#e2e8f0)",
                background: "var(--bg-void,#f8fafc)",
                color: "var(--text-primary,#1e293b)",
                fontSize: 14,
                fontWeight: 600,
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <div
              style={{
                fontSize: 11,
                color: "var(--text-muted,#94a3b8)",
                marginTop: 6,
              }}
            >
              Name must contain <strong>node</strong> to appear in the
              dashboard.
            </div>
          </div>

          {msg && (
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                fontSize: 13,
                background: msg.type === "ok" ? "#d1fae5" : "#fee2e2",
                color: msg.type === "ok" ? "#065f46" : "#991b1b",
              }}
            >
              {msg.text}
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={onClose}
              style={{
                padding: "8px 18px",
                borderRadius: 8,
                border: "1px solid var(--border,#e2e8f0)",
                background: "none",
                cursor: "pointer",
                fontSize: 13,
                color: "var(--text-primary,#1e293b)",
                fontFamily: "inherit",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={saving}
              style={{
                padding: "8px 22px",
                borderRadius: 8,
                border: "none",
                background: saving ? "#94a3b8" : "#5B9BD5",
                color: "#fff",
                fontWeight: 700,
                cursor: saving ? "not-allowed" : "pointer",
                fontSize: 13,
                fontFamily: "inherit",
              }}
            >
              {saving ? "Creating…" : "Create Node"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
