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
    chat: [],
  };
  const connection2 = {
    _from: _id2,
    _to: _id1,
    roomID: roomID,
    chat: [],
  };
  await userConnectionsCollection.saveAll([connection1, connection2]);
};

exports.findConnectionByUserIds = async (_id1, _id2) => {
  const cursor = await dbConnection.query(aql`
    FOR connection IN ${userConnectionsCollection}
    FILTER connection._from == ${_id1} AND connection._to == ${_id2}
    LIMIT 1
    RETURN connection`);
  const result = await cursor.all();
  return result.length === 0 ? null : result[0];
};

exports.findConnectionByRoomId = async (roomId, userId) => {
  const cursor = await dbConnection.query(aql`
    FOR connection IN ${userConnectionsCollection}
    FILTER connection.roomID == ${roomId} AND connection._from == ${userId}
    LIMIT 1
    RETURN connection`);
  const result = await cursor.all();
  return result.length === 0 ? null : result[0];
};

exports.appendToConnectionById = async (roomId, userId, message) => {
  await dbConnection.query(aql`
    FOR connection IN ${userConnectionsCollection}
    FILTER connection._from == ${userId} AND connection.roomID == ${roomId}
    UPDATE connection 
    WITH {
    chat : PUSH(connection.chat, ${message})
    } IN userConnections`);
};

exports.replaceInConnectionById = async (roomId, userId, message) => {
  await dbConnection.query(aql`
  FOR connection IN userConnections
    FILTER connection._from == ${userId} AND connection.roomID == ${roomId}
    
    LET newChat = (
    FOR message IN connection.chat 
      RETURN 
        message.uuid == ${message.uuid} ?
            MERGE(message, { body: ${message.body}}) :
            message
    ) 

  UPDATE connection WITH { chat: newChat } IN userConnections`);
};

exports.findFriends = async (user) => {
  const cursor = await dbConnection.query(aql`
    for user, edge in 1..1 outbound ${user._id} 
    GRAPH ${friendListGraphName}
    RETURN {user: user, edge: edge}`);
  return await cursor.all();
};
