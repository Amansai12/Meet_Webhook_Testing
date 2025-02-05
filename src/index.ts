
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});     

app.post('/webhook/zoom', async (req, res) => {
  console.log(req.body);
  
  res.status(200).send("OK");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});