const locationData = {
  oakville: [-79.6877, 43.4675],
  queens: [-73.7692, 40.7603],
  bg: [-87.9631, 42.1663],
  chicago: [-87.6488, 41.9255],
  brooklyn: [-73.9571, 40.7081],
  toronto: [-79.3832, 43.6532],
  vancouver: [-123.1207, 49.2827],
  manhattan: [-73.9911, 40.7359],
};

mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5kcmV3bGV2aW5zb24iLCJhIjoiY2pub3RxNXB2MDA5cTNxb2M5MjNoaHl5diJ9.Zq4eS5UJd_60fgNBAFiUsw';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  center: [-73.975, 40.725], // starting position [lng, lat]
  // center: [-73.7692, 40.7603],
  zoom: 12, // starting zoom
  style: 'mapbox://styles/andrewlevinson/clqk3wbgr00fg01pi41z66p8y',
  projection: 'mercator',
});

const scroller = scrollama();

map.on('load', 'our-nyc', ourLayer => {
  map.scrollZoom.disable();
  const tooltip = document.querySelector('.tooltip');
  const bounds = new mapboxgl.LngLatBounds();

  const features = ourLayer.features;
  map.setLayoutProperty('our-nyc', 'visibility', 'none');

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

  // add scroll steps here
  scroller
    .setup({
      step: '.step',
    })
    .onStepEnter(response => {
      const { element, index, direction } = response;
      const city = element.dataset?.city;

      map.flyTo({
        center: locationData[city],
        zoom: 9,
        speed: 1.5,
      });
      if (element.dataset.step == 'list') {
        map.setLayoutProperty('our-nyc', 'visibility', 'visible');

        features.forEach(feature => {
          bounds.extend(feature.geometry.coordinates);
        });
        if (window.innerWidth < 600) {
          map.fitBounds(bounds, { padding: 0 });
          map.scrollZoom.disable();
        } else {
          map.fitBounds(bounds, { padding: 150 });
        }
      }
    })
    .onStepExit(response => {
      const { element, index, direction } = response;
    });
});
