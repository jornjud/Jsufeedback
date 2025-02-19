document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการ refresh หน้าเว็บเมื่อ submit

    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    submitBtn.disabled = true;
    loading.classList.remove('hidden');

    const name = document.getElementById('name').value.trim();
    const feedback = document.getElementById('feedback').value.trim();
	const device = navigator.userAgent;

    // ตรวจสอบข้อมูล feedback ต้องไม่ว่างเปล่า
    if (!feedback) {
        alert('กรุณาระบุข้อเสนอแนะ/ร้องเรียน');
        submitBtn.disabled = false;
        loading.classList.add('hidden');
        return;
    }

    // URL ของ Google Apps Script Web App ของคุณ
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwMTWpK86ui7trIEEb62GiT7iLgIAyP8V1ztJrG6kSOe2kZmbOFWQqqndnCcTWX7zMm/exec';

    const formData = new FormData();
    formData.append('name', name);
    formData.append('feedback', feedback);
	formData.append('device', device);

    fetch(scriptURL, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        submitBtn.disabled = false;
        loading.classList.add('hidden');
        
        if (data.result === 'success') {
            alert('ขอบคุณสำหรับข้อเสนอแนะ/ร้องเรียนของคุณ!');
            document.getElementById('feedbackForm').reset();
        } else {
            alert('เกิดข้อผิดพลาด: ' + (data.message || 'กรุณาลองใหม่อีกครั้ง'));
        }
    })
    .catch(error => {
        submitBtn.disabled = false;
        loading.classList.add('hidden');
        alert('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
        console.error('Fetch Error:', error);
    });
});
