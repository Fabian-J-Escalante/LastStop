from flask import Flask, jsonify, request
from flask_cors import CORS
import asyncpg
import asyncio

app = Flask(__name__)
CORS(app)
# Configuración de la conexión a la base de datos
DB_CONFIG = {
    "user": "postgres",
    "password": "YQo8UXHsAe-4i",
    "database": "TransportePublico",
    "host": "localhost",
    "port": 5432
}

# Función asíncrona para conectar a la base de datos
async def get_db_connection():
    try:
        conn = await asyncpg.connect(**DB_CONFIG)
        return conn
    except Exception as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None

# Función para cerrar la conexión a la base de datos
async def close_db_connection(conn):
    await conn.close()

# Rutas y funciones para ejecutar las consultas

@app.route('/api/stops', methods=['GET'])
async def get_stops():
    query = """
        SELECT 
            s.shape_id,
            AVG(s.shape_pt_lat) AS avg_latitude,
            AVG(s.shape_pt_lon) AS avg_longitude
        FROM 
            shapes s
        WHERE 
            s.shape_id = 'C01_r1'
        GROUP BY 
            s.shape_id;
    """
    try:
        conn = await get_db_connection()
        if not conn:
            return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

        data = await conn.fetch(query)
        await close_db_connection(conn)

        return jsonify([dict(record) for record in data])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/routes_and_agency', methods=['GET'])
async def get_routes_and_agency():
    agency_id = request.args.get('agency_id', 'BUS')
    print(f"Received agency_id: {agency_id}")  # Agrega esta línea
    query = """
        SELECT 
            r.route_id,
            r.route_short_name,
            r.route_long_name,
            a.agency_name
        FROM 
            routes r
        JOIN 
            agency a ON r.agency_id = a.agency_id
        WHERE
            a.agency_id = '{}';
    """.format(agency_id)
    print(query)
    try:
        conn = await get_db_connection()
        if not conn:
            return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

        data = await conn.fetch(query)
        await close_db_connection(conn)

        return jsonify([dict(record) for record in data])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/fare_attributes', methods=['GET'])
async def get_fare_attributes():
    query = """
        SELECT fare_attributes.price, agency.agency_name
        FROM fare_attributes
        INNER JOIN agency ON fare_attributes.agency_id = agency.agency_id
        WHERE agency.agency_id = 'BUS';
    """
    try:
        conn = await get_db_connection()
        if not conn:
            return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

        data = await conn.fetch(query)
        await close_db_connection(conn)

        return jsonify([dict(record) for record in data])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/routes_calendar', methods=['GET'])
async def get_routes_calendar():
    query = """
        SELECT 
            r.route_id,
            r.route_short_name,
            r.route_long_name,
            s.shape_id,
            c.monday,
            c.tuesday,
            c.wednesday,
            c.thursday,
            c.friday,
            c.saturday,
            c.sunday
        FROM 
            shapes s
        JOIN 
            trips t ON s.shape_id = t.shape_id
        JOIN 
            routes r ON t.route_id = r.route_id
        JOIN 
            calendar c ON t.service_id = c.service_id
        WHERE 
            s.shape_id = 'C01_r1'
            AND s.shape_pt_sequence = 0;
    """
    try:
        conn = await get_db_connection()
        if not conn:
            return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

        data = await conn.fetch(query)
        await close_db_connection(conn)

        return jsonify([dict(record) for record in data])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/agency', methods=['GET'])
async def get_agency():
    query = """
        SELECT 
            agency_id,
            agency_name
        FROM 
            agency;
    """
    try:
        conn = await get_db_connection()
        if not conn:
            return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

        data = await conn.fetch(query)
        await close_db_connection(conn)

        return jsonify([dict(record) for record in data])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/agency_details/<agency_id>', methods=['GET'])
async def get_agency_details(agency_id):
    query = """
        SELECT 
            agency_name,
            agency_url,
            agency_timezone,
            agency_lang,
            agency_phone
        FROM 
            agency
        WHERE 
            agency_id = $1;
    """
    try:
        conn = await get_db_connection()
        if not conn:
            return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

        data = await conn.fetch(query, agency_id)
        await close_db_connection(conn)

        return jsonify([dict(record) for record in data])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/fare_discount', methods=['GET'])
async def get_fare_discount():
    query = """
        SELECT fare_id, price, (price * 0.50) AS precio_descuento
        FROM fare_attributes
        WHERE agency_id = 'BUS';
    """
    try:
        conn = await get_db_connection()
        if not conn:
            return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

        data = await conn.fetch(query)
        await close_db_connection(conn)

        return jsonify([dict(record) for record in data])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/route_count', methods=['GET'])
async def get_route_count():
    query = """
        SELECT COUNT(route_id) AS total_rutas
        FROM routes;
    """
    try:
        conn = await get_db_connection()
        if not conn:
            return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

        data = await conn.fetch(query)
        await close_db_connection(conn)

        return jsonify([dict(record) for record in data])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/route_frequencies', methods=['GET'])
async def get_route_frequencies():
    query = """
        SELECT 
            r.route_id,
            r.route_short_name,
            r.route_long_name,
            f.headway_secs,
            (f.headway_secs / 60) AS frequency_minutes
        FROM 
            frecuencies f
        JOIN 
            trips t ON f.trip_id = t.trip_id
        JOIN 
            shapes s ON t.shape_id = s.shape_id
        JOIN 
            routes r ON t.route_id = r.route_id
        WHERE 
            s.shape_id = 'C01_r1';
    """
    try:
        conn = await get_db_connection()
        if not conn:
            return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

        data = await conn.fetch(query)
        await close_db_connection(conn)

        return jsonify([dict(record) for record in data])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False, host="0.0.0.0")  # Deshabilitar reloader para evitar problemas con asyncio
