"use client";
import * as TabsPrimitive from "@radix-ui/react-tabs";
// import { Box } from "lucide-react";
import * as React from "react";

// import { cn } from "@/lib/utils";

const MyTabs = ({ tabs }: any) => {
  return (
    <TabsPrimitive.Root defaultValue={tabs[0].value}>
      <TabsPrimitive.List>
        {tabs.map((tab: any) => (
          <TabsPrimitive.Trigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {/* <Box pt="3">
        {tabs.map((tab) => (
          <TabsPrimitive.Content key={tab.value} value={tab.value}>
            <Text size="2">{tab.content}</Text>
          </TabsPrimitive.Content>
        ))}
      </Box> */}
    </TabsPrimitive.Root>
  );
};

export { MyTabs };
