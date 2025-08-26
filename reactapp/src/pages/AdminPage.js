export default function AdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">User Accounts</h2>
       
        <ul className="mt-2 space-y-2">
          <li className="p-2 border rounded">👤 Alice (User)</li>
          <li className="p-2 border rounded">👤 Bob (Admin)</li>
        </ul>
      </div>
    </div>
  );
}
