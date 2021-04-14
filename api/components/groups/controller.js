const uuid = require("uuid");
const { nanoid } = require('nanoid')
const TABLA = "groups";

module.exports = function (injentedStore) {
    let store = injentedStore;
  if (!store) {
    store = require("../../../store/mysql");
  }

    async  function list() {        
        return store.list(TABLA);
    }

    async function get(uuid) {
        return store.get(TABLA, uuid);      
    }

    async function del(uuid) {
        return store.deleteOf(TABLA, uuid,'uuid');      
    }

    async function post(body) {
        const group = {};
        const {name, description}=body;
        group.uuid = nanoid();
        group.name = name;
        group.description = description;
        return store.upsert(TABLA,group,true);  

    }

    async function put(body) {
        const group = {};
        const {uuid,name, description}=body;
        group.uuid = uuid;
        
        if (name) {
            group.name = name;
        }
        if (description) {
            group.description = description;
            
        }
        return store.upsert(TABLA, group, false);
    }

    return {
        list,
        get,
        post,
        put,
        del
      };


}