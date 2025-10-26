

// Aqui realizamos a requisição para obter os dados
async function fetchChartData(url) {
    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);

        }

        const data = await response.json();

        return data;
    }

    catch (error) {
        console.error('Erro to search data: ', error)

        return {
            xValues: ['erro'],
            yValues: [0],
            barColors: ['grey'],
        }
    }
}


// Nesta função é criado  grafico de barras
async function createChart(id, type, url) {

    const data = await fetchChartData(url)

    const ctx = document.getElementById(id);

    const config = {
        type: type,
        data: {
            labels: data.xValues,
            datasets: [{
                backgroundColor: data.barColors,
                data: data.yValues
            }]
        },
        options: {
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "World Wine Production 2018",
                    font: { size: 16 }
                }
            }
        }
    }

    new Chart(ctx, config);

}


document.addEventListener('DOMContentLoaded', async () => {
    await createChart('chart-bars', 'bar', 'static/data.json'),
    await createChart('chart-pie', 'pie', 'static/data.json'),
    await createChart('chart-donouts', 'doughnut', 'static/data.json')


})