import Employee from "../models/Employee";
import { IEmployee } from "../types";



export const createEmployee = async (data: IEmployee) => {
    const employee = await Employee.create(data)
    return employee
}

export const getAllEmployees = async () => {
    const employees = await Employee.find()
    return employees
}

export const updateEmployee = async (id: string, data: IEmployee) => {
    const employee = await Employee.findByIdAndUpdate(id, data, { new: true })
    return employee
}

export const deleteEmployee = async (id: string) => {
    const employee = await Employee.findByIdAndDelete(id)
    return employee
}
