const ipField = document.getElementById("ip");
const btn = document.getElementById("btn");

const ipAddress = document.getElementById("ip-address");
const loc = document.getElementById("location");
const time = document.getElementById("time");
const name = document.getElementById("name");
const postalCode = document.getElementById("postalCode");

const mymap = L.map("mapid").setView([49.23, 23.22], 12);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

btn.addEventListener("click", () => {
  fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_qNQ78lpru0LkTMQPeSaYNHijVCNY0&ipAddress=${ipField.value}`
  )
    .then((response) => response.json())
    .then((json) => {
      ipAddress.innerHTML = json.ip;
      loc.innerHTML = json.location.city;
      postalCode.innerHTML = json.location.postalCode;
      time.innerHTML = "UTC" + json.location.timezone;
      name.innerHTML = json.as.name;

      const container = L.DomUtil.get("mapid");
      if (container != null) {
        container._leaflet_id = null;
      }

      const mymap = L.map("mapid").setView(
        [json.location.lat, json.location.lng],
        12
      );
      // Icon
      var iconOptions = {
        iconUrl: "images/icon-location.svg",
        iconSize: [40],
      };
      var customIcon = L.icon(iconOptions);

      var markerOptions = {
        title: "MyLocation",
        clickable: true,
        draggable: true,
        icon: customIcon,
      };

      var marker = L.marker(
        [json.location.lat, json.location.lng],
        markerOptions
      );

      marker.addTo(mymap);
      const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      const tiles = L.tileLayer(tileUrl, { attribution });
      tiles.addTo(mymap);
    });
});
