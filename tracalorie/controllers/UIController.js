const UIController = (function() {
    const UISelectors = {
        itemsList: '.collection',
        form: 'form',
        addBtn: '#add-btn',
        updateBtn: '#update-btn',
        deleteBtn: '#delete-btn',
        backBtn: '#back-btn',
        viewState: '#view-state',
        editState: '#edit-state',
        mealInput: '#meal',
        caloriesInput: '#calories',
        totalCalories: '#calories-total',
        clearAllBtn: '#clear-all'
    }

    return {
        printItem: function(item){
            const element = document.createElement('li');
            element.className = 'collection-item';
            element.id = 'item-'+item.id;
            element.innerHTML = `
                <div class="row valign-wrapper" style="margin-bottom: 0;">
                    <div class="col s10"><strong>${item.meal}: </strong><em>${item.calories} calories</em></div>
                    <div class="col s2 right-align"><i style="margin-right: 5px; cursor: pointer;" class="edit-item teal-text text-lighten-1 tiny material-icons right">edit</i></div>
                </div>
            `;
            const itemsCollection = document.querySelector(UISelectors.itemsList);
            itemsCollection.append(element);
        },

        printUpdatedItem: function(updatedItem){
            document.getElementById('item-'+updatedItem.id).innerHTML = `
                <div class="row valign-wrapper" style="margin-bottom: 0;">
                    <div class="col s10"><strong>${updatedItem.meal}: </strong><em>${updatedItem.calories} calories</em></div>
                    <div class="col s2 right-align"><i style="margin-right: 5px; cursor: pointer;" class="edit-item teal-text text-lighten-1 tiny material-icons right">edit</i></div>
                </div> 
            `;
        },

        getUISelectors: function() {
            return UISelectors;
        },

        clearInputs: function() {
            document.querySelector(UISelectors.mealInput).value = '';
            document.querySelector(UISelectors.caloriesInput).value = '';
        },

        hideList: function() {
            const itemsCollection = document.querySelector(UISelectors.itemsList);
            itemsCollection.style.display = 'none';
        },

        showList: function() {
            const itemsCollection = document.querySelector(UISelectors.itemsList);
            itemsCollection.style.display = 'block';;
        },

        printTotalCalories: function(total) {
            const totalCalories = document.querySelector(UISelectors.totalCalories);
            totalCalories.textContent = total;
        },

        clearEditState: function() {
            UIController.clearInputs();
            document.querySelector(UISelectors.editState).style.display = 'none';
            document.querySelector(UISelectors.viewState).style.display = 'block';
            document.querySelector(UISelectors.addBtn).setAttribute('type', 'submit');
            document.querySelector(UISelectors.updateBtn).setAttribute('type', 'button');
            currentState = 'viewState';
        },

        enterEditState: function(itemToEdit) {
            document.querySelector(UISelectors.editState).style.display = 'block';
            document.querySelector(UISelectors.viewState).style.display = 'none';
            document.querySelector(UISelectors.addBtn).setAttribute('type', 'button');
            document.querySelector(UISelectors.updateBtn).setAttribute('type', 'submit');
            document.querySelector(UISelectors.mealInput).value = itemToEdit.meal;
            document.querySelector(UISelectors.caloriesInput).value = itemToEdit.calories;
            currentState = 'editState';
        },

        removeDeletedItem: function(itemToDelete) {
            document.getElementById('item-'+itemToDelete.id).remove();
            if (ItemController.getItems().length === 0) UIController.hideList();
        },

        removeAllItems: function() {
            document.querySelector(UISelectors.itemsList).innerHTML = '';
        }
    }
})();