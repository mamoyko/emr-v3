"use client";
import router from "next/router";
import { useState } from "react";

import EncounterMedicalHistory from "@/components/Encounters/encounterDetailForms/EncounterMedicalHistory";
import EncounterPhysicalExaminationFindings from "@/components/Encounters/encounterDetailForms/EncounterPhysicalExaminationFindings";
import EncounterSymptoms from "@/components/Encounters/encounterDetailForms/EncounterSymptoms";
import EncounterVitalSigns from "@/components/Encounters/encounterDetailForms/EncounterVitalSigns";
import Tester from "@/components/Encounters/encounterDetailForms/TesterComponent";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ENCOUNTERS_DETAILS = [
  {
    id: 1,
    value: "medical_history",
    detail: "Medical History",
    component: <EncounterMedicalHistory />,
  },
  {
    id: 2,
    value: "physical_examination_findings",
    detail: "Physical Examination Findings",
    component: <EncounterPhysicalExaminationFindings />,
  },
  {
    id: 3,
    value: "symptoms",
    detail: "Symptoms",
    component: <EncounterSymptoms />,
  },
  {
    id: 4,
    value: "vital_signs",
    detail: "Vital Signs",
    component: <EncounterVitalSigns />,
  },
];

const TesterComponent = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const [currentTab, setCurrentTab] = useState<string>("");
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    router.push(`/admin/encounters/create/${value}`);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 p-6">
      <Header />
      <div>
        <Tabs value={currentTab} onValueChange={handleTabChange}>
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
                key={encounter.id}
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

export default TesterComponent;
