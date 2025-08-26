import { useParams } from "react-router-dom";

export default function DocumentDetailsPage() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Document Details (ID: {id})</h1>
     
      <div className="mt-4 border p-4 rounded">
        <p><strong>Owner:</strong> John Doe</p>
        <p><strong>File Size:</strong> 2MB</p>
        <p><strong>Last Modified:</strong> 2025-08-18</p>
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Manage Sharing
      </button>
    </div>
  );
}
