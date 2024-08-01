import EncounterSymptoms from "@/components/Encounters/encounterDetailForms/EncounterSymptoms";
import EncounterFormPage from "@/components/Encounters/EncounterFormPage";

const Symptoms = () => {
  return (
    <EncounterFormPage initialTab="symptoms">
      <EncounterSymptoms />
    </EncounterFormPage>
  );
};

export default Symptoms;
