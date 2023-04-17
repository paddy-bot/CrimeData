var clusterers = {}; // Store the MarkerClusterer instances
var markers = {}; // Store the markers for each category

function initMap() {
  var map = new google.maps.Map(document.querySelector(".map-box"), {
    zoom: 12,
    center: { lat: 38.627, lng: -90.199 },
  });

  d3.csv("geocoded_December2020.csv", function (d) {
    return {
      lat: +d.Latitude,
      lng: +d.Longitude,
      description: d.Description,
      date: d.Date,
      category: d.Category,
    };
  }).then(function (crimeData) {
    for (var i = 0; i < crimeData.length; i++) {
      var marker = new google.maps.Marker({
        position: { lat: crimeData[i].lat, lng: crimeData[i].lng },
        title: crimeData[i].description,
      });

      var category = crimeData[i].category;
      if (!markers[category]) {
        markers[category] = [];
      }
      markers[category].push(marker);
    }

    for (var category in markers) {
      clusterers[category] = new MarkerClusterer(map, markers[category], {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      });
    }
  });
}

// Toggle the visibility of a crime category
function toggleCategory(category, visible) {
  if (clusterers[category]) {
    clusterers[category].clearMarkers();
    if (visible) {
      clusterers[category].addMarkers(markers[category]);
    }
  }
}

google.maps.event.addDomListener(window, "load", initMap);
