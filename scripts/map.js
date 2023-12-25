mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5kcmV3bGV2aW5zb24iLCJhIjoiY2pub3RxNXB2MDA5cTNxb2M5MjNoaHl5diJ9.Zq4eS5UJd_60fgNBAFiUsw';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  center: [-73.975, 40.725], // starting position [lng, lat]
  zoom: 12, // starting zoom
  style: 'mapbox://styles/andrewlevinson/clqk3wbgr00fg01pi41z66p8y',
});

map.on('load', function () {
  const tooltip = document.querySelector('.tooltip');
  map.on('mousemove', 'our-nyc', e => {
    const props = e.features[0].properties;
    const { Name: name, Description: description } = props;
    tooltip.style.opacity = 1;
    tooltip.innerHTML = `<div class="name">${name}</div> <div class="description">${description}</div>`;
    tooltip.style.top = `${e.point.y + 30}px`;
    tooltip.style.left = `${e.point.x - 112}px`;
  });
  map.on('mouseout', 'our-nyc', e => {
    tooltip.style.opacity = 0;
  });
});
