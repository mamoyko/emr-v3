"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

import EncounterMedicalHistory from "@/components/Encounters/encounterDetailForms/EncounterMedicalHistory";
import EncounterPhysicalExaminationFindings from "@/components/Encounters/encounterDetailForms/EncounterPhysicalExaminationFindings";
import EncounterSymptoms from "@/components/Encounters/encounterDetailForms/EncounterSymptoms";
import EncounterVitalSigns from "@/components/Encounters/encounterDetailForms/EncounterVitalSigns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ENCOUNTERS_DETAILS = Object.freeze({
  SYMPTOMS: { VALUE: "symptoms", LABEL: "Symptoms" },
  VITAL_SIGNS: { VALUE: "vital-signs", LABEL: "Vital Signs" },
  PHYSICAL_EXAMINATION_FINDINGS: {
    VALUE: "physical-examination-findings",
    LABEL: "Physical Examination Findings",
  },
  MEDICAL_HISTORY: { VALUE: "medical-history", LABEL: "Medical History" },
});

const tabClassesStyle = (isActive: any) =>
  `p-4 transition-colors duration-300 ease-in-out rounded-t-md ${
    isActive
      ? "bg-blue-100 text-blue-700 shadow-md"
      : "text-gray-600 hover:bg-blue-50"
  }`;

const EncounterFormPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [currentTab, setCurrentTab] = useState("symptoms");

  const handleTabChange = (value: any) => {
    setCurrentTab(value);
    const newQuery = new URLSearchParams(window.location.search);
    newQuery.set("active", value);
    router.replace(`${pathname}?${newQuery.toString()}`);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 p-6">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="flex justify-center border-b border-gray-200 bg-gray-50">
          {Object.values(ENCOUNTERS_DETAILS).map((detail) => (
            <TabsTrigger
              key={detail.VALUE}
              className={tabClassesStyle(currentTab === detail.VALUE)}
              value={detail.VALUE}
            >
              {detail.LABEL}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={ENCOUNTERS_DETAILS.MEDICAL_HISTORY.VALUE}>
          <EncounterMedicalHistory />
        </TabsContent>
        <TabsContent
          value={ENCOUNTERS_DETAILS.PHYSICAL_EXAMINATION_FINDINGS.VALUE}
        >
          <EncounterPhysicalExaminationFindings />
        </TabsContent>
        <TabsContent value={ENCOUNTERS_DETAILS.SYMPTOMS.VALUE}>
          <EncounterSymptoms />
        </TabsContent>
        <TabsContent value={ENCOUNTERS_DETAILS.VITAL_SIGNS.VALUE}>
          <EncounterVitalSigns />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EncounterFormPage;
