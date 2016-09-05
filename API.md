Routes
======
## Item
### Generic items specified by a title and a brand
* GET /items - gets all items
* GET /items:id - gets item given id
* PUT /items:id - updates item given id
* POST /items - creates item given a payload
* DEL /items:id - deletes item given id

## Store
### Stores specified by name, acronym, and address
* GET /stores - gets all stores
* GET /stores/:id - gets store given id
* GET /stores/search/:name - gets all partial matches given a name
* PUT /stores/:id - updates store given id
* POST /stores - creates store given a payload
* POST /store/:id - deletes store given id

## Store Items
### Represents items in a specific store with price, amount, and units
* GET /storeItems - gets all store items
* POST /storeItems/search - get store items given item IDs and store IDs
* PUT /storeItems - updates store items given item IDs and store IDs
* POST /storeItems - creates store items given an item ID and store IDs to attach the item to
* DEL /storeItems/:item_id/store_id - deletes store item given item ID and store ID
