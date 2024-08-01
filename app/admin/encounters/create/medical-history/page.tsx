import EncounterMedicalHistory from "@/components/Encounters/encounterDetailForms/EncounterMedicalHistory";
import EncounterFormPage from "@/components/Encounters/EncounterFormPage";

const MedicalHistory = () => {
  return (
    <EncounterFormPage initialTab="medical-history">
      <EncounterMedicalHistory />
    </EncounterFormPage>
  );
};

export default MedicalHistory;
