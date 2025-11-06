import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Expense from "@/entities/expense.model";
import type { ExpenseContextType } from "./TypesContext";
import ExpenseService from "@/services/expense.service";

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);
const expenseService = new ExpenseService();

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expensesByDepartment, setExpensesByDepartment] = useState<Expense[]>([]);
  const [loadingExpense, setLoadingExpense] = useState<boolean>(false);
  const [errorExpense, setErrorExpense] = useState<string>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchExpenses = useCallback(async () => {
    if (isLoaded && expenses.length > 0) return;

    setLoadingExpense(true);
    try {
      const allExpenses = await expenseService.getExpenses();
      setExpenses(allExpenses);
      setIsLoaded(true);
    } catch (error) {
      setErrorExpense("Error fetching expenses: " + error);
    } finally {
      setLoadingExpense(false);
    }
  }, [expenses, isLoaded]);

  const fetchExpensesByDepartment = useCallback(async () => {
    setLoadingExpense(true);
    try {
      const deptExpenses = await expenseService.getExpenseByDepartment();
      setExpensesByDepartment(deptExpenses);
    } catch (error) {
      setErrorExpense("Error fetching expenses by department: " + error);
    } finally {
      setLoadingExpense(false);
    }
  }, []);

  const refetchExpenses = useCallback(async () => {
    setIsLoaded(false); // reset cache
    await fetchExpenses();
  }, [fetchExpenses]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        expensesByDepartment,
        loadingExpense,
        errorExpense,
        fetchExpenses,
        fetchExpensesByDepartment,
        refetchExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
};
