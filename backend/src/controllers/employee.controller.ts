import { Request, Response } from "express";
import * as employeeService from "../services/employee.service";
import { asyncHandler } from "../utls/asyncHandler";


export const createEmployee = asyncHandler(async (req: Request, res: Response) => {
    const employee = await employeeService.createEmployee(req.body);
    res.json({ success: true, data: employee });
})


export const getAllEmployees = asyncHandler(async (_req: Request, res: Response) => {
    const employees = await employeeService.getAllEmployees()
    res.json({ success: true, data: employees });
})

export const updateEmployee = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const employee = await employeeService.updateEmployee(id as string, req.body);
    res.json({ success: true, data: employee });
})

export const deleteEmployee = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const employee = await employeeService.deleteEmployee(id as string);
    res.json({ success: true, data: employee });
})