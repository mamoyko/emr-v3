import EncounterPage from "@/components/Encounters/encounterDetailForms/EncounterPage";
import EncounterSymptoms from "@/components/Encounters/encounterDetailForms/EncounterSymptoms";

const Symptoms = () => {
  return (
    <EncounterPage initialTab="symptoms">
      <EncounterSymptoms />
    </EncounterPage>
  );
};

export default Symptoms;
