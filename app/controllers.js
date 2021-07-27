var myApp = angular.module("myApp", []);
myApp.controller('ShoppingListController', function($scope) {

    var db = new PouchDB('shopping_list_db');

    $scope.item = {};

    $scope.items = [];

    $scope.addItem = function () {
        var product = {
            _id: new Date().toISOString(),
            product: $scope.item.product,
            quantity: $scope.item.quantity,
        };
        db.put(product, function callback(err, result) {
            if (!err && result.ok) {
                $scope.items.push({product: $scope.item.product, quantity: $scope.item.quantity, _id: result.ok.id, _rev: result.ok.rev});
                $scope.item.product = $scope.item.quantity = '';
                $scope.$apply();
                toastr.success("Item added successfully.");
          }
        });
    };

    $scope.deleteItem = function(item, index){
        db.remove(item).then((doc) => {
            $scope.items.splice(index, 1);
            $scope.$apply();
            toastr.success("Item removed successfully.");
        })
    };

    $scope.showList = function () {
        db.allDocs({include_docs: true, descending: true}).then((doc) => {
            $scope.items = [];
            doc.rows.forEach(function(row) {
                $scope.items.push({product: row.doc.product, quantity: row.doc.quantity, bought: row.doc.bought, _id: row.doc._id, _rev: row.doc._rev});
            });
            $scope.$apply();
        });
    }
})