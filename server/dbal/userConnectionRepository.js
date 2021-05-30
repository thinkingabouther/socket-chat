const dbConnection = require("./dbConnection.js");
const userConnectionCollectionName = "userConnections";
const friendListGraphName = "friendsList";
const arangojs = require("arangojs");
const aql = arangojs.aql;
const userConnectionsCollection = dbConnection.collection(
  userConnectionCollectionName
);

exports.addConnection = async (_id1, _id2, roomID) => {
  const connection1 = {
    _from: _id1,
    _to: _id2,
    roomID: roomID,
  };
  const connection2 = {
    _from: _id2,
    _to: _id1,
    roomID: roomID,
  };
  await userConnectionsCollection.saveAll([connection1, connection2]);
};

exports.findConnection = async (_id1, _id2) => {
  const cursor = await dbConnection.query(aql`
    FOR connection IN ${userConnectionsCollection}
    FILTER connection._from == ${_id1} AND connection._to == ${_id2}
    LIMIT 1
    RETURN connection`);
  const result = await cursor.all();
  return result.length === 0 ? null : result[0];
};

exports.findFriends = async (user) => {
  const cursor = await dbConnection.query(aql`
    for user, edge in 1..1 outbound ${user._id} 
    GRAPH ${friendListGraphName}
    RETURN {user: user, edge: edge}`);
  return await cursor.all();
};
