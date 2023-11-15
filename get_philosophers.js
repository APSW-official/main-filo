document.addEventListener('DOMContentLoaded', function() {
    processFile();
  });


  function processFile() {
    const filePath = 'text.xlsx'; // Update with your actual file path
    const outputDiv = document.getElementById('output');
  
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.responseType = 'arraybuffer';
  
    xhr.onload = function () {
      const arrayBuffer = xhr.response;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
  
      // Process the workbook, for example, display the content in the outputDiv
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    let data="";
     for(el of josonData){
   data+=`
   <tr>
    <td>${el.name}</td>
    <td>${el.date}</td>
    <td>${el.age}</td>
   </tr>
   `
}
output.innerHTML=data
    };
  
     xhr.send();
  }
