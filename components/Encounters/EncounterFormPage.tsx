"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

import { Header } from "@/components/Header";

interface EncounterFormPageProps {
  children: ReactNode;
  initialTab: string;
}

const ENCOUNTERS_DETAILS = [
  { value: "medical-history", detail: "Medical History" },
  {
    value: "physical-examination-findings",
    detail: "Physical Examination Findings",
  },
  { value: "symptoms", detail: "Symptoms" },
  { value: "vital-signs", detail: "Vital Signs" },
];

const EncounterFormPage: React.FC<EncounterFormPageProps> = ({
  children,
  initialTab,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState<string>(initialTab);

  useEffect(() => {
    const id = pathname?.split("/").pop();
    if (id && ENCOUNTERS_DETAILS.some((encounter) => encounter.value === id)) {
      setCurrentTab(id);
    }
  }, [pathname]);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    router.push(`/admin/encounters/create/${value}`);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 p-6">
      <Header />
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="flex justify-center border-gray-200 border-b-inherit">
          {ENCOUNTERS_DETAILS.map((encounter) => (
            <TabsTrigger
              key={encounter.value}
              value={encounter.value}
              className={`p-4 transition-colors duration-300 ease-in-out ${
                currentTab === encounter.value
                  ? "bg-blue-100 text-blue-700 shadow-md"
                  : "text-gray-600 hover:bg-blue-50"
              } rounded-t-md`}
            >
              {encounter.detail}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={currentTab}>{children}</TabsContent>
      </Tabs>
    </div>
  );
};

export default EncounterFormPage;
