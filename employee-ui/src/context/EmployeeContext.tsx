import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  createEmployee,
  deleteEmployee as deleteEmployeeApi,
  getEmployees,
  updateEmployee as updateEmployeeApi,
} from "../services/employeeApi";
import type { Employee } from "../types/Employee";

type EmployeeForm = {
  name: string;
  email: string;
  salary: string;
};

type EmployeeContextValue = {
  employees: Employee[];
  form: EmployeeForm;
  editingId: number | null;
  setFormValue: (field: keyof EmployeeForm, value: string) => void;
  editEmployee: (employee: Employee) => void;
  saveEmployee: () => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
};

const emptyForm: EmployeeForm = {
  name: "",
  email: "",
  salary: "",
};

const EmployeeContext = createContext<EmployeeContextValue | undefined>(
  undefined
);

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState<EmployeeForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    let cancelled = false;

    getEmployees().then((data) => {
      if (!cancelled) {
        setEmployees(data);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const setFormValue = (field: keyof EmployeeForm, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const editEmployee = (employee: Employee) => {
    setEditingId(employee.id);
    setForm({
      name: employee.name,
      email: employee.email,
      salary: employee.salary,
    });
  };

  const saveEmployee = async () => {
    if (editingId === null) {
      await createEmployee(form);
    } else {
      await updateEmployeeApi(editingId, form);
    }

    await loadEmployees();
    resetForm();
  };

  const deleteEmployee = async (id: number) => {
    await deleteEmployeeApi(id);
    await loadEmployees();
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        form,
        editingId,
        setFormValue,
        editEmployee,
        saveEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEmployees() {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error("useEmployees must be used inside EmployeeProvider");
  }

  return context;
}
