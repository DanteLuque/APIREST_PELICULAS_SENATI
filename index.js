import express from 'express';
import conexion from './src/config/mysql/mysql.js';
import dotenv from "dotenv";
dotenv.config();

const PORT=process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',async (req,res)=>{
  const [peliculas] = await conexion.query("SELECT * FROM PELICULAS");
  res.json(peliculas);
})

app.get('/peliculas', (req, res)=> res.send('lista de peliculas obtenidads'));
app.post('/peliculas', (req, res)=> res.send('lista de peliculas insertadas'));
app.put('/peliculas', (req, res)=> res.send('lista de peliculas actualizadas'));
app.delete('/peliculas', (req, res)=> res.send('lista de peliculas eliminadas'));

app.listen(PORT, ()=>{
  console.log(`👾 I'M ALIVE => PORT: ${PORT}`);
});