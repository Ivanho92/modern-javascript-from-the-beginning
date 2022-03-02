// App Controller
const AppController = (function(ItemController, StorageController, UIController) {
    // Get UI Selectors
    const UISelectors = UIController.getUISelectors();

    // Regex for validating the form input numbers
    const regexNumber = /^[0-9]+$/;
    
    // Load event listeners
    function loadEventListeners() {
        // Add item event
        const submitBtn = document.querySelector(UISelectors.addBtn);
        submitBtn.addEventListener('click', addItem);

        // Edit item event
        const itemsList = document.querySelector(UISelectors.itemsList);
        itemsList.addEventListener('click', editItem);
        
        // Update item event
        const updateBtn = document.querySelector(UISelectors.updateBtn);
        updateBtn.addEventListener('click', updateItem);

        // Delete item event
        const deleteBtn = document.querySelector(UISelectors.deleteBtn);
        deleteBtn.addEventListener('click', deleteItem);
        
        // Clear all items event
        const clearAllBtn = document.querySelector(UISelectors.clearAllBtn);
        clearAllBtn.addEventListener('click', clearAllItems);
        
        // Back event
        const backBtn = document.querySelector(UISelectors.backBtn);
        backBtn.addEventListener('click', UIController.clearEditState);
    }

    function addItem(e) {
        e.preventDefault();
        const mealInput = document.querySelector(UISelectors.mealInput);
        const caloriesInput = document.querySelector(UISelectors.caloriesInput);
        if (mealInput.value !== '' && regexNumber.test(caloriesInput.value)) {
            const newItem = ItemController.addItem(mealInput.value, caloriesInput.value);
            UIController.printItem(newItem);

            StorageController.addItem(newItem);

            const totalCalories = ItemController.getTotalCalories();
            UIController.printTotalCalories(totalCalories);

            UIController.clearInputs();
        }
    }

    function editItem(e) {
        e.preventDefault();

        if (e.target.classList.contains('edit-item')) {
            // Fetch element ID
            const listItem = e.target.parentNode.parentNode.parentNode;
            const itemID = parseInt(listItem.id.split('-')[1]);
            const item = ItemController.getItemById(itemID);
            // Enter edit state
            ItemController.setCurrentItem(item);
            UIController.enterEditState(item);
        }
    }

    function updateItem(e) {
        e.preventDefault();

        const mealInput = document.querySelector(UISelectors.mealInput);
        const caloriesInput = document.querySelector(UISelectors.caloriesInput);
        if (mealInput.value !== '' && regexNumber.test(caloriesInput.value)) {
            const updatedItem = ItemController.updateItem(mealInput.value, caloriesInput.value);
            UIController.printUpdatedItem(updatedItem);

            StorageController.updateItem(mealInput.value, caloriesInput.value);
            
            const totalCalories = ItemController.getTotalCalories();
            UIController.printTotalCalories(totalCalories);
    
            UIController.clearEditState();
        }

    }

    function deleteItem(e) {
        e.preventDefault();
        
        const itemToDelete = ItemController.deleteItem();
        UIController.removeDeletedItem(itemToDelete);

        StorageController.deleteItem();
        
        const totalCalories = ItemController.getTotalCalories();
        UIController.printTotalCalories(totalCalories);
        
        UIController.clearEditState();
    }
    
    function clearAllItems(e) {
        e.preventDefault();
        
        ItemController.clearAllItems();
        UIController.removeAllItems();
        UIController.hideList();

        StorageController.clearAllItems();

        const totalCalories = ItemController.getTotalCalories();
        UIController.printTotalCalories(totalCalories);

        UIController.clearEditState();
    }

    return {
        init: function() {
            console.log('Initializing App...');

            // Clear edit state
            UIController.clearEditState();
            
            // Populate list with items
            const items = StorageController.getItems();
            if (items.length > 0) {
                items.forEach(item => UIController.printItem(item));
            } else {
                UIController.hideList();
            }
            
            // Calculate and print total calories
            const totalCalories = ItemController.getTotalCalories();
            UIController.printTotalCalories(totalCalories);
            
            //Load event listeners
            loadEventListeners();
            
            console.log('App Initialized. Have fun!');
        }
    }

})(ItemController, StorageController, UIController);

AppController.init();