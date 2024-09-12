import {
  BarChart,
  Activity,
  FileText,
  CreditCard,
  Clipboard,
  Settings,
  MessageSquare,
  Bell,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Component() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <div className="w-64 space-y-4 bg-gray-800 p-4">
        <div className="text-2xl font-bold text-blue-400">EHR SYSTEM</div>
        <nav className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Clipboard className="mr-2 size-4" />
            Encounters
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Activity className="mr-2 size-4" />
            Procedures
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <CreditCard className="mr-2 size-4" />
            Fees
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <BarChart className="mr-2 size-4" />
            Reports
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <FileText className="mr-2 size-4" />
            Boards
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Settings className="mr-2 size-4" />
            Administration
          </Button>
        </nav>
        <div className="pt-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <MessageSquare className="mr-2 size-4" />
            Messages
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Bell className="mr-2 size-4" />
            Notifications
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Users className="mr-2 size-4" />
            Directory
          </Button>
        </div>
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

        <Tabs defaultValue="patient-chart" className="text-gray-300">
          <TabsList className="bg-gray-800">
            <TabsTrigger
              value="patient-chart"
              className="data-[state=active]:bg-gray-700"
            >
              Patient chart
            </TabsTrigger>
            <TabsTrigger
              value="all-encounters"
              className="data-[state=active]:bg-gray-700"
            >
              All encounters
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-gray-700"
            >
              History
            </TabsTrigger>
            <TabsTrigger
              value="insurance"
              className="data-[state=active]:bg-gray-700"
            >
              Insurance
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-gray-700"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-gray-700"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-gray-700"
            >
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="ledger"
              className="data-[state=active]:bg-gray-700"
            >
              Ledger
            </TabsTrigger>
            <TabsTrigger
              value="external-data"
              className="data-[state=active]:bg-gray-700"
            >
              External data
            </TabsTrigger>
          </TabsList>
          <TabsContent value="patient-chart">
            <Card className="border-gray-700 bg-gray-800">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Avatar className="size-20">
                  <AvatarImage
                    alt="Patient"
                    src="/placeholder.svg?height=80&width=80"
                  />
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl text-white">
                    Shawn Robertson
                  </CardTitle>
                  <p className="text-gray-400">
                    Bloodtype: AB+ Height: 72.83 in Weight: 198 lb
                  </p>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p>
                      <strong>Birthday:</strong> May 27, 1990 (29 y.o.)
                    </p>
                    <p>
                      <strong>Phone:</strong> (201) 555-0124
                    </p>
                    <p>
                      <strong>Policy:</strong> Primary, 426-45-12AFT-12
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Address:</strong> 4640 Ash Dr, Oakland, FL , USA
                      32123
                    </p>
                    <p>
                      <strong>Email:</strong> george.russell84@gmail.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
