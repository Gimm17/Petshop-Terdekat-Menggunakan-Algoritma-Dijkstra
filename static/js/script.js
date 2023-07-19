// Inisialisasi peta dan fungsi initMap
function initMap() {
  var map = new L.Map("map");
  var osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  var osmLayer = new L.TileLayer(osmUrl, { maxZoom: 18 });
  map.setView(new L.LatLng(-0.88911, 119.88012), 12).addLayer(osmLayer);

  // Menambahkan marker pada start node
  var startNodeMarker = L.marker([-0.8866987, 119.8755979], {
    icon: orangeIcon,
  }).addTo(map);
  startNodeMarker.bindPopup("Start Node: STMIK");

  // Menambahkan marker pada setiap end node
  var endNodes = [
    "Jeslyn Petshop",
    "Faith Petshop",
    "Me-mow Petshop",
    "King Petshop & Grooming",
    "Deyan Petshop",
    "Satellite Petshop",
    "Aulia Home Petshop",
    "Noah Petstore",
    "Kenzo Petshop",
    "Zoey Petshop",
  ];

  // Menambahkan marker pada setiap end node
  var endNodeMarkers = [];
  var lastClickedMarker = null; // Menyimpan status marker terakhir yang diklik

  for (var i = 0; i < endNodes.length; i++) {
    var endNode = endNodes[i];
    var coordinates = getCoordinates(endNode); // Mendapatkan koordinat untuk setiap end node

    var endNodeMarker = L.marker(coordinates).addTo(map);
    endNodeMarker.bindPopup("End Node: " + endNode);

    // Tambahkan event listener untuk menampilkan informasi tambahan ketika marker diklik
    endNodeMarker.on(
      "click",
      showMarkerInfo.bind(null, endNodeMarker, endNode)
    );

    endNodeMarkers.push(endNodeMarker);
  }

  function showMarkerInfo(marker, endNode) {
    if (lastClickedMarker && lastClickedMarker !== marker) {
      // Jika marker terakhir yang diklik ada dan bukan marker yang saat ini diklik, tutup popupnya
      lastClickedMarker.closePopup();
    }

    lastClickedMarker = marker; // Perbarui marker terakhir yang diklik

    var rating = petshopRating[endNode];
    var distance = allDistances[endNode];

    var popupContent =
      // "End Node: " +
      // menggunakanan fucnt diatas untuk menampilkan (End Node : Nama Petshop)
      endNode + "<br>Rating: " + rating + "<br>Jarak: " + distance + " M";
    marker.setPopupContent(popupContent).openPopup();
  }

  // Implementasi algoritma Dijkstra
  function dijkstra(graph, startNode) {
    var distances = {};
    var previous = {};
    var heap = [];

    // Inisialisasi jarak awal semua node dengan Infinity dan node sebelumnya dengan null
    for (var node in graph) {
      distances[node] = Infinity;
      previous[node] = null;
    }

    // Jarak node awal ke node awal adalah 0
    distances[startNode] = 0;

    // Enqueue node awal dengan jarak 0
    heapq.heappush(heap, [0, startNode]);

    while (heap.length > 0) {
      // Ambil node dengan jarak terkecil dari heap
      var [currentDistance, currentNode] = heapq.heappop(heap);

      if (currentDistance > distances[currentNode]) {
        continue;
      }

      // Periksa tetangga-tetangga node saat ini
      for (var neighbor in graph[currentNode]) {
        var distance = graph[currentNode][neighbor];
        var totalDistance = currentDistance + distance;

        // Jika jarak total lebih kecil dari jarak yang sebelumnya diketahui, perbarui jarak dan node sebelumnya
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          previous[neighbor] = currentNode;

          // Enqueue tetangga dengan jarak baru
          heapq.heappush(heap, [totalDistance, neighbor]);
        }
      }
    }

    return { distances, previous };
  }

  // Definisikan graf dengan jarak antar node
  var graph = {
    STMIK: { "Jl. Soeprapto": 0 },
    "Jl. Soeprapto": {
      STMIK: 0,
      "Jl. S. Parman": 130,
      "Faith Petshop": 400,
      "Jl. Tombolotutu": 600,
    },
    "Jl. S. Parman": {
      "Jl. Soeprapto": 130,
      "Jeslyn Petshop": 420,
      "Jl. Ki Hajar Dewantoro": 720,
      "Jl. Setia Budi": 400,
      "Jl. Jendral Ahmad Yani": 300,
    },
    "Jl. Jendral Ahmad Yani": {
      "Jl. S. Parman": 300,
      "Jl. Moh. Hatta": 1000,
    },
    "Jl. Moh. Hatta": {
      "Jl. Jendral Ahmad Yani": 1000,
      "Jl. Mawar": 170,
    },
    "Jl. Mawar": {
      "Jl. Moh. Hatta": 170,
      "Jl. Togian": 630,
      "Jl. Wolter Monginsidi": 380,
    },
    "Jl. Wolter Monginsidi": {
      "Jl. Mawar": 380,
      "Jl. Anoa": 1400,
      "Jl. I Gusti Ngurah Rai": 2300,
    },
    "Jl. I Gusti Ngurah Rai": {
      "Jl. Wolter Monginsidi": 2300,
      "Zoey Petshop": 1500,
    },
    "Jl. Anoa": {
      "Jl. Wolter Monginsidi": 1400,
      "Kenzo Petshop": 270,
    },
    "Jl. Togian": {
      "Jl. Mawar": 630,
      "Aulia Home Petshop": 1100,
    },
    "Jl. Setia Budi": {
      "Jl. S. Parman": 400,
      "Jl. Juanda": 950,
    },
    "Jl. Tj. Satu": {
      "Satellite Petshop": 450,
      "Jl. TG. Tururuka": 550,
      "Noah Petstore": 120,
    },
    "Jl. Juanda": {
      "Jl. Setia Budi": 950,
      "Jl. G. Sidole": 650,
    },
    "Jl. Tombolotutu": {
      "King Petshop & Grooming": 400,
      "Jl. Soeprapto": 600,
    },
    "Jl. Ki Hajar Dewantoro": {
      "Jl. S. Parman": 720,
      "Me-mow Petshop": 150,
    },
    "Jl. G. Sidole": {
      "Jl. Juanda": 650,
      "Jl. Gn. Loli": 260,
      "Jl. TG. Tururuka": 512,
    },
    "Jl. TG. Tururuka": {
      "JL. G. Sidole": 512,
      "Jl. Tj. Satu": 550,
    },
    "Jl. Gn. Loli": {
      "Jl. G. Sidole": 260,
      "Deyan Petshop": 270,
    },
    "Aulia Home Petshop": { "Jl. Togian": 1100 },
    "Zoey Petshop": { "Jl. I Gusti Ngurah Rai": 1500 },
    "Kenzo Petshop": { "Jl. Anoa": 270 },
    "Noah Petstore": { "Jl. Tj. Satu": 120 },
    "Satellite Petshop": { "Jl. Tj. Satu": 450 },
    "Deyan Petshop": { "Jl. Gn. Loli": 270 },
    "Jeslyn Petshop": { "Jl. S. Parman": 420 },
    "Faith Petshop": { "Jl. Soeprapto": 400 },
    "Me-mow Petshop": { "Jl. Ki Hajar Dewantoro": 150 },
    "King Petshop & Grooming": { "Jl. Tombolotutu": 400 },
  };

  // Informasi rating untuk setiap petshop
  var petshopRating = {
    "Jeslyn Petshop": 4.5,
    "Faith Petshop": 4.2,
    "Me-mow Petshop": 4.8,
    "King Petshop & Grooming": 4.0,
    "Deyan Petshop": 4.1,
    "Satellite Petshop": 4.6,
    "Aulia Home Petshop": 4.3,
    "Noah Petstore": 4.9,
    "Kenzo Petshop": 4.7,
    "Zoey Petshop": 4.4,
  };

  var startNode = "STMIK"; // Node awal
  var endNodes = [
    "Jeslyn Petshop",
    "Faith Petshop",
    "Me-mow Petshop",
    "King Petshop & Grooming",
    "Deyan Petshop",
    "Satellite Petshop",
    "Aulia Home Petshop",
    "Noah Petstore",
    "Kenzo Petshop",
    "Zoey Petshop",
  ];

  var allDistances = {};
  var allPaths = {};

  for (var i = 0; i < endNodes.length; i++) {
    var endNode = endNodes[i];
    var { distances, previous } = dijkstra(graph, startNode);

    // Menampilkan jalur terpendek
    var path = [];
    var currentNode = endNode;
    while (currentNode !== startNode) {
      path.push(currentNode);
      currentNode = previous[currentNode];
    }
    path.push(startNode);
    path.reverse();

    // Simpan jarak terpendek dan jalur terpendek pada setiap end node
    allDistances[endNode] = distances[endNode];
    allPaths[endNode] = path;
  }

  // Menampilkan hasil
  for (var i = 0; i < endNodes.length; i++) {
    var endNode = endNodes[i];
    console.log(
      "Jalur terpendek dari STMIK ke",
      endNode + ":",
      allPaths[endNode].join(" -> ")
    );
    console.log("Jarak terpendek:", allDistances[endNode], "M");
    console.log();
  }

  // Menampilkan petshop terdekat
  var closestPetshop = Object.keys(allDistances).reduce(function (a, b) {
    return allDistances[a] < allDistances[b] ? a : b;
  });
  console.log(
    "Petshop Terdekat:",
    closestPetshop + ", Jarak:",
    allDistances[closestPetshop],
    "M"
  );

  // Menampilkan petshop dengan rating tertinggi
  var petshopWithHighestRating = Object.keys(petshopRating).reduce(function (
    a,
    b
  ) {
    return petshopRating[a] > petshopRating[b] ? a : b;
  });
  console.log(
    "Petshop Rating Tertinggi:",
    petshopWithHighestRating + ", Rating:",
    petshopRating[petshopWithHighestRating]
  );

  //Menampilkan informasi petshop terdekat saat button di html di klik
  var showRouteButton = document.getElementById("showRouteButton");
  var petshopResult = document.getElementById("petshopResult");

  var isRouteInfoVisible = false; // Menyimpan status visibilitas informasi petshop terdekat

  showRouteButton.addEventListener("click", function () {
    // Toggle visibilitas informasi petshop rating tertinggi
    if (isRouteInfoVisible) {
      petshopResult.value = ""; // Menghapus teks pada input
    } else {
      petshopResult.value =
        closestPetshop + ", Jarak: " + allDistances[closestPetshop] + " M";
    }

    isRouteInfoVisible = !isRouteInfoVisible; // Mengubah status visibilitas informasi
  });

  //Menampilkan informasi petshop dengan rating tertinggi saat button di html di klik
  var showHighestRatingRouteButton = document.getElementById(
    "showHighestRatingRouteButton"
  );
  var highestRatingResult = document.getElementById("highestRatingResult");

  var isHighestRatingInfoVisible = false; // Menyimpan status visibilitas informasi petshop rating tertinggi

  showHighestRatingRouteButton.addEventListener("click", function () {
    // Toggle visibilitas informasi petshop rating tertinggi
    if (isHighestRatingInfoVisible) {
      highestRatingResult.value = ""; // Menghapus teks pada input
    } else {
      highestRatingResult.value =
        petshopWithHighestRating +
        ", Rating: " +
        petshopRating[petshopWithHighestRating];
    }

    isHighestRatingInfoVisible = !isHighestRatingInfoVisible; // Mengubah status visibilitas informasi
  });

  // Tampilkan garis dari node awal (STMIK) ke petshop terdekat saat tombol diklik
  var showRouteButton = document.getElementById("showRouteButton");
  var routeLine;
  var distanceLabelMarker;

  showRouteButton.addEventListener("click", function () {
    // Jika garis rute sudah ditampilkan, hapus garis dan label jarak
    if (routeLine && distanceLabelMarker) {
      map.removeLayer(routeLine);
      map.removeLayer(distanceLabelMarker);
      routeLine = null;
      distanceLabelMarker = null;
    } else {
      // Tampilkan garis dari node awal (STMIK) ke petshop terdekat
      var closestPetshopCoordinates = getCoordinates(closestPetshop);
      var lineCoordinates = [
        getCoordinates(startNode),
        closestPetshopCoordinates,
      ];
      routeLine = L.polyline(lineCoordinates, { color: "red" }).addTo(map);

      // Tampilkan nilai jarak di atas garis
      var distanceLabel = L.divIcon({
        className: "distance-label",
        html: allDistances[closestPetshop].toString() + " M",
        iconSize: [60, 20],
      });
      distanceLabelMarker = L.marker(lineCoordinates[1], {
        icon: distanceLabel,
      }).addTo(map);
    }
  });

  // Tampilkan garis dari node awal (STMIK) ke petshop dengan rating tertinggi saat tombol diklik
  var showHighestRatingRouteButton = document.getElementById(
    "showHighestRatingRouteButton"
  );
  var highestRatingRouteLine;
  var highestRatingDistanceLabelMarker;

  showHighestRatingRouteButton.addEventListener("click", function () {
    // Jika garis rute sudah ditampilkan, hapus garis dan label jarak
    if (highestRatingRouteLine && highestRatingDistanceLabelMarker) {
      map.removeLayer(highestRatingRouteLine);
      map.removeLayer(highestRatingDistanceLabelMarker);
      highestRatingRouteLine = null;
      highestRatingDistanceLabelMarker = null;
    } else {
      // Tampilkan garis dari node awal (STMIK) ke petshop dengan rating tertinggi
      var highestRatingPetshopCoordinates = getCoordinates(
        petshopWithHighestRating
      );
      var highestRatingLineCoordinates = [
        getCoordinates(startNode),
        highestRatingPetshopCoordinates,
      ];
      highestRatingRouteLine = L.polyline(highestRatingLineCoordinates, {
        color: "blue",
      }).addTo(map);

      // Tampilkan nilai jarak di atas garis
      var highestRatingDistanceLabel = L.divIcon({
        className: "distance-label",
        html: allDistances[petshopWithHighestRating].toString() + " M",
        iconSize: [60, 20],
      });
      highestRatingDistanceLabelMarker = L.marker(
        highestRatingLineCoordinates[1],
        {
          icon: highestRatingDistanceLabel,
        }
      ).addTo(map);
    }
  });
}

// Implementasi sederhana dari heapq
var heapq = {
  heappush: function (array, item) {
    array.push(item);
    array.sort(function (a, b) {
      return a[0] - b[0];
    });
  },
  heappop: function (array) {
    return array.shift();
  },
};

// Fungsi untuk mendapatkan koordinat dari nama node
function getCoordinates(node) {
  var coordinates = {
    STMIK: [-0.8866987, 119.8755979],
    "Jeslyn Petshop": [-0.8869085, 119.8715397],
    "Faith Petshop": [-0.8830524, 119.8758979],
    "Me-mow Petshop": [-0.8904576, 119.8822754],
    "King Petshop & Grooming": [-0.8803138, 119.8722627],
    "Deyan Petshop": [-0.8986076, 119.8816215],
    "Satellite Petshop": [-0.9064756, 119.8799512],
    "Aulia Home Petshop": [-0.9069365, 119.8702099],
    "Noah Petstore": [-0.9062358, 119.8828971],
    "Kenzo Petshop": [-0.9116352, 119.8784613],
    "Zoey Petshop": [-0.9229054, 119.8644576],
  };

  return coordinates[node];
}

// Icon untuk node awal (STMIK) berwarna oranye
var orangeIcon = L.icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Panggil fungsi initMap saat halaman selesai dimuat
window.onload = function () {
  initMap();
};
