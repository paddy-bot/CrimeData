
function initMap() {
  window.data = [];
  window.map = null;
  window.markers = null;
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

    // Add event listener for filter checkboxes
    document.querySelectorAll('#filters input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener('change', updateChartAndMap);
      
    });
    


      // Chart generation
    function generateChart(filteredData) {
      var chartData = d3.rollup(filteredData, v => v.length, d => d.category);
    
      var margin = { top: 10, right: 10, bottom: 50, left: 50 };
      var width = 750 - margin.left - margin.right;
      var height = 500 - margin.top - margin.bottom;
      var radius = Math.min(width, height) / 2;
    
      d3.select("#graph-container").select("svg").remove();
    
      var svg = d3.select("#graph-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left + radius}, ${margin.top + radius})`);

      svg.append("text")
        .attr("x", 0)
        .attr("y", -height/2 - margin.top)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Crime Data");
    
      var color = d3.scaleOrdinal(d3.schemeCategory10);
    
      var pie = d3.pie()
        .value(function(d) { return d[1]; })
        .sort(null);
    
      var data_ready = pie(Array.from(chartData));
    
      var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
    
      svg.selectAll('slices')
        .data(data_ready)
        .enter()
        .append('path')
          .attr('d', arcGenerator)
          .attr('fill', function(d) { return(color(d.data[0])) })
          .attr("stroke", "white")
          .style("stroke-width", "2px")
          .style("opacity", 1)
        .on("mouseover", function(event, d) {
          d3.select(this).transition().duration(200).attr("opacity", 0.7);
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip.html(`${d.data[0]}: ${d.data[1]}`)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          d3.select(this).transition().duration(200).attr("opacity", 1);
          tooltip.transition().duration(200).style("opacity", 0);
        });
    
      var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    }

    // Update chart data
    function updateChartData() {
      const bounds = map.getBounds();
      const filteredData = data.filter((d) => bounds.contains([d.lat, d.lng]))
      generateChart(filteredData)
    }

    updateChartData();
    map.on('moveend', updateChartData);
    window.generateChart = generateChart;

    function getSelectedCategories() {
      const checkboxes = document.querySelectorAll('#filters input[type="checkbox"]:checked');
      const categories = Array.from(checkboxes).map(checkbox => checkbox.value);
      return categories;
    }

    function updateChartAndMap() {
      const bounds = map.getBounds();
      const selectedCategories = getSelectedCategories();
      
      const filteredData = data.filter((d) => bounds.contains([d.lat, d.lng]) && selectedCategories.includes(d.category));
      
      // Update chart
      generateChart(filteredData);

      // Update map
      markers.clearLayers();
      filteredData.forEach(function (d) {
        var marker = L.marker([d.lat, d.lng]).bindPopup(d.description);
        markers.addLayer(marker);
      });
      window.map.addLayer(window.markers);
    }


  });
}
