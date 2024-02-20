mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5kcmV3bGV2aW5zb24iLCJhIjoiY2pub3RxNXB2MDA5cTNxb2M5MjNoaHl5diJ9.Zq4eS5UJd_60fgNBAFiUsw';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  center: [-73.975, 40.725], // starting position [lng, lat]
  zoom: 11, // starting zoom
  style: 'mapbox://styles/andrewlevinson/clqk3wbgr00fg01pi41z66p8y',
  projection: 'mercator',
});

map.on('load', 'our-nyc', ourLayer => {
  const tooltip = document.querySelector('.tooltip');
  const bounds = new mapboxgl.LngLatBounds();
  const $empyList = document.querySelector('.list');
  const features = ourLayer.features;

  features.forEach(feature => {
    const { name } = feature.properties;
    $empyList.innerHTML += `<li data-id="${feature.id}">${name}</li>`;
    bounds.extend(feature.geometry.coordinates);
  });
  map.fitBounds(bounds, { padding: 75 });

  const handleMouseMove = (e, foundFeature) => {
    const props = e ? e.features[0].properties : foundFeature.properties;
    const { name, description, vibe } = props;

    tooltip.style.opacity = 1;
    tooltip.innerHTML = `<div class="name">${name}</div> <div class="description">${description}</div><div class="vibe">${vibe}</div>`;
    tooltip.style.top = `${e ? e.point.y + 30 : foundFeature._y}px`;
    tooltip.style.left = `${e ? e.point.x - 112 : foundFeature._x}px`;
  };

  const handleMouseOut = () => (tooltip.style.opacity = 0);

  map.on('mousemove', 'our-nyc', e => {
    handleMouseMove(e);
  });

  map.on('mouseout', 'our-nyc', () => {
    handleMouseOut();
  });

  const $finishedList = document.querySelectorAll('.list li');
  $finishedList.forEach(el => {
    el.addEventListener('mouseover', e => {
      const dataID = e.target.dataset.id;
      handleMouseMove(
        null,
        features.find(feature => feature.id == dataID)
      );
    });

    el.addEventListener('mouseout', handleMouseOut);
  });
});
