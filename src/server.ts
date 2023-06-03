import 'dotenv/config'
import express from "express"
import infoCard from './api/info.js'
const app = express()
const port = process.env.PORT || 3000

app.get('/', infoCard)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
