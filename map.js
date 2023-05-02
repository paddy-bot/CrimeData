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
  });
}
