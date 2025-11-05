import Expense from "@/entities/expense.model";
import HTTPService from "./http-service";

export default class ExpenseService extends HTTPService {
  private path: string;

  constructor() {
    super();
    this.path = "expenses";
  }

  async getExpenses(): Promise<Expense[]> {
    const response = await super.get(this.path);
    const data = response.data || [];
    return data.map((item: any) => Expense.fromJson(item));
  }

  async getById(id: string): Promise<Expense | null> {
    const response = await super.get(`${this.path}/${id}`);
    if (!response) return null;

    return Expense.fromJson(response);
  }

  async getExpenseByDepartment() {
    const response = await super.get(`${this.path}/area`);
    const data = response.data || [];
    return data.map((item: any) => Expense.fromJson(item));
  }

  async addExpense(expense: Expense): Promise<Expense | null> {
    const body = Expense.fromJsonModel(expense).toJsonDTO();
    const response = await super.post(this.path, body);

    if (!response) return null;
    return Expense.fromJson(response);
  }

  async updateExpense(id: string, expense: Expense): Promise<Expense | null> {
    const body = Expense.fromJsonModel(expense).toJsonDTO();
    const response = await super.put(`${this.path}/${id}`, body);

    if (!response) return null;
    return Expense.fromJson(response);
  }

  async deleteExpense(id: string): Promise<void> {
    await super.delete(`${this.path}/${id}`);
  }
}
