import express from 'express';
import moviesRouter from './routes/movies.route.js';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/v1',moviesRouter);

app.use((req,res,next)=>{
  res.status(404).json({
    message: 'not exists endpoint'
  })
})

export default app;