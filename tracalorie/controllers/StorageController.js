const StorageController = (function() {
    const storageItems = localStorage.getItem('items') === null ? [] : JSON.parse(localStorage.getItem('items'));

    return {
        getItems: function() {
            return storageItems;
        },

        addItem: function() {
            localStorage.setItem('items', JSON.stringify(storageItems));
        },

        updateItem: function(meal, calories) {
            const editedItem = ItemController.getItemById(ItemController.getCurrentItem().id);       
            storageItems.forEach(item => {
                if (item.id === editedItem.id) {
                    item.meal = meal;
                    item.calories = parseInt(calories);
                }
            })
            localStorage.setItem('items', JSON.stringify(storageItems));
        },

        deleteItem: function() {    
            localStorage.setItem('items', JSON.stringify(storageItems));
        },

        clearAllItems: function() {
            localStorage.removeItem('items');    
        },
    }
})();