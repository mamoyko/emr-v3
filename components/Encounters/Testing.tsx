// app/admin/encounters/[userId]/page.tsx

import { useRouter } from "next/router";

// This component renders based on the dynamic route segment
const Testing = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  // Fetch data based on userId (you can use any data fetching method here)
  const response = await fetch(`/api/user/${userId}`);
  const data = await response.json();

  return (
    <div>
      <h1>Encounter Page for User: {userId}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Testing;
