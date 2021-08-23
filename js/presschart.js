var pressChart = null;
window.onload = function() {
var ctx = document.getElementById('pressureChart').getContext("2d");

var pdata = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        label: "Pressure History",
        data: [996, 998, 1000, 1010, 1024, 1024, 1028, 1025, 1010, 1000, 1000, 1012],
        backgroundColor: [
          "rgba(10,100,40,0.1)",
          "rgba(20,100,50,0.2)",
          "rgba(30,100,60,0.3)",
          "rgba(40,150,70,0.4)",
          "rgba(50,150,100,0.5)",
          "rgba(60,150,120,0.6)",
          "rgba(70,150,160,0.7)",
          "rgba(80,150,170,0.8)",
          "rgba(90,200,180,0.9)",
          "rgba(100,200,190,1.0)",
          "rgba(150,200,200,1.0)",
          "rgba(190,200,200,1.0)"
        ],
        borderWidth: 0
      }
    ]
  };

var options = {
  responsive: false,
  title: {
    display: false
  },
  legend: {
    display: false
  },
  scales: {
    yAxes: [{
      display: false,
      ticks: {
        stepsize: 2,
	min: 880,
	max: 1080
      }
    }],
    xAxes: [{
      display: false,
      barPercentage: 1.0,
      categoryPercentage: 1.0,
      stacked: true
    }]
  }
};

pressChart = new Chart(ctx, {
        type: 'bar',
        data: pdata,
        options: options
});
}
function updateChart(){
        var pressuredata = parseInt(document.getElementById('pressurebox').textContent);
        if(isNaN(pressuredata)){ return 0; }
        pressChart.data.datasets[0].data.shift();
        pressChart.data.datasets[0].data.push(pressuredata);
        pressChart.update();
}

