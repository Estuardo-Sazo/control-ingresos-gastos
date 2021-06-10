const uuid = require("uuid");
const { nanoid } = require('nanoid')
const TABLA = "expenses";
const TABLA_G = "groups";
const TABLA_SG = "sub_groups";

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
        const query = `SELECT s.uuid, s.name , s.description,s.period,s.status,s.value, sg.name as 'sub_group',s.date, g.name as 'group' FROM ${TABLA} s
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

        const { name, description, subgroup, period, value, date } = body;
        data.uuid = nanoid();
        data.name = name;
        data.description = description;
        data.sub_group = subgroup;
        data.period = period;
        data.value = value;
        data.date = date;
        data.status = 1;
        return store.upsert(TABLA, data, true);
    }

    async function put(body) {
        const data = {};
        const { uuid, name, description, group, date } = body;
        data.uuid = uuid;

        if (name) {
            data.name = name;
        }
        if (description) {
            data.description = description;
        }
        if (group) {
            data.group = group;
        }
        if (date) {
            data.date = date;
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