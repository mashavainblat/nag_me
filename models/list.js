var mongoose = require("mongoose");

var listSchema = mongoose.Schema({
	listItem: String,
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("List", listSchema);