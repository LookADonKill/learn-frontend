const form = document.getElementById('shopping-form');
        const itemInput = document.getElementById('item-input');
        const shoppingList = document.getElementById('shopping-list');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const item = itemInput.value.trim();
            if (item) {
                const listItem = document.createElement('tr');
                listItem.innerHTML = `<td>${item}<button class="remove-btn">Remove</button></td>`;
                shoppingList.querySelector('tbody').appendChild(listItem);
                itemInput.value = '';
            }
        });

        // Add event listener for remove buttons
        shoppingList.addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-btn')) {
                const listItem = event.target.closest('tr');
                shoppingList.querySelector('tbody').removeChild(listItem);
            }
        });