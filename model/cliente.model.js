const { request, response } = require("express")
const conn = require("../config/conexiondb")

const customerAll = (request, response) => {
    conn.DB_CONEXION.query('SELECT * FROM public.clientes ORDER BY clienteid ASC', (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json({ msj: 'Consultar Clientes', rows: result.rows })
    })
}

const customerById = (request, response) => {
    const id = parseInt(request.params.id)

    conn.DB_CONEXION.query('SELECT * FROM public.clientes WHERE clienteid = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json({ msj: 'Consultar Clientes por Id', rows: result.rows })
    })
}

const customerEdit = (request, response) => {
    const id = parseInt(request.params.id)

    let query = ''
    let arraySecuence = []

    switch (request.body.flag) {
        case 'editState':
            const newState = request.body.newstate
            query = `UPDATE public.clientes SET estado = $1 WHERE clienteid = $2 RETURNING *`
            arraySecuence = [newState, id]
            break;
        case 'editCustomer':
            const { documento, cliente, contacto, direccion, fax, email, celular, fijo } = request.body
            query = `UPDATE 
                                public.clientes 
                            SET     
                                cedula_ruc = $1,
                                nombrecia = $2,
                                nombrecontacto = $3,
                                direccioncli = $4,
                                fax = $5,
                                email = $6,
                                celular = $7,
                                fijo = $8
                            WHERE   
                                clienteid = $9 RETURNING *`
            arraySecuence = [documento, cliente, contacto, direccion, fax, email, celular, fijo, id]
            break;
        default:
            response.status(400).json({ msj: 'Por favor parametrizar bandera' })
            break;
    }

    conn.DB_CONEXION.query(query, arraySecuence, (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json({ msj: `Se Edito el Cliente ID: ${id}`, rows: result.rows })
    })
}

const customerRegister = (request, response) => {
    const { documento, cliente, contacto, direccion, fax, email, celular, fijo, estado } = request.body
    const arraySecuence = [documento, cliente, contacto, direccion, fax, email, celular, fijo, estado]

    const query = `INSERT INTO 
                                public.clientes
                            (
                                clienteid,   
                                cedula_ruc,
                                nombrecia,
                                nombrecontacto,
                                direccioncli,
                                fax,
                                email,
                                celular,
                                fijo,
                                estado
                            )
                            VALUES
                            (
                                nextval('clientes_clienteid_seq'),
                                $1,
                                $2,
                                $3,
                                $4,
                                $5,
                                $6,
                                $7,
                                $8,
                                $9
                            ) RETURNING *`

    conn.DB_CONEXION.query(query, arraySecuence, (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json({ msj: `Se Creo el Cliente ID: ${result.rows[0]['clienteid']} ${result.rows[0]['nombrecia']}`, rows: result.rows })
    })
}

const customerEditStatus = (request, response) => {
    const id = parseInt(request.params.id)
    const status = request.body.status

    const query = `UPDATE public.clientes SET estado = $1 WHERE clienteid = $2 RETURNING *`

    conn.DB_CONEXION.query(query, [status, id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json({ msj: `Se Edito Estado del Cliente ID: ${id}`, rows: result.rows })
    })
}

module.exports = {
    customerAll,
    customerById,
    customerEdit,
    customerEditStatus,
    customerRegister
}