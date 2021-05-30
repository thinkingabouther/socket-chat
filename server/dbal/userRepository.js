const dbConnection = require("./dbConnection.js");
const arangojs = require("arangojs");
const userCollectionName = "users";
const userCollection = dbConnection.collection(userCollectionName);
const aql = arangojs.aql;

exports.save = async (user) => {
  user = await userCollection.save(user, { returnNew: true });
  return user.new;
};

exports.findById = async (id) => {
  return await userCollection.firstExample({ _id: id });
};

exports.findByEmail = async (email) => {
  const cursor = await dbConnection.query(aql`
    FOR user IN ${userCollection}
    FILTER user.email == ${email}
    LIMIT 1
    RETURN user`);
  const result = await cursor.all();
  return result.length === 0 ? null : result[0];
};
