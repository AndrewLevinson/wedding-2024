mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5kcmV3bGV2aW5zb24iLCJhIjoiY2pub3RxNXB2MDA5cTNxb2M5MjNoaHl5diJ9.Zq4eS5UJd_60fgNBAFiUsw';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  center: [-73.975, 40.725], // starting position [lng, lat]
  zoom: 11, // starting zoom
  style: 'mapbox://styles/andrewlevinson/clqk3wbgr00fg01pi41z66p8y',
  projection: 'mercator',
});

const scroller = scrollama();

map.on('load', 'our-nyc', ourLayer => {
  map.scrollZoom.disable();
  const tooltip = document.querySelector('.tooltip');
  const bounds = new mapboxgl.LngLatBounds();
  const $empyList = document.querySelector('.list');
  const features = ourLayer.features;
  $empyList.innerHTML = '';
  features.forEach(feature => {
    const { name } = feature.properties;
    $empyList.innerHTML += `<li data-id="${feature.id}">${name}</li>`;
    bounds.extend(feature.geometry.coordinates);
  });
  // map.fitBounds(bounds, { padding: 75 });

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

  // add scroll steps here
  scroller
    .setup({
      step: '.step',
    })
    .onStepEnter(response => {
      const { element, index, direction } = response;

      const city = element.dataset?.city;

      switch (city) {
        case 'oakville':
          map.flyTo({
            center: [-79.6877, 43.4675],
            zoom: 9,
          });
          break;

        case 'queens':
          map.flyTo({
            center: [-73.7692, 40.7603],
            zoom: 9,
          });
          break;

        case 'bg':
          map.flyTo({
            center: [-87.9631, 42.1663],
            zoom: 9,
          });
          break;
        case 'chicago':
          map.flyTo({
            center: [-87.6488, 41.9255],
            zoom: 9,
          });
          break;

        case 'brooklyn':
          map.flyTo({
            center: [-73.9571, 40.7081],
            zoom: 9,
          });
          break;
        case 'toronto':
          map.flyTo({
            center: [-79.3832, 43.6532],
            zoom: 9,
          });
          break;

        case 'vancouver':
          map.flyTo({
            center: [-123.1207, 49.2827],
            zoom: 9,
          });
          break;

        default:
          break;
      }

      if (element.dataset.step == 'list' && direction == 'down') {
        map.fitBounds(bounds, { padding: 75 });
      }
    })
    .onStepExit(response => {
      const { element, index, direction } = response;
      // console.log(element, index, direction);
      // { element, index, direction }
    });
});
