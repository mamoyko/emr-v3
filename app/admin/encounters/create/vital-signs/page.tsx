import EncounterVitalSigns from "@/components/Encounters/encounterDetailForms/EncounterVitalSigns";
import EncounterFormPage from "@/components/Encounters/EncounterFormPage";

const VitalSigns = () => {
  return (
    <EncounterFormPage initialTab="vital-signs">
      <EncounterVitalSigns />
    </EncounterFormPage>
  );
};

export default VitalSigns;
