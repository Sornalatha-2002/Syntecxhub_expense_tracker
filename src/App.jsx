import { useState, useEffect, useCallback } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import { fetchExpenses, categories } from "./services/mockApi";
import "./App.css";

function App() {
  // useState for managing expenses list
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to fetch data from mock API
  useEffect(() => {
    const loadExpenses = async () => {
      setIsLoading(true);
      try {
        const data = await fetchExpenses();
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExpenses();
  }, []);

  // useCallback to optimize add expense handler
  const handleAddExpense = useCallback((newExpense) => {
    console.log("Adding expense...");
    setExpenses((prev) => [...prev, newExpense]);
  }, []);

  // useCallback to optimize delete expense handler
  const handleDeleteExpense = useCallback((id) => {
    console.log("Deleting expense...");
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }, []);

  // useCallback to optimize filter handler
  const handleFilterChange = useCallback((category) => {
    console.log("Changing filter...");
    setFilterCategory(category);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>💰 Expense Tracker</h1>
          <p className="header-subtitle">Track your spending, save more!</p>
        </div>
      </header>

      <main className="app-main">
        <div className="app-grid">
          <aside className="sidebar">
            <ExpenseForm
              onAddExpense={handleAddExpense}
              categories={categories}
            />
            <ExpenseSummary expenses={expenses} />
          </aside>

          <section className="content">
            <div className="filter-section">
              <label htmlFor="filter">Filter by Category:</label>
              <select
                id="filter"
                value={filterCategory}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {isLoading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Loading expenses...</p>
              </div>
            ) : (
              <ExpenseList
                expenses={expenses}
                filterCategory={filterCategory}
                onDeleteExpense={handleDeleteExpense}
              />
            )}
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2025 Expense Tracker | Built with React Hooks</p>
      </footer>
    </div>
  );
}

export default App;
