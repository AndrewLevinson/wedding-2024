mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5kcmV3bGV2aW5zb24iLCJhIjoiY2pub3RxNXB2MDA5cTNxb2M5MjNoaHl5diJ9.Zq4eS5UJd_60fgNBAFiUsw';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  center: [-73.975, 40.725], // starting position [lng, lat]
  zoom: 11, // starting zoom
  style: 'mapbox://styles/andrewlevinson/clqk3wbgr00fg01pi41z66p8y',
  projection: 'mercator',
});

map.on('load', 'our-nyc', function (e) {
  const tooltip = document.querySelector('.tooltip');
  const bounds = new mapboxgl.LngLatBounds();
  const $list = document.querySelector('.list');
  e.features.forEach(feature => {
    const { name } = feature.properties;
    $list.innerHTML += `<li>${name}</li>`;
    bounds.extend(feature.geometry.coordinates);
  });
  map.fitBounds(bounds, { padding: 100 });

  map.on('mousemove', 'our-nyc', e => {
    const props = e.features[0].properties;
    const { name, description, vibe } = props;
    tooltip.style.opacity = 1;
    tooltip.innerHTML = `<div class="name">${name}</div> <div class="description">${description}</div><div class="vibe">${vibe}</div>`;
    tooltip.style.top = `${e.point.y + 30}px`;
    tooltip.style.left = `${e.point.x - 112}px`;
  });
  map.on('mouseout', 'our-nyc', e => {
    tooltip.style.opacity = 0;
  });
});
