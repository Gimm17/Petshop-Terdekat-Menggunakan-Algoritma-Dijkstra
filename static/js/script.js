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
    var orang = ratingCount[endNode];

    var popupContent =
      // "End Node: " +
      // menggunakanan fucnt diatas untuk menampilkan (End Node : Nama Petshop)
      endNode +
      "<br>Rating: " +
      rating +
      " (" +
      orang +
      ")" +
      "<br>Jarak: " +
      distance +
      " M";
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

  // MENAMBAHKAN VISUUALISASI RUTE
  var currentRouteControl = null;

  // Fungsi untuk menampilkan rute ke Jeslyn Petshop
  function showJeslynPetshopRoute() {
    clearCurrentRoute(); // Hapus rute sebelumnya
    currentRouteControl = L.Routing.control({
      waypoints: [
        L.latLng(-0.8866987, 119.8755979),
        L.latLng(-0.8869085, 119.8715397),
      ],
      routeWhileDragging: true,
      createMarker: function () {
        return null; // Return null to prevent adding markers to the map
      },
    }).addTo(map);
  }

  // Fungsi untuk menampilkan rute ke Faith Petshop
  function showFaithPetshopRoute() {
    clearCurrentRoute(); // Hapus rute sebelumnya
    currentRouteControl = L.Routing.control({
      waypoints: [
        L.latLng(-0.8866987, 119.8755979),
        L.latLng(-0.88314, 119.876132),
        L.latLng(-0.8830524, 119.8758979),
      ],
      routeWhileDragging: true,
      createMarker: function () {
        return null; // Return null to prevent adding markers to the map
      },
    }).addTo(map);
  }

  // Fungsi untuk menampilkan rute ke Me-mow Petshop
  function showMemowPetshopRoute() {
    clearCurrentRoute(); // Hapus rute sebelumnya
    currentRouteControl = L.Routing.control({
      waypoints: [
        L.latLng(-0.8866987, 119.8755979),
        L.latLng(-0.888722, 119.878981),
        L.latLng(-0.890453, 119.882583),
      ],
      routeWhileDragging: true,
      createMarker: function () {
        return null; // Return null to prevent adding markers to the map
      },
    }).addTo(map);
  }

  // Fungsi untuk menampilkan rute ke King Petshop & Grooming
  function showKingPetshopRoute() {
    clearCurrentRoute(); // Hapus rute sebelumnya
    currentRouteControl = L.Routing.control({
      waypoints: [
        L.latLng(-0.8866987, 119.8755979),
        L.latLng(-0.8814, 119.876297),
        L.latLng(-0.880318, 119.872581),
      ],
      routeWhileDragging: true,
      createMarker: function () {
        return null; // Return null to prevent adding markers to the map
      },
    }).addTo(map);
  }

  // Fungsi untuk menampilkan rute ke Deyan Petshop
  function showDeyanPetshopRoute() {
    clearCurrentRoute(); // Hapus rute sebelumnya
    currentRouteControl = L.Routing.control({
      waypoints: [
        L.latLng(-0.8866987, 119.8755979),
        L.latLng(-0.888774, 119.878691),
        L.latLng(-0.896986, 119.877793),
        L.latLng(-0.898181, 119.883622),
        L.latLng(-0.8986076, 119.8816215),
      ],
      routeWhileDragging: true,
      createMarker: function () {
        return null; // Return null to prevent adding markers to the map
      },
    }).addTo(map);
  }

  // Fungsi untuk menampilkan rute ke Satellite Petshop
  function showSatellitePetshopRoute() {
    clearCurrentRoute(); // Hapus rute sebelumnya
    currentRouteControl = L.Routing.control({
      waypoints: [
        L.latLng(-0.8866987, 119.8755979),
        L.latLng(-0.888777, 119.87869),
        L.latLng(-0.896984, 119.877878),
        L.latLng(-0.901708, 119.883866),
        L.latLng(-0.9064756, 119.8799512),
      ],
      routeWhileDragging: true,
      createMarker: function () {
        return null; // Return null to prevent adding markers to the map
      },
    }).addTo(map);
  }

  // Fungsi untuk menampilkan rute ke Aulia Home Petshop
  function showAuliaPetshopRoute() {
    clearCurrentRoute(); // Hapus rute sebelumnya
    currentRouteControl = L.Routing.control({
      waypoints: [
        L.latLng(-0.8866987, 119.8755979),
        L.latLng(-0.888136, 119.87249),
        L.latLng(-0.895241, 119.871203),
        L.latLng(-0.90696, 119.870415),
      ],
      routeWhileDragging: true,
      createMarker: function () {
        return null; // Return null to prevent adding markers to the map
      },
    }).addTo(map);
  }

  // Fungsi untuk menampilkan rute ke Noah Petstore
  function showNoahPetstoreRoute() {
    clearCurrentRoute(); // Hapus rute sebelumnya
    currentRouteControl = L.Routing.control({
      waypoints: [
        L.latLng(-0.8866987, 119.8755979),
        L.latLng(-0.887844, 119.875296),
        L.latLng(-0.888669, 119.878706),
        L.latLng(-0.896904, 119.877691),
        L.latLng(-0.897083, 119.883548),
        L.latLng(-0.898106, 119.883444),
        L.latLng(-0.898207, 119.883816),
        L.latLng(-0.901375, 119.883818),
        L.latLng(-0.906267, 119.884042),
        L.latLng(-0.9062358, 119.8828971),
      ],
      routeWhileDragging: true,
      createMarker: function () {
        return null; // Return null to prevent adding markers to the map
      },
    }).addTo(map);
  }

  // Fungsi untuk menampilkan rute ke Kenzo Petshop
  function showKenzoPetshopRoute() {
    clearCurrentRoute(); // Hapus rute sebelumnya
    currentRouteControl = L.Routing.control({
      waypoints: [
        L.latLng(-0.8866987, 119.8755979),
        L.latLng(-0.888136, 119.87249),
        L.latLng(-0.895241, 119.871203),
        L.latLng(-0.896289, 119.871329),
        L.latLng(-0.898701, 119.872894),
        L.latLng(-0.900845, 119.873727),
        L.latLng(-0.905764, 119.875039),
        L.latLng(-0.911566, 119.876228),
        L.latLng(-0.9116352, 119.8784613),
      ],
      routeWhileDragging: true,
      createMarker: function () {
        return null; // Return null to prevent adding markers to the map
      },
    }).addTo(map);
  }

  // Fungsi untuk menampilkan rute ke Zoey Petshop
  function showZoeyPetshopRoute() {
    clearCurrentRoute(); // Hapus rute sebelumnya
    currentRouteControl = L.Routing.control({
      waypoints: [
        L.latLng(-0.8866987, 119.8755979),
        L.latLng(-0.888136, 119.87249),
        L.latLng(-0.895241, 119.871203),
        L.latLng(-0.896289, 119.871329),
        L.latLng(-0.898701, 119.872894),
        L.latLng(-0.900845, 119.873727),
        L.latLng(-0.905764, 119.875039),
        L.latLng(-0.911227, 119.876066),
        L.latLng(-0.9229054, 119.8644576),
      ],
      routeWhileDragging: true,
      createMarker: function () {
        return null; // Return null to prevent adding markers to the map
      },
    }).addTo(map);
  }

  // Fungsi untuk menghapus rute yang sedang ditampilkan dari peta
  function clearCurrentRoute() {
    if (currentRouteControl !== null) {
      map.removeControl(currentRouteControl);
      currentRouteControl = null;
    }
  }

  // Event listener untuk tombol Confirm
  document
    .getElementById("confirmButton")
    .addEventListener("click", function () {
      var selectedPetshop = document.getElementById("petshopDropdown").value;

      // Tampilkan rute berdasarkan pilihan pada dropdown
      if (selectedPetshop === "jeslyn") {
        showJeslynPetshopRoute();
      } else if (selectedPetshop === "faith") {
        showFaithPetshopRoute();
      } else if (selectedPetshop === "memow") {
        showMemowPetshopRoute();
      } else if (selectedPetshop === "king") {
        showKingPetshopRoute();
      } else if (selectedPetshop === "deyan") {
        showDeyanPetshopRoute();
      } else if (selectedPetshop === "satellite") {
        showSatellitePetshopRoute();
      } else if (selectedPetshop === "aulia") {
        showAuliaPetshopRoute();
      } else if (selectedPetshop === "noah") {
        showNoahPetstoreRoute();
      } else if (selectedPetshop === "kenzo") {
        showKenzoPetshopRoute();
      } else if (selectedPetshop === "zoey") {
        showZoeyPetshopRoute();
      }
    });

  // Event listener untuk tombol Cancel
  document
    .getElementById("cancelButton")
    .addEventListener("click", function () {
      clearCurrentRoute(); // Hapus rute yang mungkin ditampilkan
      document.getElementById("petshopDropdown").selectedIndex = 0; // Reset dropdown ke pilihan default
    });

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
      "Jl. KH. Ahmad Dahlan": 114,
    },
    "Jl. KH. Ahmad Dahlan": {
      "Jl. Moh. Hatta": 114,
      "Jl. Sultan Hasanudin": 110,
    },
    "Jl. Sultan Hasanudin": {
      "Jl. KH. Ahmad Dahlan": 110,
      "Jl. Togian": 240,
    },
    "Jl. Mawar": {
      "Jl. Moh. Hatta": 170,
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
      "Jl. Patimura": 130,
      "Jl. Sultan Hasanudin": 240,
    },
    "Jl. Patimura": {
      "Jl. Togian": 130,
      "Jl. Miangas": 750,
    },
    "Jl. Miangas": {
      "Jl. Patimura": 750,
      "Aulia Home Petshop": 290,
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
    "Aulia Home Petshop": { "Jl. Miangas": 290 },
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
    "Faith Petshop": 4.5,
    "Me-mow Petshop": "-",
    "King Petshop & Grooming": 4.6,
    "Deyan Petshop": "-",
    "Satellite Petshop": 4.5,
    "Aulia Home Petshop": 5.0,
    "Noah Petstore": 4.4,
    "Kenzo Petshop": 5.0,
    "Zoey Petshop": 5.0,
  };

  // Informasi jumlah orang yang memberikan rating untuk setiap petshop
  var ratingCount = {
    "Jeslyn Petshop": 6,
    "Faith Petshop": 4,
    "Me-mow Petshop": 0,
    "King Petshop & Grooming": 164,
    "Deyan Petshop": 0,
    "Satellite Petshop": 2,
    "Aulia Home Petshop": 8,
    "Noah Petstore": 98,
    "Kenzo Petshop": 4,
    "Zoey Petshop": 2,
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

  // Fungsi untuk mencari petshop terpopuler berdasarkan skor
  function findMostPopularPetshop() {
    var highestScore = -1;
    var mostPopularPetshop = "";

    for (var petshop in petshopRating) {
      var rating = petshopRating[petshop];
      var count = ratingCount[petshop];

      var score = rating * count;

      if (score > highestScore) {
        highestScore = score;
        mostPopularPetshop = petshop;
      }
    }

    return mostPopularPetshop;
  }

  // Memanggil fungsi untuk mencari petshop terpopuler
  var mostPopularPetshop = findMostPopularPetshop();

  // Menampilkan hasil
  console.log(
    "Petshop Terpopuler:",
    mostPopularPetshop + ", Rating:",
    petshopRating[mostPopularPetshop] + ", Jumlah Pemberi Rating:",
    ratingCount[mostPopularPetshop]
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
  var showMostPopularPetshopButton = document.getElementById(
    "showMostPopularPetshopButton"
  );
  var mostPopularPetshopResult = document.getElementById(
    "mostPopularPetshopResult"
  );

  var isMostPopularPetshopInfoVisible = false; // Menyimpan status visibilitas informasi petshop populer

  // Menambahkan event listener untuk meng-handle klik tombol
  showMostPopularPetshopButton.addEventListener("click", function () {
    // Toggle visibilitas informasi petshop paling populer
    if (isMostPopularPetshopInfoVisible) {
      mostPopularPetshopResult.value = ""; // Menghapus teks pada input
    } else {
      // Mencari petshop paling populer menggunakan fungsi yang telah dibuat sebelumnya
      var mostPopularPetshop = findMostPopularPetshop();

      // Menampilkan hasil informasi petshop paling populer pada input
      mostPopularPetshopResult.value =
        mostPopularPetshop +
        ", Rating: " +
        petshopRating[mostPopularPetshop] +
        ", Dari: " +
        ratingCount[mostPopularPetshop] +
        " Orang";
    }

    isMostPopularPetshopInfoVisible = !isMostPopularPetshopInfoVisible; // Mengubah status visibilitas informasi
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

  // Tampilkan garis dari node awal (STMIK) ke petshop paling populer saat tombol diklik
  var showMostPopularPetshopButton = document.getElementById(
    "showMostPopularPetshopButton"
  );
  var mostPopularPetshopRouteLine;
  var mostPopularPetshopDistanceLabelMarker;

  showMostPopularPetshopButton.addEventListener("click", function () {
    // Jika garis rute sudah ditampilkan, hapus garis dan label jarak
    if (mostPopularPetshopRouteLine && mostPopularPetshopDistanceLabelMarker) {
      map.removeLayer(mostPopularPetshopRouteLine);
      map.removeLayer(mostPopularPetshopDistanceLabelMarker);
      mostPopularPetshopRouteLine = null;
      mostPopularPetshopDistanceLabelMarker = null;
    } else {
      // Dapatkan petshop paling populer menggunakan fungsi yang telah dibuat sebelumnya
      var mostPopularPetshop = findMostPopularPetshop();

      // Tampilkan garis dari node awal (STMIK) ke petshop paling populer
      var mostPopularPetshopCoordinates = getCoordinates(mostPopularPetshop);
      var mostPopularPetshopLineCoordinates = [
        getCoordinates(startNode),
        mostPopularPetshopCoordinates,
      ];
      mostPopularPetshopRouteLine = L.polyline(
        mostPopularPetshopLineCoordinates,
        {
          color: "blue",
        }
      ).addTo(map);

      // Tampilkan nilai jarak di atas garis
      var mostPopularPetshopDistanceLabel = L.divIcon({
        className: "distance-label",
        html: allDistances[mostPopularPetshop].toString() + " M",
        iconSize: [60, 20],
      });
      mostPopularPetshopDistanceLabelMarker = L.marker(
        mostPopularPetshopLineCoordinates[1],
        {
          icon: mostPopularPetshopDistanceLabel,
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
    "Me-mow Petshop": [-0.890453, 119.882583],
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
