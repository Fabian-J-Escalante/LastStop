-- Consulta function agregada stops
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

-- Consulta multitabla  route and agency
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
    a.agency_id = 'BUS';


-- Consulta multitabla fare_attributes and agency
SELECT fare_attributes.price, agency.agency_name
FROM fare_attributes
INNER JOIN agency ON fare_attributes.agency_id = agency.agency_id
WHERE agency.agency_id = 'BUS';


-- Consulta multitabla  trips, routes and calendar
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


-- Consulta simple agency con todas
SELECT 
    agency_id,
    agency_name
FROM 
    agency;

-- Consulta simple simple una sola agency
SELECT 
    agency_name,
    agency_url,
    agency_timezone,
    agency_lang,
    agency_phone
FROM 
    agency
WHERE 
    agency_id = 'BUS';

-- Consulta con campo calculado fare
SELECT fare_id, price, (price * 0.90) AS precio_descuento
FROM fare_attributes
WHERE agency_id = 'BUS';

-- Consulta con funcion agregada route
SELECT COUNT(route_id) AS total_rutas
FROM routes;

--	Consulta multitabla con campo calculado shape, route, trip, headay
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