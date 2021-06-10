const uuid = require("uuid");
const { nanoid } = require('nanoid')
const TABLA = "estimate";
const TABLA_D = "detail_estimate";


module.exports = function(injentedStore) {
    let store = injentedStore;
    if (!store) {
        store = require("../../../store/mysql");
    }

    async function list() {
        return store.list(TABLA);
    }

   
    async function listDetail(estimate) {
        const query = `SELECT ds.uuid, ds.type,
                        i.name as 'income_name',i.value as 'income_value', i.period as 'income_period',
                        e.name as 'expense_name',e.value as 'expense_value', e.period as 'expense_period'
                        FROM ${TABLA_D} ds
                        LEFT JOIN incomes i ON i.uuid=ds.income
                        LEFT JOIN expenses e ON e.uuid=ds.expense
                        WHERE ds.estimate=${estimate}

                        `;
        return store.getQuery(query);
    }
    async function delDetail(uuid) {
        return store.deleteOf(TABLA_D, uuid, 'uuid');
    }
    async function postDetail(body) {
        const data = {};
        const {estimate, type, income, expense } = body;
        data.type = type;
        data.estimate = estimate;
        data.income = income;
        data.expense = expense;
        return store.upsert(ABLA_D, data, true);

    }

    async function post(body) {
        const data = {};
        const {date, range, description } = body;
        data.date = date;
        data.range = range;
        data.description = description;
        return store.upsert(TABLA, data, true);

    }
    async function get(uuid) {
        return store.get(TABLA, uuid);
    }


  

    return {
        list,
        post,
        get,
        listDetail,
        delDetail,
        postDetail
    };


}