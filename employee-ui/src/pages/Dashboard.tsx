import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEmployees } from "../context/EmployeeContext";

function Dashboard() {
  const { user, logout } = useAuth();
  const {
    employees,
    form,
    editingId,
    setFormValue,
    editEmployee,
    saveEmployee,
    deleteEmployee,
  } = useEmployees();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await saveEmployee();
  };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Employee Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </header>

      <section>
        <h2>{editingId === null ? "Add Employee" : "Edit Employee"}</h2>
        <form className="employee-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(event) => setFormValue("name", event.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setFormValue("email", event.target.value)}
            required
          />
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Salary"
            value={form.salary}
            onChange={(event) => setFormValue("salary", event.target.value)}
            required
          />
          <button type="submit">
            {editingId === null ? "Add Employee" : "Update Employee"}
          </button>
        </form>
      </section>

      <section>
        <h2>Employee List</h2>
        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>₹{employee.salary}</td>
                    <td className="employee-actions">
                      <Link to={`/employees/${employee.id}`}>View</Link>
                      <button
                        type="button"
                        onClick={() => editEmployee(employee)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteEmployee(employee.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
