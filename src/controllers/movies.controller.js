import conexion from "../config/mysql/mysql.js";
import Movie from "../models/movies.model.js";

export const getAll = async (req, res) => {
  try {
    const movies = await Movie.getAll(conexion);
    res.json(movies);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las películas",
      message: error.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Movie.getById(conexion, id);

    if (result.length <= 0) return res.status(404).json({
      message: "Not found",
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener la película",
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { titulo, duracionMin, clasificacion, lazamiento } = req.body;
    const pelicula = new Movie(null, titulo, duracionMin, clasificacion, lazamiento);
    const result = await pelicula.create(conexion);
    res.status(201).json({
      message: "Película creada correctamente",
      insertId: result.insertId
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al crear la película",
      message: error.message
    });
  }
};

export const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const { titulo, duracionMin, clasificacion, lazamiento } = req.body;

    const pelicula = new Movie(
      id,
      titulo,
      duracionMin,
      clasificacion,
      lazamiento
    );

    const result = await pelicula.update(conexion);
    if (result.affectedRows <= 0) return res.status(404).json({
        message: "not found",
      });
    
    res.json({ message: "update success" });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar la película",
      message: error.message,
    });
  }
};

export const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Movie.softDelete(conexion, id);

    if (result.affectedRows <= 0) return res.status(404).json({
        message: "not found",
      });
      
    res.sendStatus(204); 
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar la película",
      message: error.message,
    });
  }
};