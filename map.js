function initMap() {
  d3.csv("geocoded_December2020.csv", function (d) {
    return {
      complaint: d.Complaint,
      date: d.DateOccur,
      crime: d.Crime,
      description: d.Description,
      address: d.ILEADSAddress,
      street: d.ILEADSStreet,
      category: d['Generic Crime'],
      lat: +d.Latitude,
      lng: +d.Longitude
    };
  }).then(function (data) {
    // Initialize the Leaflet Map
    var map = L.map('map-container').setView([38.627, -90.199], 12);

    var googleMapsLayer = L.gridLayer.googleMutant({
      type: 'roadmap' // Can also be 'satellite', 'terrain', or 'hybrid'
    });
    map.addLayer(googleMapsLayer);

    var markers = L.markerClusterGroup();

    data.forEach(function (d) {
      var marker = L.marker([d.lat, d.lng]).bindPopup(d.description);
      markers.addLayer(marker);
    });
    map.addLayer(markers);

    // Chart generation
    function generateChart(filteredData) {
      var chartData = d3.rollup(filteredData, v => v.length, d => d.category);

      var margin = { top: 10, right: 10, bottom: 30, left: 30 };
      var width = 1000 - margin.left - margin.right;
      var height = 200 - margin.top - margin.bottom;

      d3.select("#graph-container").select("svg").remove();

      var svg = d3.select("#graph-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      var x = d3.scaleBand().range([0, width]).padding(0.4);
      var y = d3.scaleLinear().range([height, 0]);

      x.domain(Array.from(chartData.keys()));
      y.domain([0, d3.max(Array.from(chartData.values()))]);

      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      svg.append("g")
        .call(d3.axisLeft(y));

      svg.selectAll(".bar")
        .data(Array.from(chartData.entries()))
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d[0]))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d[1]))
        .attr("height", d => height - y(d[1]));
    }

    // Update chart data
    function updateChartData() {
      const bounds = map.getBounds();
      const filteredData = data.filter((d) => bounds.contains([d.lat, d.lng]))
      generateChart(filteredData)
    }

    updateChartData();
    map.on('moveend', updateChartData);

  });
}
