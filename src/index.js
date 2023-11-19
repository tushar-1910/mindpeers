
import { app } from "./server.js";

// to return the chat widget 
app.get("/", async (req, res) => {
  try {
    res.status(200).sendFile("/public/index.html");
  } catch {
    res.status(400).send(`<h2>error orrcuring</h2>`)
  }
});
