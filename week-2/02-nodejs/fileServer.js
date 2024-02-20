/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

function getFileName() {
  try {
    const files = fs.readdir("./files", { withFileTypes: true });

    const fileNames = files
      .filter((file) => !file.isDirectory())
      .map((file) => file.name);

    return fileNames;
  } catch (error) {
    console.error("Error reading files:", error);
    // Throw the error to be caught by the calling function (getFiles in this case)
    throw error;
  }
}

function findFileName(files, fileName) {
  return files.filter((file) => {
    if (file === fileName) return file;
  });
}

app.get("/files/", async (req, res) => {
  try {
    const files = await getFileNameAsync();
    res.status(200).json(files);
  } catch (err) {
    console.error("Error retrieving files:", err);
    res.status(500).json({ err: "Failed to retrieve files" });
  }
});

app.get("/file/:filename", (req, res) => {
  console.log("Loading");
  const files = getFileName();

  const result = findFileName(files, req.params.filename);

  console.log(result);

  if (!findFileName(files, req.params.filename).length) {
    res.status(404).send("File not found");
  } else {
    fs.readFile(req.params.filename, "utf-8", (err, data) => {
      res.status(200).send(data);
    });
  }
});

app.use((req, res, next) => {
  if (req.url !== "/") {
    res.status(404).send("Route not found");
  } else {
    next();
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

module.exports = app;
