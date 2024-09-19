import { Fragment, ReactNode, useEffect, useState } from "react";

import { FNObjectLevelOneToArray } from "@/components/helperFunctions/TransformObjectToArray";
import UseRouting from "@/components/helperFunctions/UseRouting";
import { CustomLoading } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import NavCardContentComponent from "./PatientFormsAndTable/NavCardContentComponent";

interface PatientNavComponentProps {
  dataUserCollections: any;
  navigationListTabular: any;
  navigationListVertical: any;
  CardHeaderComponent: ReactNode;
  CardFooterComponent: ReactNode;
  CardContentComponent: ReactNode;
  defaultValue: string;
  handleNavigation: (value: string) => void;
  handleParentProcess: () => void;
  isLoading: boolean;
}

const PatientNavComponent = ({
  navigationListTabular,
  navigationListVertical,
  CardHeaderComponent,
  CardFooterComponent,
  defaultValue,
  handleNavigation,
  handleParentProcess,
  isLoading,
  CardContentComponent,
}: PatientNavComponentProps) => {
  const [currentTab, setCurrentTab] = useState<any>({
    isWhatConfiguration: "",
    isWhatConfigurationMode: "table",
    title: "User Details",
    value: "user-details",
  });
  const { routePathId } = UseRouting();

  const MEMOIZE_NAV_TABULAR = Array.isArray(navigationListTabular)
    ? [...navigationListTabular]
    : [...FNObjectLevelOneToArray({ toTransformData: navigationListTabular })];

  const MEMOIZE_NAV_VERTICAL = Array.isArray(navigationListVertical)
    ? [...navigationListVertical]
    : [...FNObjectLevelOneToArray({ toTransformData: navigationListVertical })];

  const handleTabChange = (dataValue: string) => {
    const collection = [...MEMOIZE_NAV_TABULAR];
    const filteredCollection = collection.filter(
      (data, index) => data.value === dataValue
    )[0];
    if (!isLoading) {
      setCurrentTab(filteredCollection);
      routePathId("active", dataValue);
      handleNavigation(filteredCollection);
      handleParentProcess();
    }
  };

  useEffect(() => {
    handleTabChange(defaultValue);
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <div className="w-64 space-y-4 bg-gray-800 p-4">
        <div className="text-2xl font-bold text-blue-400">EHR SYSTEM</div>
        <nav className="space-y-2">
          {MEMOIZE_NAV_VERTICAL.map(
            (navItem: { value: string; title: string; icon: ReactNode }) => (
              <Button
                key={navItem.value}
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {navItem?.icon}
                {navItem.title}
              </Button>
            )
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-900 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Input
              className="w-96 border-gray-700 bg-gray-800 text-white"
              placeholder="Search for a patient or diagnosis"
              type="search"
            />
            <select className="rounded border border-gray-700 bg-gray-800 p-2 text-white">
              <option>All patients</option>
            </select>
          </div>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Create new encounter
          </Button>
        </div>

        <Tabs
          value={currentTab.value}
          onValueChange={handleTabChange}
          className="rounded-lg text-gray-300"
        >
          <TabsList className="bg-gray-800">
            {MEMOIZE_NAV_TABULAR.map(
              (navItem: { value: string; title: string }) => (
                <TabsTrigger
                  key={navItem.value}
                  value={navItem.value}
                  className={`cursor-pointer flex-col rounded-t-lg bg-transparent py-2.5 text-left transition-colors duration-200 ease-in-out hover:bg-gray-200 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                  disabled={isLoading}
                >
                  {navItem.title}
                </TabsTrigger>
              )
            )}
          </TabsList>
          <TabsContent
            style={{ height: "calc(100vh - 180px)" }}
            value={currentTab.value}
          >
            <Card className="flex size-full flex-col border-gray-700 bg-gray-800">
              {CardHeaderComponent && (
                <CardHeader
                  style={{ height: "calc(100vh - 950px)" }}
                  className="flex flex-row items-center space-x-4 pb-2"
                >
                  {CardHeaderComponent}
                </CardHeader>
              )}
              <CardContent className="flex size-full items-start justify-center space-y-1 p-5 text-gray-300">
                {isLoading ? (
                  <CustomLoading height="calc(100vh - 200px)" toDivide={2.5} />
                ) : (
                  <Fragment>{!isLoading && CardContentComponent}</Fragment>
                )}
              </CardContent>
              {CardFooterComponent && (
                <CardFooter
                  className="w-full"
                  style={{
                    height: "calc(100vh - 980px)",
                  }}
                >
                  {CardFooterComponent}
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientNavComponent;
