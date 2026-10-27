// components/dashboard/DashboardModals.js
import React from "react";
import NodeDetailModal from "../NodeDetailModal";
import VitalHistoryModal from "../VitalHistoryModal";
import OverviewModal from "../OverviewModal";
import SignalModal from "../SignalModal";
import AddNodeModal from "../AddNodeModal";
import PatientModal from "../PatientModal";
import OtaModal from "../OtaModal";
import PrintModal from "../PrintModal";
import AssignModal from "../AssignModal";
import { GATEWAY_ID } from "../../lib/tbBrowserClient";

export default function DashboardModals({ modals, setModals, data }) {
  const {
    selectedDeviceId,
    setSelectedDeviceId,
    devices = [],
    setDevices,
    vitals = {},
    vitalsMap = {},
    settings = {},
    settingsMap = {},
    patient,
    setPatient,
    tbAuthToken,
    ecgData,
    ecgWindowSec = 10,
    setEcgWindowSec,
    ecgYMin = -7000,
    ecgYMax = 7000,
    fetchDevices,
    getValue,
  } = data;

  const close = (key) => () => setModals((m) => ({ ...m, [key]: null }));
  const closeFlag = (key) => () => setModals((m) => ({ ...m, [key]: false }));

  return (
    <>
      {/* Node Detail */}
      {modals.device && (
        <NodeDetailModal
          device={modals.device}
          vitals={modals.device.id === selectedDeviceId ? vitals : {}}
          vitalInterval={settings.vitalInterval}
          onClose={close("device")}
        />
      )}

      {/* Vital History */}
      {modals.vital && selectedDeviceId && (
        <VitalHistoryModal
          vitalKey={modals.vital.vitalKey}
          deviceId={selectedDeviceId}
          tbToken={tbAuthToken}
          currentValue={getValue ? getValue(modals.vital.vitalKey) : null}
          onClose={close("vital")}
        />
      )}

      {/* Overview */}
      {modals.overview && (
        <OverviewModal
          devices={devices}
          vitalsMap={vitalsMap}
          selectedDeviceId={selectedDeviceId}
          onSelectDevice={setSelectedDeviceId}
          onClose={closeFlag("overview")}
          settingsMap={settingsMap}
        />
      )}

      {/* Signal */}
      {modals.signal && (
        <SignalModal
          signalKey={modals.signal.key}
          series={ecgData}
          sampleFreqHz={settings.ecgSampleFreq}
          windowSec={ecgWindowSec}
          onWindowSecChange={setEcgWindowSec}
          yMin={ecgYMin}
          yMax={ecgYMax}
          onClose={close("signal")}
        />
      )}

      {/* Add Node */}
      {modals.addNode && (
        <AddNodeModal
          token={tbAuthToken}
          gatewayId={GATEWAY_ID}
          onClose={closeFlag("addNode")}
          onCreated={fetchDevices}
        />
      )}

      {/* Patient */}
      {modals.patient && patient && (
        <PatientModal
          patient={patient}
          deviceId={selectedDeviceId}
          onClose={closeFlag("patient")}
          onSaved={(updated) => {
            if (setPatient) setPatient((prev) => ({ ...prev, ...updated }));
            if (setDevices) {
              setDevices((prev) =>
                prev.map((d) =>
                  d.id === selectedDeviceId
                    ? {
                        ...d,
                        patientName: updated.patientName || null,
                        displayName: updated.patientName || d.name,
                      }
                    : d
                )
              );
            }
          }}
        />
      )}

      {/* OTA */}
      {modals.ota && <OtaModal devices={devices} onClose={closeFlag("ota")} />}

      {/* Print */}
      {modals.print && (
        <PrintModal devices={devices} onClose={closeFlag("print")} />
      )}

      {/* Assign User */}
      {modals.assign && (
        <AssignModal
          token={tbAuthToken}
          devices={devices}
          onClose={closeFlag("assign")}
          onAssigned={fetchDevices}
        />
      )}
    </>
  );
}
