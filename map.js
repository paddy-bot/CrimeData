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
    var map = L.map('map-container').setView([38.6349, -90.2910], 11);

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
// Add Filter All
document.querySelector("#filter-all").addEventListener("change", function (event) {
  const allFilters = document.querySelectorAll(".crime-filter-item");
  const filterAllChecked = event.target.checked;

  allFilters.forEach(function (filter) {
    filter.setAttribute("data-selected", filterAllChecked ? "true" : "false");

    if (filterAllChecked) {
      filter.style.backgroundColor = filter.getAttribute("data-color");
      filter.style.color = "white";
    } else {
      filter.style.backgroundColor = "white";
      filter.style.color = filter.getAttribute("data-color");
    }
  });
  updateChartAndMap();
});

// Add event listener for filter buttons!
document.querySelectorAll(".crime-filter-item").forEach(function (button) {
  button.addEventListener("click", function () {

    var isSelected = button.getAttribute("data-selected") === "true";
    button.setAttribute("data-selected", !isSelected);
    var color = button.getAttribute("data-color");

    if (!isSelected){
      button.style.backgroundColor = color;
      button.style.color = "white";
      button.style.borderColor = "white";
    } else {
      button.style.backgroundColor = "white";
      button.style.color = color;
      button.style.borderColor = color;
    }

    const filterAllCheckbox = document.querySelector("#filter-all");
    if (!isSelected && filterAllCheckbox.checked) {
      filterAllCheckbox.checked = false;
    }

    if (getSelectedCategories().length === allCategories.length) {
      filterAllCheckbox.checked = true;
    }

    updateChartAndMap();
  });
});



    

    
      // Chart generation
    function generateChart(filteredData) {
      var chartData = d3.rollup(filteredData, v => v.length, d => d.category);

      chartData = Array.from(chartData).sort(function(a, b) {
        return a[1] - b[1];
      });
    
      var margin = { top: 10, right: 10, bottom: 50, left: 50 };
      var width = 850 - margin.left - margin.right;
      var height = 600 - margin.top - margin.bottom;
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
        .text("Crime Data by Category");
      
      var svgLeft = svg.node().getBoundingClientRect().left;
      var svgTop = svg.node().getBoundingClientRect().top;

      var crimeColors = {
        "Aggravated Assault": "#55efc4",
        "Armed Robbery": "#81ecec",
        "Arson":  "#74b9ff",
        "Breaking and Entering": "#a29bfe",
        "Burglary": "#dfe6e9",
        "Destruction of Property": "#00b894",
        "Drug Possession": "#00cec9",
        "Fraud": "#0984e3",
        "Homicide": "#6c5ce7",
        "Larceny": "#b2bec3",
        "Motor Vehicle Theft": "#ffeaa7",
        "Other Assault": "#fab1a0",
        "Other Crime": "#ff7675",
        "Other Drug Offense":"#fd79a8",
        "Rape":"#fdcb6e",
        "Robbery": "#e17055",
        "Simple Assault": "#d63031",
        "Weapons Offense": "#e84393",
      }
      var color = d3.scaleOrdinal()
        .domain(chartData.map(function(d) { return d[0]; }))
        .range(chartData.map(function(d) { return crimeColors[d[0]] || "#CCCCCC"; })); // Fallback color

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
          .attr('fill', function(d) { return color(d.data[0]); })
          .attr("stroke", "white")
          .style("stroke-width", "2px")
          .style("opacity", 1)
        .on("mouseover", function(event, d) {
          d3.select(this).transition().duration(200).attr("opacity", 0.7);
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip.html(`${d.data[0]}: ${d.data[1]}`)
            .style("left", (svgLeft + margin.left + radius) + "px")
            .style("top", (svgTop + margin.top + height + 20) + "px")
            .style("position", "absolute");
        })
        .on("mouseout", function(d) {
          d3.select(this).transition().duration(200).attr("opacity", 1);
          tooltip.transition().duration(200).style("opacity", 0);
        });
    
        var tooltip = d3.select("#graph-container")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

    }
    var allCategories = [
      "Aggravated Assault", "Armed Robbery", "Arson", "Breaking and Entering",
      "Burglary", "Destruction of Property", "Drug Possession", "Fraud",
      "Homicide", "Larceny", "Motor Vehicle Theft", "Other Assault",
      "Other Crimes", "Other Drug Offense", "Rape", "Robbery",
      "Simple Assault", "Weapons Offense"
    ];

    // Update chart data
    function updateChartData() {
      const bounds = map.getBounds();
      const filteredData = data.filter((d) => bounds.contains([d.lat, d.lng]))
      generateChart(filteredData)
    }

    updateChartData();
    map.on('moveend', updateChartAndMap);
    window.generateChart = generateChart;

function getSelectedCategories() {
  const filterAllCheckbox = document.querySelector('#filter-all');
  if (filterAllCheckbox.checked) {
    const buttons = document.querySelectorAll('.crime-filter-item[data-selected="false"]');
    const deselectedCategory = Array.from(buttons).map(button => button.value);
    return allCategories.filter(category => !deselectedCategory.includes(category));
  } else {
    const buttons = document.querySelectorAll('.crime-filter-item[data-selected="true"]');
    const categories = Array.from(buttons).map(button => button.value);
    return categories;
  }
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