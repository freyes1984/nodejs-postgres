//archivo de configuracion de consultas
const { request, response } = require('express')
const config = require('./config')

const Pool = require('pg').Pool
const pool = new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
    port: config.DB_PORT
})

const getCustomersAsync = async (request, response) => {
    const data = await pool.query('SELECT * FROM public.clientes ORDER BY clienteid ASC')
    console.log('Data:', data.rows)
    response.status(200).json({info: 'Consultar Clientes', datos: data.rows})
}

const getCategories = (request, response) => {
    pool.query('SELECT * FROM public.categorias ORDER BY categoriaid ASC', (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json({info: 'Consultar Categorias', datos: result.rows})
    })
}

const getProducts = (request, response) => {
    const query =  `SELECT
                            productoid,
                            RTRIM(descripcion) AS descripcion,
                            preciounit,
                            existencia
                    FROM    public.productos
                    ORDER 
                    BY      productoid ASC`

    pool.query(query, (error, result) => {
        if(error){
            throw error
        }
        response.status(200).json({info: 'Consultar Productos', datos: result.rows})
    })
}

const getCustomers = (request, response) => {
    pool.query('SELECT * FROM public.clientes ORDER BY clienteid ASC', (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json({info: 'Consultar Clientes', datos: result.rows})
    })
}

const getCustomersById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM public.clientes WHERE clienteid = $1', [id], (error, result) => {
        if(error){
            throw error
        }
        response.status(200).json({info: 'Consultar Clientes por Id', datos: result.rows})
    })
}

const getTotalOrders = (request, response) => {

    const query = `WITH all_empleados AS (
        SELECT
                empleadoid
                ,nombre ||' '|| apellido AS nombre_empleado
        FROM 	empleados
        ),
        all_clientes AS (
        SELECT
                clienteid
                ,RTRIM(nombrecontacto) as nombrecontacto
        FROM 	clientes
        )
        SELECT 
                a.ordenid
                ,d.nombre_empleado
                ,e.nombrecontacto
                ,a.fechaorden
                ,COALESCE(a.descuento, 0) as descuento
                ,SUM(b.cantidad * c.preciounit) as totalordendet
                ,CASE 
                        WHEN a.descuento > 0 THEN (
                                                    SUM(b.cantidad * c.preciounit) 
                                                    - 
                                                    (
                                                        (a.descuento::float / 100) * SUM(b.cantidad * c.preciounit)
                                                    )::float(2)
                                                )::float(2) 
                        ELSE
                                SUM(b.cantidad * c.preciounit)
                        END AS totalorden
        FROM 		ordenes a
        INNER JOIN	detalle_ordenes b ON (a.ordenid = b.ordenid)
        INNER JOIN	productos c ON (b.productoid = c.productoid)
        INNER JOIN 	all_empleados d ON (a.empleadoid = d.empleadoid)
        INNER JOIN  all_clientes e ON (a.clienteid = e.clienteid)
        WHERE
                1 = 1
        GROUP BY 1, 2, 3, 4, 5
        ORDER BY 4`

    pool.query(query, (error, result) => {
        if(error){
            throw error
        }
        response.status(200).json({info: 'Consultar Ordenes Totales', datos: result.rows})
    })
}

const getProductsCategoriesProviders = (request, response) => {
    const query = `SELECT
                            a.productoid,
                            RTRIM(a.descripcion) AS descripcion_producto,
                            RTRIM(b.nombrecat) AS categoria_producto,
                            RTRIM(c.nombreprov) AS proveedor,
                            RTRIM(c.contacto) AS proveedor_contacto,
                            RTRIM(c.celuprov) AS proveedor_celular,
                            RTRIM(c.fijoprov) AS proveedor_fijo
                    FROM public.productos a
                    INNER JOIN public.categorias b ON (a.categoriaid = b.categoriaid)
                    INNER JOIN public.proveedores c ON (a.proveedorid = c.proveedorid)
                    ORDER BY a.productoid ASC`
    
    pool.query(query, (error, result) => {
        if(error){
            throw error
        }
        response.status(200).json({info: 'Consultar productos, categorias y proveedores', datos: result.rows})
    })
    
}

module.exports = {
    getCustomersAsync,
    getCategories,
    getProducts,
    getCustomers,
    getCustomersById,
    getTotalOrders,
    getProductsCategoriesProviders
}