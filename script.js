document.addEventListener('DOMContentLoaded', function() {
    // Memulai musik saat halaman dibuka
    const bgMusic = document.getElementById('bgMusic');
    document.body.addEventListener('click', () => {
        bgMusic.play();
    }, { once: true });

    // Kamera dan Selfie
    const camera = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const captureBtn = document.getElementById('capture');
    const shareBtn = document.getElementById('share');
    let photoData = null;

    // Meminta izin akses kamera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            camera.srcObject = stream;
        })
        .catch(err => {
            console.error('Error accessing camera:', err);
        });

    // Mengambil foto
    captureBtn.addEventListener('click', () => {
        canvas.width = camera.videoWidth;
        canvas.height = camera.videoHeight;
        canvas.getContext('2d').drawImage(camera, 0, 0);
        photoData = canvas.toDataURL('image/jpeg');
        shareBtn.style.display = 'block';
    });

    // Berbagi ke WhatsApp
    shareBtn.addEventListener('click', () => {
        const phoneNumber = "6282323405877";
        const message = encodeURIComponent("Ini selfie ulang tahunku! Kode hadiahku adalah: LOVE2024");
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    });

    // Verifikasi kode hadiah
    const giftCode = document.getElementById('giftCode');
    const submitCode = document.getElementById('submitCode');
    const giftReveal = document.getElementById('giftReveal');

    submitCode.addEventListener('click', () => {
        if(giftCode.value === 'HBD_SAYANG') {
            giftReveal.style.display = 'block';
        } else {
            alert('Kode tidak valid. Coba lagi!');
        }
    });
}); 