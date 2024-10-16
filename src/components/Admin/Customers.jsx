import { useEffect, useState } from "react";
import { getAllUsers } from "../../api";

function Customers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getAllUsers();
      setUsers(response.data.data);
    })();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-slate-500 text-lg">Customers</h1>
      </div>
      <div>
        <table className="w-full p-5 mt-5 text-slate-700 rounded-lg bg-slate-300 overflow-hidden">
          <thead>
            <tr>
              <th className="text-start p-3">#</th>
              <th className="text-start p-3">Name</th>
              <th className="text-start p-3">Email</th>
              <th className="text-start p-3">Status</th>
              <th className="text-start p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, idx) => (
                <tr key={user._id}>
                  <td className="text-center">{idx + 1}</td>
                  <td className="p-1">{user.fullName}</td>
                  <td className="p-1">{user.email}</td>
                  <td className="p-1">{user.status}</td>
                  <td className="p-1">
                    {new Date(user.createdAt).toLocaleDateString("en-Us", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-5">
                  No Users to show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
