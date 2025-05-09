class Movie {
  constructor(
    id = null,
    titulo,
    duracionMin,
    clasificacion,
    lazamiento,
    created_at = null,
    updated_at = null,
    deleted_at = null
  ) {
    this.id = id;
    this.titulo = titulo
    this.duracionMin = duracionMin
    this.clasificacion = clasificacion
    this.lazamiento = lazamiento
    this.created_at = created_at || new Date();
    this.updated_at = updated_at || new Date();
    this.deleted_at = deleted_at;
  }

  static async getAll(conexion) {
      const [result] = await conexion.query("SELECT * FROM PELICULAS WHERE deleted_at IS NULL");
      return result;
  }

  static async getById(conexion, id) {
    const [result] = await conexion.query(
      "SELECT * FROM PELICULAS WHERE ID = ? AND deleted_at IS NULL",
      [id]
    );
    return result;
  }
}

export default Movie;
