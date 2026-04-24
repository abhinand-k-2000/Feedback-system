"use client";

import { api } from "@/app/lib/api";
import { Employee } from "@/app/types";
import { entityFromResponse } from "@/lib/api-response";
import CommonTable from "@/components/common/CommonTable";
import Modal from "@/components/common/Modal";
import { useState } from "react";

type EmployeesPageClientProps = {
    initialEmployees: Employee[];
};

export default function EmployeesPageClient({ initialEmployees }: EmployeesPageClientProps) {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDelete = async (employeeId: string) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this employee?");
        if (!shouldDelete) {
            return;
        }

        await api.delete(`/employees/${employeeId}`);
        setEmployees((prev) => prev.filter((e) => e._id !== employeeId));
    };

    const resetForm = () => {
        setName("");
        setEmail("");
    };

    const openCreateModal = () => {
        resetForm();
        setShowCreateModal(true);
    };

    const openEditModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setName(employee.name);
        setEmail(employee.email);
        setShowEditModal(true);
    };

    const handleCreate = async () => {
        if (!name.trim() || !email.trim()) {
            window.alert("Name and email are required.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await api.post("/employees", {
                name: name.trim(),
                email: email.trim(),
            });
            const newEmployee = entityFromResponse<Employee>(response);
            if (newEmployee) {
                setEmployees((prev) => [...prev, newEmployee]);
            }
            setShowCreateModal(false);
            resetForm();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = async () => {
        if (!selectedEmployee) {
            return;
        }

        if (!name.trim() || !email.trim()) {
            window.alert("Name and email are required.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await api.put(`/employees/${selectedEmployee._id}`, {
                name: name.trim(),
                email: email.trim(),
                role: selectedEmployee.role,
            });
            const updated = entityFromResponse<Employee>(response);
            if (updated) {
                setEmployees((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
            }
            setShowEditModal(false);
            setSelectedEmployee(null);
            resetForm();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Employees</h1>
                <button
                    onClick={openCreateModal}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                    Create Employee
                </button>
            </div>
            <CommonTable
                data={employees}
                emptyText="No employees found."
                getRowKey={(emp) => emp._id}
                columns={[
                    {
                        key: "name",
                        header: "Name",
                        cell: (emp) => <span className="font-medium text-slate-900">{emp.name}</span>,
                    },
                    {
                        key: "email",
                        header: "Email",
                        cell: (emp) => <span className="text-slate-600">{emp.email}</span>,
                    },
                    {
                        key: "role",
                        header: "Role",
                        cell: (emp) => (
                            <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs capitalize text-slate-700">
                                {emp.role}
                            </span>
                        ),
                    },
                    {
                        key: "actions",
                        header: "Actions",
                        cell: (emp) => (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditModal(emp)}
                                    className="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(emp._id)}
                                    className="rounded-md border border-rose-200 px-3 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50"
                                >
                                    Delete
                                </button>
                            </div>
                        ),
                    },
                ]}
            />

            <Modal
                isOpen={showCreateModal}
                title="Create Employee"
                onClose={() => setShowCreateModal(false)}
            >
                <div className="space-y-4">
                    <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-xs text-slate-500">New employees are created as Employee.</p>
                    <button
                        onClick={handleCreate}
                        disabled={isSubmitting}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-70"
                    >
                        {isSubmitting ? "Saving..." : "Save Employee"}
                    </button>
                </div>
            </Modal>

            <Modal
                isOpen={showEditModal}
                title="Edit Employee"
                onClose={() => setShowEditModal(false)}
            >
                <div className="space-y-4">
                    <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        onClick={handleEdit}
                        disabled={isSubmitting}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-70"
                    >
                        {isSubmitting ? "Saving..." : "Update Employee"}
                    </button>
                </div>
            </Modal>
        </div>
    );
}
