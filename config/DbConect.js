const mongose = require('mongoose');

const DbConect = async () => {
  try {
    const db = await mongose.connect(process.env.Mongo_Uri);
    console.log('Connected to database successfully');
    return db;
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

DbConect();

module.exports = DbConect;