/**
 * Google Apps Script สำหรับรับข้อมูล feedback
 * และบันทึกข้อมูลลงใน Google Spreadsheet
 */
function doPost(e) {
  try {
    // แทนที่ด้วย Spreadsheet ID ของคุณ
    var spreadsheetId = "1QmI2uZhsQi0M4YmRJZAkRu4kIYnzexUi2cJLwfHYgcE";
    var ss = SpreadsheetApp.openById(spreadsheetId);
    // ตรวจสอบว่ามีชีทชื่อ "Feedback" หรือไม่ ถ้าไม่มีใช้ชีทแรก
    var sheet = ss.getSheetByName("Feedback") || ss.getSheets()[0];
    
    var name = e.parameter.name || "";
    var feedback = e.parameter.feedback || "";
    var device = e.parameter.device || "";
    var date = new Date(); // timestamp
    
    // บันทึกข้อมูลลงในแถวใหม่ โดยให้ timestamp อยู่ในคอลัมน์แรก
    sheet.appendRow([date, name, feedback, device]);
    
    var result = { result: 'success' };
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    var result = { result: 'error', message: error.toString() };
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
