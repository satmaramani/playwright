const fs = require("fs");
const path = require("path");

const directoryPath =
  "D:/Tutorial Videos/Playwright-Tutorial-March2024/Processed_videos";
const outputFile = "D:/file_list.txt";

function listFilesRecursively(directoryPath, outputFile) {
  const writeStream = fs.createWriteStream(outputFile);

  function listFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const filePath1 = file;
      if (fs.statSync(filePath).isDirectory()) {
        listFiles(filePath); // Recursively list files in subdirectories
      } else {
        writeStream.write(`${filePath1}\n`); // Write file path to the output file
        console.log(filePath1); // Output each file path to the console
      }
    });
  }

  listFiles(directoryPath);

  writeStream.on("finish", () => {
    console.log("File list has been saved to", outputFile);
  });

  writeStream.end();
}

listFilesRecursively(directoryPath, outputFile);
