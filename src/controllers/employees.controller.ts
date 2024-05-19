import EmployeesService from "../services/employees.service";

const employeesManager = new EmployeesService();

export default class employeesController{

    async getEmployees(){
        try {
            const employees = employeesManager.getAll();
            return employees;
        } catch (error) {
            
        }
    }
}