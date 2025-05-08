import { Router } from "express";
import { 
  getAll,
  getById,
  create,
  updateById,
  deleteById
} from "../controllers/movies.controller.js";

const moviesRouter = Router();
moviesRouter.get('/movies', getAll);
moviesRouter.post('/movies/create', create);
moviesRouter.get('/movies/:id', getById);
moviesRouter.patch('/movies/edit/:id', updateById);
moviesRouter.delete('/movies/delete/:id', deleteById);

export default moviesRouter