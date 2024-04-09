
export function saveFile(filePath, content) {
  const fs = require('fs');
  try {
    fs.writeFile(filePath, content, (err) => {
      if (err) throw err;
      console.log('File is created successfully.');
  })
    return content;
  } catch (error) {
    throw error;
  }
}