import EncounterPhysicalExaminationFindings from "@/components/Encounters/encounterDetailForms/EncounterPhysicalExaminationFindings";
import EncounterFormPage from "@/components/Encounters/EncounterFormPage";

const PhysicalExaminationFindings = () => {
  return (
    <EncounterFormPage initialTab="physical-examination-findings">
      <EncounterPhysicalExaminationFindings />
    </EncounterFormPage>
  );
};

export default PhysicalExaminationFindings;
