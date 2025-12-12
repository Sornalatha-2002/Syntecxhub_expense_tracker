import { useMemo } from "react";

function ExpenseSummary({ expenses }) {
    // useMemo to optimize total calculations
    const summary = useMemo(() => {
        console.log("Calculating summary...");

        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

        // Calculate totals by category
        const byCategory = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});

        // Find highest spending category
        let highestCategory = { name: "N/A", amount: 0 };
        Object.entries(byCategory).forEach(([name, amount]) => {
            if (amount > highestCategory.amount) {
                highestCategory = { name, amount };
            }
        });

        return {
            total,
            byCategory,
            highestCategory,
            expenseCount: expenses.length,
        };
    }, [expenses]);

    const getCategoryColor = (category) => {
        const colors = {
            Food: "#ff6b6b",
            Entertainment: "#4ecdc4",
            Utilities: "#ffe66d",
            Transportation: "#95e1d3",
            Shopping: "#dda0dd",
            Healthcare: "#98d8c8",
            Other: "#c7ceea",
        };
        return colors[category] || "#c7ceea";
    };

    return (
        <div className="expense-summary">
            <h2>Summary</h2>
            <div className="summary-cards">
                <div className="summary-card total-card">
                    <span className="summary-label">Total Spent</span>
                    <span className="summary-value">₹{summary.total.toFixed(2)}</span>
                </div>
                <div className="summary-card count-card">
                    <span className="summary-label">Transactions</span>
                    <span className="summary-value">{summary.expenseCount}</span>
                </div>
                <div className="summary-card highest-card">
                    <span className="summary-label">Highest Category</span>
                    <span className="summary-value">
                        {summary.highestCategory.name}
                        <small> (₹{summary.highestCategory.amount.toFixed(2)})</small>
                    </span>
                </div>
            </div>

            {Object.keys(summary.byCategory).length > 0 && (
                <div className="category-breakdown">
                    <h3>By Category</h3>
                    <div className="category-bars">
                        {Object.entries(summary.byCategory)
                            .sort(([, a], [, b]) => b - a)
                            .map(([category, amount]) => (
                                <div key={category} className="category-bar-item">
                                    <div className="category-bar-label">
                                        <span>{category}</span>
                                        <span>₹{amount.toFixed(2)}</span>
                                    </div>
                                    <div className="category-bar-container">
                                        <div
                                            className="category-bar-fill"
                                            style={{
                                                width: `${(amount / summary.total) * 100}%`,
                                                backgroundColor: getCategoryColor(category),
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExpenseSummary;
