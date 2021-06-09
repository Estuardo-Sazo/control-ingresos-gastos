const uuid = require("uuid");
const { nanoid } = require('nanoid')
const TABLA = "real_date";

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

    async function del(uuid) {
        return store.deleteOf(TABLA, uuid, 'uuid');
    }

    async function post(body) {
        const data = {};
        const { type, income, expense } = body;
        data.type = type;
        data.income = income;
        data.expense = expense;
        return store.upsert(TABLA, data, true);

    }

    async function put(body) {
        const data = {};
        const { uuid, type, income, expense } = body;
        data.uuid = uuid;
        if (type) {
            data.type = type;
        }
        if (income) {
            data.income = income;
        }
        if (expense) {
            data.expense = expense;
        }
        return store.upsert(TABLA, data, false);
    }

    return {
        list,
        get,
        post,
        put,
        del
    };


}