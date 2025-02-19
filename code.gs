function doPost(e) {
  try {
    // รับข้อมูลจากคำขอ POST
    var data = e.parameter;
    var name = data.name ? data.name.trim() : "ไม่ระบุ";
    var feedback = data.feedback ? data.feedback.trim() : "";
	var device = data.device ? data.device : "ไม่ทราบอุปกรณ์"; // รับข้อมูล device
    
    // ตรวจสอบว่า feedback ไม่ว่างเปล่า
    if (!feedback) {
      throw new Error("กรุณาระบุข้อเสนอแนะ/ร้องเรียน");
    }
    
    // เปิด Spreadsheet และเพิ่มข้อมูล
    var spreadsheetId = "1QmI2uZhsQi0M4YmRJZAkRu4kIYnzexUi2cJLwfHYgcE"; // แทนที่ด้วย Spreadsheet ID ของคุณ
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheetByName("Feedback") || ss.insertSheet("Feedback");
    
    // ถ้าเป็น sheet ใหม่ให้เพิ่ม header
    if(sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Feedback", "Device"]);
    }
    
    sheet.appendRow([new Date(), name, feedback, device]);
    
    // ส่งผลลัพธ์แบบ JSON กลับไป
    var result = {result: "success"};
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    var result = {result: "error", message: error.toString()};
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Endpoint นี้รองรับเฉพาะคำขอแบบ POST เท่านั้น");
}
