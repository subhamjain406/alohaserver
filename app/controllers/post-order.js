var  PostOrder = require("../models/post-order");

exports.getPostOrder = function (req, res, next) {
    PostOrder.find(function (err, postorders) {
        if (err) { res.send(err); }
        res.json(postorders);
    });
}

exports.createPostOrder = function (req, res, next) {
    let postOrder = req.body;
    PostOrder.create(postOrder, function (err, postorder) {
        if (err) { res.send(err); }
        PostOrder.find(function (err, postorders) {
            if (err) { res.send(err); }
            res.json(postorders);
        });
    });
}

exports.updatePostOrder = function (req, res, next) {
    let id = req.body._id;
    let postOrder = req.body;
    delete postOrder._id;

    PostOrder.findOneAndUpdate({ _id: id }, postOrder, { upsert: true, new: true }, function (err, postorder) {
        if (err) { return res.send(err); }
        PostOrder.find(function (err,postorders) {
            if (err){ res.send(err); }
            res.json(postorders);
        });
    });
}