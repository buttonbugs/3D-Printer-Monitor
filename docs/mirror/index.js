const video = document.getElementById('webcam');

// Request the raw native stream from the device sensor
const constraints = {
    video: {
        // Prevent the browser from cropping or stretching the camera feed
        resizeMode: 'none', 
        
        // Suggest broad boundaries so the browser selects the highest available native mode
        width: { ideal: 4096 }, 
        height: { ideal: 2160 }
    }
};

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            video.srcObject = stream;
            
            // Optional: Log the exact native resolution being used
            const track = stream.getVideoTracks()[0];
            const settings = track.getSettings();
            console.log(`Native Camera Size: ${settings.width}x${settings.height}`);
        })
        .catch(function (error) {
            console.log("Error accessing native stream:", error);
            
            // Strict fallback if 'none' fails on a specific browser
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(s => video.srcObject = s);
        });
}

function flipCamera() {
    if (video.style.transform == "") {
        video.style.transform = "scaleX(-1)"
    } else {
        video.style.transform = ""
    }
}

video.onclick = flipCamera;