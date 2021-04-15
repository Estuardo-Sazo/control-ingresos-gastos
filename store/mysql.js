const mysql = require("mysql");

const config = require("../config");

const dbConf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

/// Conexion
let connection;

function handleConnection() {
    connection = mysql.createConnection(dbConf);

    connection.connect((err) => {
        if (err) {
            console.error("[dbError]", err);
            setTimeout(handleConnection, 2000);
        } else {
            console.log("DB Connectec!");
        }
    });

    connection.on("error", (err) => {
        console.error("[dbError]", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handleConnection();
        } else {
            throw err;
        }
    });
}
handleConnection();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE uuid='${id}'`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function getQuery(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function getOf(table, value, key) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ${key}='${value}'`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function deleteOf(table, value, key) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE ${key}='${value}'`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE ${table} SET ? WHERE uuid=?`, [data, data.uuid],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
}

async function upsert(table, data, isNew) {
    if (data && isNew) {
        return insert(table, data);
    } else {
        return update(table, data);
    }
}

function query(table, query, join, colum = '*') {
    let joinQuery = '';
    if (join) {
        console.log(join);
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
        console.log(joinQuery);
    }
    return new Promise((resolve, reject) => {
        connection.query(`SELECT ${colum} FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res || null);
        });
    });
}

module.exports = {
    list,
    get,
    upsert,
    query,
    getQuery,
    deleteOf,
};