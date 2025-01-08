document.addEventListener('DOMContentLoaded', function() {
    // Memulai musik saat halaman dibuka
    const bgMusic = document.getElementById('bgMusic');
    document.body.addEventListener('click', () => {
        bgMusic.play();
    }, { once: true });

    // Fungsi untuk membuat efek love berterbangan
    function createLove() {
        const loveContainer = document.getElementById('loveContainer');
        const love = document.createElement('div');
        love.innerHTML = '❤️';
        love.className = 'love';
        love.style.left = Math.random() * 100 + 'vw';
        loveContainer.appendChild(love);
        
        setTimeout(() => {
            love.remove();
        }, 4000);
    }

    // Jalankan efek love setiap 300ms
    setInterval(createLove, 300);

    // Kamera dan selfie logic
    const startCameraBtn = document.getElementById('startCamera');
    const cameraPermissionBtn = document.getElementById('cameraPermissionBtn');
    const camera = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const captureBtn = document.getElementById('capture');
    const previewContainer = document.getElementById('previewContainer');
    const photoPreview = document.getElementById('photoPreview');
    const retakeBtn = document.getElementById('retake');
    const shareBtn = document.getElementById('share');

    let stream = null;

    startCameraBtn.addEventListener('click', async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            camera.srcObject = stream;
            camera.style.display = 'block';
            captureBtn.style.display = 'block';
            cameraPermissionBtn.style.display = 'none';
        } catch (err) {
            alert('Error mengakses kamera: ' + err.message);
        }
    });

    captureBtn.addEventListener('click', () => {
        canvas.width = camera.videoWidth;
        canvas.height = camera.videoHeight;
        canvas.getContext('2d').drawImage(camera, 0, 0);
        
        photoPreview.src = canvas.toDataURL('image/png');
        camera.style.display = 'none';
        captureBtn.style.display = 'none';
        previewContainer.style.display = 'block';
    });

    retakeBtn.addEventListener('click', () => {
        camera.style.display = 'block';
        captureBtn.style.display = 'block';
        previewContainer.style.display = 'none';
    });

    shareBtn.addEventListener('click', async () => {
        try {
            // Konversi canvas ke blob
            const blob = await new Promise(resolve => {
                canvas.toBlob(resolve, 'image/png');
            });

            // Buat file dari blob
            const file = new File([blob], 'birthday-selfie.png', { type: 'image/png' });

            // Cek apakah browser mendukung Web Share API
            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'Birthday Selfie',
                    text: 'Ini foto selfie saya untuk mendapatkan kode selanjutnya. Mohon berikan kode berikutnya 🙏'
                });
            } else {
                // Fallback untuk browser yang tidak mendukung Web Share API
                const imageUrl = canvas.toDataURL('image/png');
                const newTab = window.open();
                newTab.document.body.innerHTML = `
                    <img src="${imageUrl}" alt="Birthday Selfie">
                    <p>Klik kanan pada gambar dan pilih "Simpan gambar" untuk menyimpan.</p>
                    <p>Lalu bagikan ke WhatsApp dengan pesan:</p>
                    <p><em>"Ini foto selfie saya untuk mendapatkan kode selanjutnya. Mohon berikan kode berikutnya 🙏"</em></p>
                `;
            }
        } catch (error) {
            console.error('Error sharing:', error);
            alert('Maaf, terjadi kesalahan saat membagikan foto. Silakan coba simpan gambar secara manual.');
        }
    });
}); 
