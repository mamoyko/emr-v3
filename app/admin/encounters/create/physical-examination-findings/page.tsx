import EncounterPage from "@/components/Encounters/encounterDetailForms/EncounterPage";
import EncounterPhysicalExaminationFindings from "@/components/Encounters/encounterDetailForms/EncounterPhysicalExaminationFindings";

const PhysicalExaminationFindings = () => {
  return (
    <EncounterPage initialTab="physical-examination-findings">
      <EncounterPhysicalExaminationFindings />
    </EncounterPage>
  );
};

export default PhysicalExaminationFindings;
