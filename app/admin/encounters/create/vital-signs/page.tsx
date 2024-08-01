import EncounterPage from "@/components/Encounters/encounterDetailForms/EncounterPage";
import EncounterVitalSigns from "@/components/Encounters/encounterDetailForms/EncounterVitalSigns";

const VitalSigns = () => {
  return (
    <EncounterPage initialTab="vital-signs">
      <EncounterVitalSigns />
    </EncounterPage>
  );
};

export default VitalSigns;
