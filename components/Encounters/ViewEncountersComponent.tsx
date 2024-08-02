"use client";
import { Header } from "@/components/Header";

const ViewEncountersComponent = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">View Encounters</h1>
        </section>
        <div>view</div>
      </main>
    </div>
  );
};

export default ViewEncountersComponent;
