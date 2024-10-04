document.addEventListener("DOMContentLoaded", function() {
    const photoElement = document.getElementById("photo");
    const mapElement = document.getElementById("map");
    
    loadSavedData();

    document.getElementById("takePhoto").addEventListener("click", takePhoto);

    function loadSavedData() {
        const savedPhoto = localStorage.getItem("photo");
        const savedLatitude = localStorage.getItem("latitude");
        const savedLongitude = localStorage.getItem("longitude");

        if (savedPhoto && savedLatitude && savedLongitude) {
            photoElement.src = savedPhoto;
            photoElement.style.display = "block";
            initMap(savedLatitude, savedLongitude);
        }
    }

    function takePhoto() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                const video = document.createElement("video");
                video.srcObject = stream;
                video.play();

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                video.addEventListener("loadedmetadata", function() {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    context.drawImage(video, 0, 0);
                    stream.getTracks().forEach(track => track.stop());

                    const photoDataUrl = canvas.toDataURL("image/jpeg");
                    photoElement.src = photoDataUrl;
                    photoElement.style.display = "block";

                    navigator.geolocation.getCurrentPosition(function(position) {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;

                        localStorage.setItem("photo", photoDataUrl);
                        localStorage.setItem("latitude", latitude);
                        localStorage.setItem("longitude", longitude);

                        initMap(latitude, longitude);
                    });
                });
            })
            .catch(function(error) {
                console.error("Erro ao acessar a câmera:", error);
            });
    }

    function initMap(latitude, longitude) {
        const map = L.map(mapElement).setView([latitude, longitude], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        L.marker([latitude, longitude]).addTo(map);
    }
});
