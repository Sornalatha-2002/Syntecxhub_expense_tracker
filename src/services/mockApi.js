// Mock API service - simulates async data fetching

// Sample expense data
const mockExpenses = [
  {
    id: 1,
    title: "Grocery Shopping",
    amount: 85.50,
    category: "Food",
    date: "2025-12-10",
  },
  {
    id: 2,
    title: "Netflix Subscription",
    amount: 15.99,
    category: "Entertainment",
    date: "2025-12-08",
  },
  {
    id: 3,
    title: "Electricity Bill",
    amount: 120.00,
    category: "Utilities",
    date: "2025-12-05",
  },
  {
    id: 4,
    title: "Bus Pass",
    amount: 50.00,
    category: "Transportation",
    date: "2025-12-01",
  },
  {
    id: 5,
    title: "Restaurant Dinner",
    amount: 45.00,
    category: "Food",
    date: "2025-12-09",
  },
];

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch all expenses (simulates GET request)
export const fetchExpenses = async () => {
  await delay(800); // Simulate network delay
  return [...mockExpenses];
};

// Available categories
export const categories = [
  "All",
  "Food",
  "Entertainment",
  "Utilities",
  "Transportation",
  "Shopping",
  "Healthcare",
  "Other",
];
