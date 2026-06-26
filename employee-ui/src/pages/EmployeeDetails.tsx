import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEmployee } from "../services/employeeApi";
import type { Employee } from "../types/Employee";

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (!id) return;

    getEmployee(id).then(setEmployee);
  }, [id]);

  if (!employee) {
    return <p>Loading employee...</p>;
  }

  return (
    <div>
      <h1>Employee Details</h1>
      <p>ID: {employee.id}</p>
      <p>Name: {employee.name}</p>
      <p>Email: {employee.email}</p>
      <p>Salary: Rs. {employee.salary}</p>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
}

export default EmployeeDetails;
