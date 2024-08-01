import EncounterMedicalHistory from "@/components/Encounters/encounterDetailForms/EncounterMedicalHistory";
import EncounterPage from "@/components/Encounters/encounterDetailForms/EncounterPage";

const MedicalHistory = () => {
  return (
    <EncounterPage initialTab="medical-history">
      <EncounterMedicalHistory />
    </EncounterPage>
  );
};

export default MedicalHistory;
