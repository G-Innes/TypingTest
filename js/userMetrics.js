// Name for storing metrics in local storage
const storageName = 'typingMetrics';

// Store typing metrics in local storage
function storeMetrics(speed, accuracy) {
    let metrics = getMetrics();

    // Add the new metrics to the list
    metrics.push({
        speed,
        accuracy,
        timestamp: new Date().toISOString()
    });

    // Save the updated metrics back to local storage.
    localStorage.setItem(storageName, JSON.stringify(metrics));
    console.log("Storing metrics:", {speed, accuracy});
}

// Gets all stored metrics from local storage
function getMetrics() {
    // Parse metrics, if there no metrics, return an empty array.
    return JSON.parse(localStorage.getItem(storageName)) || [];
}

// Gets the most recent metric from local storage.
function getLatestMetric() {
    const metrics = getMetrics();
    // Return the last item in the metrics array.
    return metrics.slice(-1)[0] || null;
}

// Gets the second most recent metric from local storage.
function getSecondLatestMetric() {
    const metrics = getMetrics();
    // Returns second last item in metrics array.
    return metrics.slice(-2, -1)[0] || null;
}

// Create and append a table cell to a given row.
function createTableCell(row, content) {
    const cell = document.createElement('td');
    cell.textContent = content;
    row.appendChild(cell);
}

// Display all the stored metrics in a table.
function displayMetrics() {
    const tableBody = document.querySelector('#metricsTable tbody');
    const metrics = getMetrics();

    // Clear existing rows in the table
    tableBody.innerHTML = '';

    // Loop through each metric & create row in table
    metrics.forEach((metric, index) => {
        const row = document.createElement('tr');
        createTableCell(row, index + 1);
        createTableCell(row, metric.speed);
        createTableCell(row, metric.accuracy);
        tableBody.appendChild(row);
    });
}

export { storeMetrics, getMetrics, getLatestMetric, getSecondLatestMetric, displayMetrics };
