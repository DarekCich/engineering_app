export function readFile(filePath) {
  const fs = require('fs');
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    throw error;
  }
}
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