export const CONFIGURATION_MODE = Object.freeze({
  MODE_FORM: "form",
  MODE_TABLE: "table",
});

export const MEDICAL_DETAILS = {
  SYMPTOMS: { value: "symptoms", title: "Symptoms" },
  VITAL_SIGNS: { value: "vital-signs", title: "Vital Signs" },
  PHYSICAL_EXAMINATION_FINDINGS: {
    value: "physical-examination-findings",
    title: "Physical Examination Findings",
  },
  MEDICAL_HISTORY: { value: "medical-history", title: "Medical History" },
  ENCOUNTERS: { value: "encounters", title: "Encounters" },
};

export const USER_FORM_DETAILS = {
  USER_DETAILS: { value: "user-details", title: "User Details" },
};

export const NAVIGATION_LIST = {
  USER_DETAILS: {
    value: "user-details",
    title: "User Details",
    isWhatConfiguration: "",
    isWhatConfigurationMode: CONFIGURATION_MODE.MODE_FORM,
  },
  SYMPTOMS: {
    value: "symptoms",
    title: "Symptoms",
    isWhatConfiguration: "",
    isWhatConfigurationMode: CONFIGURATION_MODE.MODE_TABLE,
  },
  VITAL_SIGNS: {
    value: "vital-signs",
    title: "Vital Signs",
    isWhatConfiguration: "",
    isWhatConfigurationMode: CONFIGURATION_MODE.MODE_TABLE,
  },
  PHYSICAL_EXAMINATION_FINDINGS: {
    value: "physical-examination-findings",
    title: "Physical Examination Findings",
    isWhatConfiguration: "",
    isWhatConfigurationMode: CONFIGURATION_MODE.MODE_TABLE,
  },
  MEDICAL_HISTORY: {
    value: "medical-history",
    title: "Medical History",
    isWhatConfiguration: "",
    isWhatConfigurationMode: CONFIGURATION_MODE.MODE_TABLE,
  },
  ENCOUNTERS: {
    value: "encounters",
    title: "Encounters",
    isWhatConfiguration: "",
    isWhatConfigurationMode: CONFIGURATION_MODE.MODE_TABLE,
  },
};

export const NAVIGATION_PROCESS_CONFIGURATION = Object.freeze({
  NAV_VIEW: "view",
  NAV_CREATE_EDIT: "edit",
  NAV_TABLE: "table",
  NAV_FORM_TABLE: "form",
});
