# Rewards Program - Customer Points Calculation

check out the [project link here](https://customer-rewards-ten.vercel.app/)

## Problem Statement

A retailer offers a **rewards program** to its customers, awarding points based on each recorded purchase.

### Reward Points Calculation

- A customer receives:
  - **2 points** for every dollar spent **over $100** in each transaction.
  - **1 point** for every dollar spent between **$50 and $100** in each transaction.

### Example:

- For a **$120** purchase:
  - **2 points** for every dollar over **$100**: `2 x ($120 - $100) = 40 points`
  - **1 point** for every dollar between **$50 and $100**: `1 x ($100 - 50) = 50 points`

Total points earned = **40 + 50 = 90 points**.

## Task Requirements

- **Use React JS** (Do not use TypeScript).
- Simulate an **asynchronous API call** to fetch transaction data.
- **No Redux** should be used for state management.
- Create a **mock dataset** to best demonstrate your solution. The data should be made up, but it should clearly show the reward points calculation for different customers.
- Add **unit test cases** to verify the solution.
- **Check the solution into GitHub** for version control and sharing.

## Solution Approach

### 1. **React Application**

The React application will be divided into several components to manage different parts of the solution:

- **`App.js`**: The main component that fetches the transaction data and calculates the reward points for each customer.
- **`DisplayCustomers.jsx`**: Displays the list of customers, their transaction details, and reward points. It will include pagination.
- **`Modal.jsx`**: Displays detailed transaction history for a selected customer when the "View Transactions" button is clicked.
- **`useFetch.jsx`**: A custom hook to simulate the asynchronous API call to fetch the transaction data.
- **`usePagination.jsx`**: A custom hook to handle pagination of customer data.

### 2. **Transaction Points Calculation**

- **`calculateRewards` Function**: This function will calculate the reward points based on the amount spent in each transaction.
- **`evaluateTransactions` Function**: This function will process all transactions and calculate the total reward points for each customer, as well as provide information about their last 3 months of transactions.

### 3. **API Simulation**

To simulate the asynchronous API call:

- Used `useEffect` to simulate the fetching of transaction data.
- The data will be fetched asynchronously using `fetch`.

### 4. **Unit Testing**

Used **React Testing Library** to write unit tests for the following:

- Testing the calculation of reward points (`calculateRewards`).
- Testing the processing of multiple transactions for a customer (`evaluateTransactions`).

---

## Example Dataset

The following is a sample dataset that could be used to demonstrate the solution:

```json
[
  { "customerId": "1", "date": "2023-01-10", "amount": 120 },
  { "customerId": "1", "date": "2023-01-25", "amount": 80 },
  { "customerId": "2", "date": "2023-01-15", "amount": 200 },
  { "customerId": "2", "date": "2023-02-05", "amount": 50 },
  { "customerId": "3", "date": "2023-03-01", "amount": 95 },
  { "customerId": "3", "date": "2023-03-10", "amount": 110 }
]
```
