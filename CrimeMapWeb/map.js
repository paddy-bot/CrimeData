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
        map: map,
        title: crimeData[i].description,
      });
    }
  });
}

google.maps.event.addDomListener(window, "load", initMap);
