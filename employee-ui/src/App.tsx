import { useEffect, useState } from "react";
import type { Employee } from "./types/Employee";
import { getEmployees, createEmployee, updateEmployee as updateEmployeeApi, deleteEmployee as deleteEmployeeApi, } from "./services/employeeApi";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeDetails from "./pages/EmployeeDetails";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  
  useEffect(() => { loadEmployees(); }, []);

  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const saveEmployee = async () => {
    await createEmployee({ name, email,salary,});

    loadEmployees();

    setName("");
    setEmail("");
    setSalary("");
  };

  const updateEmployee = async () => {
    if (editingId === null) return;

    await updateEmployeeApi(editingId, {
      name, email, salary,
    });

    await loadEmployees();

    setEditingId(null);
    setName("");
    setEmail("");
    setSalary("");
  };

  const deleteEmployee = async (id: number) => {
    await deleteEmployeeApi(id);

    await loadEmployees();
  };

  return (
  <BrowserRouter>
  <div>
    <h1>Employee List</h1>
      <nav>
        <Link to="/">Login</Link>
        <Link to="/dashboard" style={{ marginLeft: "10px" }}>Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />}/>

        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/employees/:id" element={<EmployeeDetails />}/>
      </Routes>
    <div>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>

      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

      <input type="text" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)}/>

      <button onClick={ editingId === null ? saveEmployee : updateEmployee}> {editingId === null ? "Save Employee" : "Update Employee"}</button>
    </div>
    <hr />
    <ul>
      {employees.map((employee) => (
        <li key={employee.id}> {employee.name} - {employee.email} - ₹{employee.salary}

          <Link to={`/employees/${employee.id}`} style={{ marginLeft: "10px" }}>
            View
          </Link>

          <button style={{ marginLeft: "10px" }} onClick={() => { setEditingId(employee.id); setName(employee.name); setEmail(employee.email);setSalary(employee.salary);}}>
            Edit
          </button>

          <button style={{ marginLeft: "10px" }} onClick={() => deleteEmployee(employee.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
    <table>
      <thead>
        <td>id</td>
        <td>name</td>
        <td>email</td>
        <td>salary</td>
      </thead>
      <tbody className="employee-table-body">
        {employees.map((employee) => (
          <tr  className="employee-row" key={employee.id}>
            <td>
              <Link to={`/employees/${employee.id}`}>{employee.id}</Link>
            </td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>₹{employee.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </BrowserRouter>
);
}

export default App;
