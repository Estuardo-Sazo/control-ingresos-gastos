const uuid = require("uuid");
const { nanoid } = require('nanoid')
const TABLA = "sub_groups";
const TABLA_G = "groups";

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
        const query = `SELECT sg.uuid, sg.name , sg.description, g.name as 'group', g.uuid as 'g_uuid' FROM ${TABLA} sg
                        INNER JOIN ${TABLA_G} g ON g.uuid=sg.group`;
        return store.getQuery(query);
    }

    async function del(uuid) {
        return store.deleteOf(TABLA, uuid, 'uuid');
    }

    async function post(body) {
        const data = {};
        const { name, description, group } = body;
        data.uuid = nanoid();
        data.name = name;
        data.group = group;
        data.description = description;
        return store.upsert(TABLA, data, true);
    }

    async function put(body) {
        const data = {};
        const { uuid, name, description, group } = body;
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