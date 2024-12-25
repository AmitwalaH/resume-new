const http = require("http");
const fs = require("fs/promises"); 
const requestListener = async (req, res) => {
  res.setHeader("Content-Type", "text/html");

  let filePath;
  switch (req.url) {
    case "/":
      filePath = "index.html";
      break;
    case "/about":
      filePath = "about.html";
      break;
    case "/contact-me":
      filePath = "contact-me.html";
      break;
    default:
      filePath = "404.html";
      res.writeHead(404); // Set 404 status for invalid routes
      break;
  }

  try {
    const content = await fs.readFile(filePath, "utf-8"); // Read the file content
    res.writeHead(200); // Set success status code
    res.end(content); // Send the file content as the response
  } catch (error) {
    res.writeHead(500); // Handle file read errors
    res.end("Internal Server Error");
  }
};

// Create and start the server
const server = http.createServer(requestListener);
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
