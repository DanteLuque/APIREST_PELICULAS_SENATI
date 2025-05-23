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

  async create(conexion) {
    const now = new Date();
    this.created_at = now;
    this.updated_at = now;

    const [result] = await conexion.query(
      `INSERT INTO PELICULAS (TITULO, DURACION_MIN, CLASIFICACION, LANZAMIENTO, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [this.titulo, this.duracionMin, this.clasificacion, this.lazamiento, this.created_at, this.updated_at]
    );
    this.id = result.insertId;
    return result;
  }

  async update(conexion) {
    this.updated_at = new Date();
    const [result] = await conexion.query(
      `UPDATE PELICULAS 
       SET TITULO = ?, DURACION_MIN = ?, CLASIFICACION = ?, LANZAMIENTO = ?, updated_at = ? 
       WHERE ID = ? AND deleted_at IS NULL`,
      [
        this.titulo,
        this.duracionMin,
        this.clasificacion,
        this.lazamiento,
        this.updated_at,
        this.id
      ]
    );
    return result;
  }

  static async softDelete(conexion, id) {
    const [result] = await conexion.query(
      `UPDATE PELICULAS SET deleted_at = ? WHERE ID = ? AND deleted_at IS NULL`,
      [new Date(), id]
    );
    return result;
  }

  static async hardDelete(conexion, id) {
    const [result] = await conexion.query(
      `DELETE FROM PELICULAS WHERE ID = ? AND deleted_at IS NULL`,
      [id]
    );
    return result;
  }

}

export default Movie;
