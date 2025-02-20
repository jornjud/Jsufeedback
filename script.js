document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บเมื่อ submit

    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    submitBtn.disabled = true;
    loading.classList.remove('hidden');

    const name = document.getElementById('name').value.trim();
    const feedback = document.getElementById('feedback').value.trim();

    // ตรวจสอบว่า feedback ไม่ว่างเปล่า
    if (!feedback) {
        alert('กรุณาระบุข้อเสนอแนะ/ร้องเรียน');
        submitBtn.disabled = false;
        loading.classList.add('hidden');
        return;
    }

    // ใช้ UAParser.js เพื่อดึงข้อมูลรายละเอียดของอุปกรณ์
    const parser = new UAParser();
    const result = parser.getResult();
    let deviceInfo = '';

    if (result.device.vendor && result.device.model) {
        deviceInfo += result.device.vendor + ' ' + result.device.model;
    } else {
        deviceInfo += 'Device: Unknown';
    }
    if (result.os.name && result.os.version) {
        deviceInfo += ' | OS: ' + result.os.name + ' ' + result.os.version;
    }
    if (result.browser.name && result.browser.version) {
        deviceInfo += ' | Browser: ' + result.browser.name + ' ' + result.browser.version;
    }

    // URL ของ Google Apps Script Web App ของคุณ
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwC5nQDgNzZgXdtxAQdfy07EhA2V2sOqGvePthlEB2Tuwbs-l5kS8SB3mlwAxDniJ9Z/exec';

    const formData = new FormData();
    formData.append('name', name);
    formData.append('feedback', feedback);
    formData.append('device', deviceInfo);

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
