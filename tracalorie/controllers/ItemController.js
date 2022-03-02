const ItemController = (function() {
    // Item constructor
    const Item = function (id, meal, calories) {
        this.id = id;
        this.meal = meal;
        this.calories = calories;
    }  

    // Data structure
    const data = {
        items: StorageController.getItems(),
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems: function() {
            return data.items;
        },

        getData: function() {
            return data;
        },

        getCurrentItem: function() {
            return data.currentItem;
        },

        createItem: function(meal, calories) {
            const createdItem = new Item(generateItemID(data.items), meal, parseInt(calories));
            return createdItem;
        },

        addItem: function(meal, calories) {
            UIController.showList();
            const newItem = this.createItem(meal, calories);
            data.items.push(newItem);
            return newItem;
        },

        updateItem: function(meal, calories) {
            let updatedItem;
            data.items.forEach(item => {
                if (item.id === data.currentItem.id) {
                    item.meal = meal;
                    item.calories = calories;
                    updatedItem = item;
                }
            })
            return updatedItem;
        },

        deleteItem: function() {
            const currentItem = data.currentItem;
            const index = data.items.indexOf(currentItem);
            data.items.splice(index, 1);
            return currentItem;
        },

        clearAllItems: function() {
            data.items = [];
        },

        getTotalCalories: function() {
            let total = 0;
            if (data.items.length > 0) {
                data.items.forEach(item => {
                    total += item.calories;
                })
            }
            data.totalCalories = total;
            return data.totalCalories;
        },

        getItemById: function(id) {
            let foundItem;
            data.items.forEach(item => {
                if (item.id === id) foundItem = item;
            })
            return foundItem;
        },

        setCurrentItem: function(item) {
            data.currentItem = item;
        }
    }
})();