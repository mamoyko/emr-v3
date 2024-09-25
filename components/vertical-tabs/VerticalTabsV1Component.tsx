import React, { ReactNode, useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "./VerticalTabs.css";
import { SkeletonGeneric } from "../helperComponent/SkeletonComponent";
import { FNObjectLevelOneToArray } from "../helperFunctions/TransformObjectToArray";
import UseRouting from "../helperFunctions/UseRouting";
import useWindowDimension from "../helperFunctions/useWindowDimension";
import { CustomLoading } from "../Loader";
import { DetailComponentControllable } from "../Patients/PatientComponentHelper/PatientProfileInfoHelper";

interface VerticalTabsV1ComponentProps {
  navigationList: any;
  TabHeaderComponent: ReactNode;
  ContentComponent: ReactNode;
  FooterComponent: ReactNode;
  defaultValue: string;
  handleNavigation: (value: string) => void;
  TitleComponent: ReactNode;
  DescriptionComponent: ReactNode;
  handleParentProcess: () => void;
  isLoading: boolean;
  verticalTabHeightControl: number;
  dataUserCollections: any;
}

const VerticalTabsV1Component = ({
  navigationList,
  ContentComponent,
  defaultValue,
  TitleComponent,
  FooterComponent,
  DescriptionComponent,
  TabHeaderComponent,
  handleNavigation,
  handleParentProcess,
  isLoading,
  verticalTabHeightControl,
  dataUserCollections = {},
}: VerticalTabsV1ComponentProps) => {
  const [currentTab, setCurrentTab] = useState<string>("");
  const { routePathId } = UseRouting();
  const { height, width } = useWindowDimension();

  const MEMOIZE_NAV = Array.isArray(navigationList)
    ? [...navigationList]
    : [...FNObjectLevelOneToArray({ toTransformData: navigationList })];

  const handleTabChange = (value: string) => {
    const collection = [...MEMOIZE_NAV];
    const filteredCollection = collection.filter(
      (data, index) => data.value === value
    )[0];
    if (!isLoading) {
      setCurrentTab(value);
      routePathId("active", value);
      handleNavigation(filteredCollection);
      handleParentProcess();
    }
  };

  useEffect(() => {
    handleTabChange(defaultValue);
  }, []);

  if (!height) return;
  return (
    <Tabs
      value={currentTab}
      onValueChange={handleTabChange}
      className="flex w-full items-center justify-center rounded-lg"
      style={{
        height: !height
          ? "100%"
          : `${height - 265 - verticalTabHeightControl}px`,
      }}
    >
      <div className="flex w-[320px] items-center justify-center overflow-y-auto rounded-lg bg-inherit py-[6px] md:px-2">
        <TabsList
          className="flex size-full flex-col items-center justify-center rounded-lg bg-slate-800"
          style={{
            height: !height
              ? "100%"
              : `${height - 280 - verticalTabHeightControl}px`,
          }}
        >
          <div className="size-full">
            <div className="flex h-[180px] flex-col items-center justify-center gap-2 overflow-y-auto p-1 py-[6px]">
              <div className="flex size-full items-center justify-center rounded-lg bg-white text-black">
                {!dataUserCollections?.name ? (
                  <SkeletonGeneric
                    loaderControl={{
                      height: 40,
                      width: 40,
                      brightness: "0%",
                    }}
                  />
                ) : (
                  "Image box"
                )}
              </div>
            </div>
            <DetailComponentControllable
              item={{
                label: null,
                value: dataUserCollections?.name,
              }}
              hasLoading={true}
              loadingControl={{
                height: 10,
                width: 20,
                text: "",
              }}
              articleClass="flex items-center justify-center font-semibold"
              valueClass="h-full text-wrap text-center"
            />
          </div>

          {TabHeaderComponent}
          <div className="flex h-full flex-wrap items-center justify-start overflow-y-auto pt-1 md:flex-col">
            {MEMOIZE_NAV.map((navItem: { value: string; title: string }) => (
              <TabsTrigger
                key={navItem.value}
                value={navItem.value}
                className={`flex w-full cursor-pointer bg-transparent py-2.5 text-left transition-colors duration-200 ease-in-out hover:bg-gray-200 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={isLoading}
              >
                <span className="col-start-1 flex text-wrap text-center text-sm dark:text-slate-400 sm:col-span-2 lg:col-span-1 lg:row-start-4">
                  {navItem.title}
                </span>
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
      </div>
      <div className="flex size-full flex-col items-center justify-center overflow-y-auto pr-2">
        <TabsContent
          className="size-full"
          value={currentTab}
          style={{
            height: !height
              ? "100%"
              : `${height - 280 - verticalTabHeightControl}px`,
          }}
        >
          <Card className="flex size-full flex-col overflow-y-auto rounded-lg">
            {(TitleComponent || DescriptionComponent) && (
              <CardHeader className="sticky top-0 z-10 shadow-md">
                {TitleComponent && <CardTitle>{TitleComponent}</CardTitle>}
                {DescriptionComponent && (
                  <CardDescription>{DescriptionComponent}</CardDescription>
                )}
              </CardHeader>
            )}
            {isLoading ? (
              <div
                className="flex h-full items-center justify-center"
                style={{
                  height: !height
                    ? "100%"
                    : `${height - 380 - verticalTabHeightControl}px`,
                }}
              >
                <CustomLoading height="calc(100vh - 200px)" toDivide={2.5} />
              </div>
            ) : (
              <CardContent className="space-y-1">
                {ContentComponent}
              </CardContent>
            )}
            {FooterComponent && <CardFooter>{FooterComponent}</CardFooter>}
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default VerticalTabsV1Component;
