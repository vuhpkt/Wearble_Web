// hooks/useDashboardDevices.js
import { useState, useEffect, useCallback, useRef } from "react";
import { getDevices, saveDeviceAttributes, deleteDevice } from "../lib/tbBrowserClient";

export function useDashboardDevices({
  tbAuthToken,
  tbAuthority,
  tbCustomerId,
  settings,
  getSettings,
  updateSettings,
  onError,
}) {
  const [devices, setDevices] = useState([]);
  const [devicesLoading, setDevicesLoading] = useState(true);
  const [selectedDeviceId, setSelectedDeviceIdRaw] = useState(null);
  const [ecgEnabledMap, setEcgEnabledMap] = useState({});
  const [deviceModeMap, setDeviceModeMap] = useState({});
  const hasDevicesRef = useRef(false);

  // Restore last-viewed device from localStorage once on mount
  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("selectedDeviceId");
    if (saved) setSelectedDeviceIdRaw(saved);
  }, []);

  // Wrap setter to persist automatically
  const setSelectedDeviceId = useCallback((idOrUpdater) => {
    setSelectedDeviceIdRaw((prev) => {
      const next = typeof idOrUpdater === "function" ? idOrUpdater(prev) : idOrUpdater;
      if (typeof window !== "undefined") {
        if (next) localStorage.setItem("selectedDeviceId", next);
        else localStorage.removeItem("selectedDeviceId");
      }
      return next;
    });
  }, []);

  const fetchDevices = useCallback(async () => {
    if (!tbAuthToken) return;
    if (!hasDevicesRef.current) setDevicesLoading(true);
    try {
      const list = await getDevices(tbAuthToken, { authority: tbAuthority, customerId: tbCustomerId });
      setDevices(list);
      setSelectedDeviceId((prev) => {
        if (prev && list.some((d) => d.id === prev)) return prev;
        return list.length > 0 ? list[0].id : prev;
      });
      setEcgEnabledMap((prev) => {
        const updated = { ...prev };
        list.forEach((d) => {
          if (d.showEcg !== undefined && d.showEcg !== null) {
            updated[d.id] = (d.showEcg !== 0 && d.showEcg !== false && d.showEcg !== "0" && d.showEcg !== "false");
          } else if (updated[d.id] === undefined) {
            updated[d.id] = true;
          }
        });
        return updated;
      });
      setDeviceModeMap((prev) => {
        const updated = { ...prev };
        list.forEach((d) => {
          if (d.deviceMode !== undefined && d.deviceMode !== null) {
            updated[d.id] = Number(d.deviceMode) || 0;
          } else if (updated[d.id] === undefined) {
            updated[d.id] = 0;
          }
        });
        return updated;
      });
      hasDevicesRef.current = true;
    } catch (err) {
      console.error("Device list fetch error:", err);
      if (onError) onError(err.message);
    } finally {
      setDevicesLoading(false);
    }
  }, [tbAuthToken, tbAuthority, tbCustomerId, onError, setSelectedDeviceId]);

  const handleToggleEcg = useCallback(async (deviceId, currentlyEnabled) => {
    const newVal = !currentlyEnabled;
    setEcgEnabledMap((prev) => ({ ...prev, [deviceId]: newVal }));
    const currentMode = deviceModeMap[deviceId] ?? 0;
    const devSettings = getSettings ? getSettings(deviceId) : null;
    const pInterval = devSettings?.periodicInterval ?? settings?.periodicInterval ?? 10;
    const capWindow = devSettings?.captureWindow ?? settings?.captureWindow ?? 5;
    try {
      await saveDeviceAttributes(tbAuthToken, deviceId, "SHARED_SCOPE", {
        showEcg: newVal ? 1 : 0,
        ecgEnabled: newVal ? 1 : 0,
        deviceMode: currentMode,
        periodicInterval: pInterval,
        captureWindow: capWindow,
      });
    } catch (e) {
      console.warn("Failed to save showEcg remotely:", e);
    }
  }, [tbAuthToken, deviceModeMap, getSettings, settings]);

  const handleSetDeviceMode = useCallback(async (deviceId, mode) => {
    setDeviceModeMap((p) => ({ ...p, [deviceId]: mode }));
    const currentEcg = ecgEnabledMap[deviceId] !== false;
    const devSettings = getSettings ? getSettings(deviceId) : null;
    const pInterval = devSettings?.periodicInterval ?? settings?.periodicInterval ?? 10;
    const capWindow = devSettings?.captureWindow ?? settings?.captureWindow ?? 5;
    try {
      await saveDeviceAttributes(tbAuthToken, deviceId, "SHARED_SCOPE", {
        deviceMode: mode,
        showEcg: currentEcg ? 1 : 0,
        ecgEnabled: currentEcg ? 1 : 0,
        periodicInterval: pInterval,
        captureWindow: capWindow,
      });
    } catch (e) {
      console.warn("Failed to save deviceMode remotely:", e);
    }
  }, [tbAuthToken, ecgEnabledMap, getSettings, settings]);

  const handleSetVitalInterval = useCallback(async (deviceId, intervalSec) => {
    if (updateSettings) {
      updateSettings({ ...settings, vitalInterval: intervalSec });
    }
    try {
      await saveDeviceAttributes(tbAuthToken, deviceId, "SHARED_SCOPE", { vitalInterval: intervalSec });
    } catch (e) {
      console.warn("Failed to save vitalInterval remotely:", e);
    }
  }, [tbAuthToken, settings, updateSettings]);

  const handleDeleteNode = useCallback(async (deviceId, deviceName) => {
    if (!window.confirm(`Delete "${deviceName}" from ThingsBoard?\n\nThis is permanent — all telemetry history will be lost.`)) return;
    try {
      await deleteDevice(tbAuthToken, deviceId);
      if (selectedDeviceId === deviceId) setSelectedDeviceId(null);
      await fetchDevices();
    } catch (e) {
      alert(`Failed to delete: ${e.message}`);
    }
  }, [tbAuthToken, selectedDeviceId, fetchDevices, setSelectedDeviceId]);

  // Initial and periodic polling
  useEffect(() => {
    if (tbAuthToken) fetchDevices();
  }, [tbAuthToken, fetchDevices]);

  useEffect(() => {
    if (!tbAuthToken) return;
    const id = setInterval(fetchDevices, 15000);
    return () => clearInterval(id);
  }, [tbAuthToken, fetchDevices]);

  return {
    devices,
    setDevices,
    devicesLoading,
    selectedDeviceId,
    setSelectedDeviceId,
    ecgEnabledMap,
    deviceModeMap,
    fetchDevices,
    handleToggleEcg,
    handleSetDeviceMode,
    handleSetVitalInterval,
    handleDeleteNode,
  };
}
