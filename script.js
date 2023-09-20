slet transactions = [];

function addTransaction() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (!description || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const transaction = {
        description,
        amount,
        type,
    };

    transactions.push(transaction);
    updateTransactionList();
    updateBalance();
    clearForm();
}

function updateTransactionList() {
    const transactionsList = document.getElementById("transactions");
    transactionsList.innerHTML = "";

    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <span>${transaction.description}</span>
            <span>$${transaction.amount.toFixed(2)}</span>
            <span>${transaction.type === "income" ? "Income" : "Expense"}</span>
            <button onclick="deleteTransaction(${i})">Delete</button>
        `;

        transactionsList.appendChild(listItem);
    }
}

function updateBalance() {
    const totalIncome = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalExpense = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const balance = totalIncome - totalExpense;

    document.getElementById("totalIncome").textContent = `{totalIncome.toFixed(2)}`;
    document.getElementById("totalExpense").textContent = `{totalExpense.toFixed(2)}`;
    document.getElementById("balanceAmount").textContent = `{balance.toFixed(2)}`;
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateTransactionList();
    updateBalance();
}

function clearForm() {
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

updateTransactionList();
updateBalance();
