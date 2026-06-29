export async function getEmployees() {
  const response = await fetch(
    "http://127.0.0.1:8000/api/employees"
  );

  return response.json();
}

export async function getEmployee(id: string) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/employees/${id}`
  );

  return response.json();
}

export async function createEmployee(employee: {
  name: string;
  email: string;
  salary: string;
}) {
  const response = await fetch(
    "http://127.0.0.1:8000/api/employees",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }
  );

  return response.json();
}

export async function updateEmployee(
  id: number,
  employee: { name: string; email: string; salary: string }
) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/employees/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }
  );

  return response.json();
}

export async function deleteEmployee(id: number) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/employees/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Unable to delete employee");
  }
}
