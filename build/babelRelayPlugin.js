var getbabelRelayPlugin = require('babel-relay-plugin');
var SchemaJSON = require('../data/schema.json');

module.exports = getbabelRelayPlugin(SchemaJSON.data);
