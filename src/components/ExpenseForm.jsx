import { useState, useRef, useEffect } from "react";

function ExpenseForm({ onAddExpense, categories }) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    // useRef for form field focus management
    const titleInputRef = useRef(null);

    // Focus on title input when component mounts
    useEffect(() => {
        titleInputRef.current?.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !amount || parseFloat(amount) <= 0) {
            alert("Please fill in all fields correctly");
            return;
        }

        const newExpense = {
            id: Date.now(),
            title: title.trim(),
            amount: parseFloat(amount),
            category,
            date,
        };

        onAddExpense(newExpense);

        // Reset form
        setTitle("");
        setAmount("");
        setCategory("Food");
        setDate(new Date().toISOString().split("T")[0]);

        // Focus back on title input after submission
        titleInputRef.current?.focus();
    };

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <h2>Add New Expense</h2>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    ref={titleInputRef}
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter expense title"
                />
            </div>
            <div className="form-group">
                <label htmlFor="amount">Amount (₹)</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                />
            </div>
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories
                        .filter((cat) => cat !== "All")
                        .map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <button type="submit" className="btn-primary">
                Add Expense
            </button>
        </form>
    );
}

export default ExpenseForm;
