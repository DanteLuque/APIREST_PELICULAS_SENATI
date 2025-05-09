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
  const { titulo, duracionMin, clasificacion, lazamiento } = req.body;
  const [result] = await conexion.query(
    `INSERT INTO PELICULAS (TITULO, DURACION_MIN, CLASIFICACION, LANZAMIENTO, created_at, updated_at) VALUES (?,?,?,?,?,?)`,
    [titulo, duracionMin, clasificacion, lazamiento, new Date(), new Date()]
  );

  res.json(result);
};

export const updateById = async (req, res) => {
  const id = req.params.id;
  const { titulo, duracionMin, clasificacion, lazamiento } = req.body;
  const querySQL = `UPDATE PELICULAS SET TITULO=?,DURACION_MIN=?,CLASIFICACION=?, LANZAMIENTO=?, updated_at = ? WHERE ID=? AND deleted_at IS NULL`;
  const [result] = await conexion.query(querySQL, [
    titulo,
    duracionMin,
    clasificacion,
    lazamiento,
    new Date(),
    id,
  ]);

  if (result.affectedRows <= 0) {
    return res.status(404).json({
      message: "not found",
    });
  }

  res.json({ message: "update success" });
};

export const deleteById = async (req, res) => {
  const id = req.params.id;
  const [result] = await conexion.query(
    "UPDATE PELICULAS SET deleted_at = ? WHERE ID = ? AND deleted_at IS NULL",
    [new Date(), id]
  );

  if (result.affectedRows <= 0) {
    return res.status(404).json({
      message: "not found",
    });
  }
  res.sendStatus(204);
};
