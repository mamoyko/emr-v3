import EncounterMedicalHistory from "@/components/Encounters/encounterDetailForms/EncounterMedicalHistory";
import EncounterPhysicalExaminationFindings from "@/components/Encounters/encounterDetailForms/EncounterPhysicalExaminationFindings";
import EncounterSymptoms from "@/components/Encounters/encounterDetailForms/EncounterSymptoms";
import EncounterVitalSigns from "@/components/Encounters/encounterDetailForms/EncounterVitalSigns";
// import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ENCOUNTERS_DETAILS = [
  {
    value: "medical_history",
    detail: "Medical History",
    component: <EncounterMedicalHistory />,
  },
  {
    value: "physical_examination_findings",
    detail: "Physical Examination Findings",
    component: <EncounterPhysicalExaminationFindings />,
  },
  {
    value: "symptoms",
    detail: "Symptoms",
    component: <EncounterSymptoms />,
  },
  {
    value: "vital_signs",
    detail: "Vital Signs",
    component: <EncounterVitalSigns />,
  },
];

const AdminCreateEncounterPage = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 p-6">
      {/* <Header /> */}

      <div
      // className="bg-white rounded-lg shadow-md p-4"
      >
        <Tabs defaultValue="medical_history">
          <TabsList className="flex border-b border-gray-200">
            {ENCOUNTERS_DETAILS.map((encounter) => (
              <TabsTrigger
                key={encounter.value}
                value={encounter.value}
                className="p-4 text-gray-600 hover:text-blue-500 focus:outline-none"
              >
                {encounter.detail}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-4">
            {ENCOUNTERS_DETAILS.map((encounter) => (
              <TabsContent
                key={encounter.value}
                value={encounter.value}
                className="p-4"
              >
                {encounter.component}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminCreateEncounterPage;
