import express from 'express';
import employeesController from '../controllers/employees.controller';
export const employeesRouter = express.Router();

employeesRouter.get("/", employeesController.getEmployees());