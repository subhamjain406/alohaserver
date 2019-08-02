var Inventory = require("../models/inventory");

exports.getInventory = function (req, res, next) {
    Inventory.find(function (err, inventories) {
        if (err) { res.send(err); }
        res.json(inventories);
    });
}

exports.createInventory = function (req, res, next) {
    let inventoryData = req.body;
    Inventory.create(inventoryData, function (err, inventory) {
        if (err) { res.send(err); }
        Inventory.find(function (err, inventories) {
            if (err) { res.send(err); }
            res.json(inventories);
        });
    });
}

exports.updateInventory = function (req, res, next) {
    let id = req.body._id;
    let inventoryData = req.body;
    delete inventoryData._id;

    Inventory.findOneAndUpdate({ _id: id }, inventoryData, { upsert: true, new: true }, function (err, inventory) {
        if (err) { return res.send(err); }
        Inventory.find(function (err,inventories) {
            if (err){ res.send(err); }
            res.json(inventories);
        });
    });
}