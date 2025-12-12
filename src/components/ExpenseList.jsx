import { useMemo } from "react";

function ExpenseList({ expenses, filterCategory, onDeleteExpense }) {
    // useMemo to optimize filtered and sorted expense list
    const filteredExpenses = useMemo(() => {
        console.log("Filtering expenses...");
        let filtered =
            filterCategory === "All"
                ? expenses
                : expenses.filter((expense) => expense.category === filterCategory);

        // Sort by date (newest first)
        return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [expenses, filterCategory]);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getCategoryIcon = (category) => {
        const icons = {
            Food: "🍔",
            Entertainment: "🎬",
            Utilities: "💡",
            Transportation: "🚌",
            Shopping: "🛍️",
            Healthcare: "🏥",
            Other: "📦",
        };
        return icons[category] || "📦";
    };

    if (filteredExpenses.length === 0) {
        return (
            <div className="expense-list">
                <h2>Expenses</h2>
                <div className="empty-state">
                    <span className="empty-icon">📭</span>
                    <p>No expenses found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="expense-list">
            <h2>Expenses ({filteredExpenses.length})</h2>
            <div className="expense-items">
                {filteredExpenses.map((expense) => (
                    <div key={expense.id} className="expense-item">
                        <div className="expense-icon">
                            {getCategoryIcon(expense.category)}
                        </div>
                        <div className="expense-details">
                            <h3>{expense.title}</h3>
                            <p>
                                <span className="category-tag">{expense.category}</span>
                                <span className="date">{formatDate(expense.date)}</span>
                            </p>
                        </div>
                        <div className="expense-amount">
                            <span className="amount">-₹{expense.amount.toFixed(2)}</span>
                            <button
                                className="btn-delete"
                                onClick={() => onDeleteExpense(expense.id)}
                                aria-label="Delete expense"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExpenseList;
