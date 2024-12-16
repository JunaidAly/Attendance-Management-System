document.getElementById('report-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const reportType = document.getElementById('reportType').value;

    try {
        const response = await axios.get(`http://localhost:5000/api/admin/reports?type=${reportType}`);
        const reportData = response.data;

        // Display the report data
        const resultDiv = document.getElementById('report-result');
        resultDiv.innerHTML = `<h2>${reportData.title}</h2><pre>${JSON.stringify(reportData.data, null, 2)}</pre>`;
    } catch (error) {
        console.error('Error generating report:', error.response?.data || error.message);
        alert('Failed to generate report.');
    }
});
