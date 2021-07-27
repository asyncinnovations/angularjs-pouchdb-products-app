Product List example with AngularJS and PouchDB
=================================================

List Products in Controller
-----------------------------------
Store products in items model defined by <b>controller</b>:

<pre>
	$scope.showList = function () {
        db.allDocs({include_docs: true, descending: true}).then((doc) => {
            $scope.items = [];
            doc.rows.forEach(function(row) {
                $scope.items.push({product: row.doc.product, quantity: row.doc.quantity, bought: row.doc.bought, _id: row.doc._id, _rev: row.doc._rev});
            });
            $scope.$apply();
        });
    }
</pre>
List Products in View
-----------------------------------
Show products in <b>view</b>:

![List Products](https://github.com/asyncinnovations/angularjs-pouchdb-products-app/blob/master/img/docs/list-products.png)

<pre>
	&lt;div ng-controller="ShoppingListController"&gt;
		&lt;table&gt;
  			&lt;thead&gt;
    			&lt;tr&gt;
      				&lt;th&gt;Product&lt;/th&gt;
      				&lt;th&gt;Quantity&lt;/th&gt;
    			&lt;/tr&gt;
  			&lt;/thead&gt;
  			&lt;tbody&gt;
    			&lt;tr ng-repeat="item in items"&gt;
      				&lt;td&gt;&lt;strong&gt;{{ item.product }}&lt;/strong&gt;&lt;/td&gt;
      				&lt;td&gt;{{ item.quantity }}&lt;/td&gt;
    			&lt;/tr&gt;
  			&lt;/tbody&gt;
		&lt;/table&gt;
	&lt;/div&gt;
</pre>

Add Products
-----------------------------------
Add products in <b>view</b>:

<pre>
	&lt;form name="products"&gt;
    	&lt;input type="text" ng-model="item.product"&gt;
    	&lt;input type="number" ng-model="item.amount"&gt;
    	&lt;button ng-click="addItem()">add item&lt;/button&gt;
	&lt;/form&gt;
</pre>

Functions in <b>controller</b>:

<code>Add item in the items array</code>
<pre>
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
</pre>
Remove Products
-----------------------------------
Remove products in <b>view</b>:

<pre>
	&lt;button class="btn btn-danger btn-small" ng-click="deleteItem(item, $index)"&gt;
    	&lt;i class="icon-trash icon-white"&gt;&lt;/i&gt; remove
	&lt;/button&gt;
</pre>

Function to delete item in <b>Controller</b>

<pre>
	$scope.deleteItem = function(item, index){
        db.remove(item).then((doc) => {
            $scope.items.splice(index, 1);
            $scope.$apply();
            toastr.success("Item removed successfully.");
        })
    };
</pre>


Libs used
--------------------------------------------
   * <b>Bootstrap</b>
      * Version: [3.0.0](https://github.com/twbs/bootstrap/archive/v3.0.0.zip)
 
   * <b>Toastr</b>
      * Version: [2.0.0](https://github.com/CodeSeven/toastr/blob/master/toastr.js)
      
   * <b>jQuery</b>
      * Version: [2.2.0](http://code.jquery.com/jquery-2.2.0.js)