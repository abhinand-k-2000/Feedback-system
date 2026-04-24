import { model, Schema } from "mongoose";
import { IEmployee } from "../types";

export interface EmployeeDocument extends IEmployee, Document { }

const EmployeeSchema = new Schema<EmployeeDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ['admin', 'employee'],
        default: 'employee'
    }
}, { timestamps: true })


export default model<EmployeeDocument>("Employee", EmployeeSchema)