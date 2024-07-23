import Image from "next/image";
import Link from "next/link";

// import { StatCard } from "@/components/StatCard";
// import { columns } from "@/components/table/columns";
// import { DataTable } from "@/components/table/DataTable";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { getEncounters } from "@/lib/actions/encounters.action";

// import AdminPage from "../../page";

const AdminPatientPage = async ({
  params: { patientId },
}: SearchParamProps) => {
  const encounters = await getEncounters(patientId);
  console.log({
    encounters,
  });

  // const tabs = [
  //   {
  //     value: "account",
  //     label: "Account",
  //     content: "Make changes to your account.",
  //   },
  //   {
  //     value: "documents",
  //     label: "Documents",
  //     content: "Access and update your documents.",
  //   },
  //   {
  //     value: "settings",
  //     label: "Settings",
  //     content: "Edit your profile or update contact information.",
  //   },
  // ];

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/leon-cares-eclinic_logo_white-01.png"
            height={32}
            width={162}
            alt="logo"
            className="h-12 w-fit"
          />
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Encounters</h1>
          <p className="text-dark-700">patientName</p>
        </section>
        {/* <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section> */}
        {/* <DataTable columns={columns} data={appointments.documents} /> */}

        {/* <Tabs defaultValue={tabs[0]?.value} className="w-[400px]">
          <TabsList>
            {tabs.map((tab: any) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab: any) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs> */}
      </main>
    </div>
  );
};

export default AdminPatientPage;
