var getbabelRelayPlugin = require('babel-relay-plugin');
var SchemaJSON = require('marvelql').SchemaJSON;

module.exports = getbabelRelayPlugin(SchemaJSON.data);
