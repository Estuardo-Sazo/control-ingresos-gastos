// Genear Id
const uuid = require("uuid");
const auth = require("../auth");
const TABLA = "user";

module.exports = function (injentedStore) {
  let store = injentedStore;
  if (!store) {
    store = require("../../../store/mysql");
  }

  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    return store.get(TABLA, id);
  }

  async function upsert(body, isNew) {
    const authUser = {};
    const user = {};
    if (isNew) {
      user.id = uuid.v4();
      authUser.id = user.id;
    } else {
      user.id = body.id;
      authUser.id = body.id;
    }

    if (body.username) {
      user.username = body.username;
      authUser.username = body.username;
    }
    if (body.name) {
      user.name = body.name;
      authUser.name = body.name;
    }
    if (body.password) {
      authUser.password = body.password;
    }

    //crear o editar datos de tabla auth
    await auth.upsert(authUser, isNew);
    //crear o editar datos de tabla user
    return store.upsert(TABLA, user, isNew);
  }

  function follow(from, to) {
    const data = {
      user_from: from,
      user_to: to,
      created_at: new Date(),
    };
    return store.upsert(TABLA + "_follow", data, true);
  }

  async function following(user) {
    const columns ='id,name, username, created_at';
    const join = {};
    join[TABLA] = "user_to";
    const query = { user_from: user };
    return await store.query(TABLA + "_follow", query, join , columns);
  }

  return {
    list,
    get,
    upsert,
    follow,
    following,
  };
};
