const uuid = require("uuid");
const { nanoid } = require('nanoid')
const TABLA = "incomes";


module.exports = function(injentedStore) {
    let store = injentedStore;
    if (!store) {
        store = require("../../../store/mysql");
    }

    async function list() {
        return store.list(TABLA);
    }

    async function get(uuid) {
        return store.get(TABLA, uuid);
    }

    async function getQuery() {
        const query = `SELECT s.uuid, s.name , s.description,s.period,s.status,s.value, sg.name as 'sub_group', g.name as 'group' FROM ${TABLA} s
                        INNER JOIN ${TABLA_SG} sg ON sg.uuid=s.sub_group 
                        INNER JOIN ${TABLA_G} g ON g.uuid=sg.group 
                        `;
        return store.getQuery(query);
    }

    async function del(uuid) {
        return store.deleteOf(TABLA, uuid, 'uuid');
    }

    async function post(body) {
        const data = {};

        const { name, period, value } = body;
        data.uuid = nanoid();
        data.name = name;
        data.period = period;
        data.value = value;
        return store.upsert(TABLA, data, true);
    }

    async function put(body) {
        const data = {};
        const { uuid, name, period, value } = body;
        data.uuid = uuid;

        if (name) {
            data.name = name;
        }
        if (period) {
            data.period = period;
        }
        if (value) {
            data.value = value;
        }
        return store.upsert(TABLA, data, false);
    }

    return {
        list,
        get,
        post,
        put,
        del,
        getQuery
    };


}