var mongoose_1 = require('mongoose');
mongoose_1.connect("mongodb://localhost/test");
var tagSchema = new mongoose_1.Schema({
    name: mongoose_1.Schema.Types.String
});
exports.Tag = mongoose_1.model("Tag", tagSchema);
