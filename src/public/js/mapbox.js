/* eslint-disable */

// location object from database
const locations = JSON.parse(document.getElementById('map').dataset.locations);

const map = L.map('map');

// Grouping markers and pinning them and fixing zoom
const markerGroup = [];
locations.forEach((el) => {
  const marker = L.circleMarker([el.coordinates[1], el.coordinates[0]], {
    radius: 8,
    color: '#5ec978',
    fillColor: '#5ec978',
    fillOpacity: 1,
  }).bindTooltip(`Day ${el.day}: ${el.description}`, {
    permanent: false,
    direction: 'top',
    offset: [0, -5],
  });
  markerGroup.push(marker);
  marker.addTo(map);
  console.log(el);
});

// Modifying Leaflet tooltip style from script
const style = `
  .leaflet-tooltip {
    font-size: 14px;
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid #0078A8;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.innerText = style;
document.head.appendChild(styleSheet);

const group = new L.featureGroup(markerGroup);
map.fitBounds(group.getBounds());
map.setZoom(map.getZoom() - 1);

// Tile layering with custom map
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
