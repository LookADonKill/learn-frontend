state.allTransaction = [...arr];
state.filteredTransaction = [...arr];

// Dynamic Page Rendering

function RenderPage(){
    const base = document.getElementById('sort-base').value;
    const method = document.getElementById('sort-method').value;
    
    ApplySort(base, method);
    const start = (state.currPage - 1) * state.transactionPerPage;
    const end = start + state.transactionPerPage;
    const transactionsAvailable = state.filteredTransaction.slice(start, end);

    const tbody = document.getElementById('treasury-data');
    tbody.innerHTML = transactionsAvailable.map(trans => `
            <tr>
                <td>${trans.id}</td>
                <td>${trans.customer}</td>
                <td>${trans.amount}</td>
                <td>${trans.date}</td>
                <td>${trans.type}</td>
            </tr>
        `).join('');
    
    const totalPages = Math.max(1, Math.ceil(state.filteredTransaction.length / state.transactionPerPage));
    document.getElementById('page-info').textContent = `Page ${state.currPage} of ${totalPages}`;

    document.getElementById('prev-page').disabled = state.currPage === 1; // If we're in the first page, we can't use Prev
    document.getElementById('next-page').disabled = state.currPage === totalPages; // If we're in the final page, we can't continue further
}

document.addEventListener('DOMContentLoaded', RenderPage);

// Search
document.getElementById('search-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('input').value.toLowerCase().trim();
    const searchMethod = document.getElementById('search-method').value;
    state.searchTerm = searchTerm;
    state.searchMethod = searchMethod;
    state.currPage = 1;

    if(searchTerm === ''){
        state.filteredTransaction = [...state.allTransaction];
    }
        
    if(state.searchMethod === 'lin-src') state.filteredTransaction = LinearSearch(state.allTransaction, searchTerm);
        
    else if(state.searchMethod === 'bin-src') {
        let sorted = [...state.allTransaction];
        MergeSort(sorted, 'id', 0, sorted.length - 1);
        const result = BinarySearch(sorted, searchTerm);
        if(result !== -1) state.filteredTransaction = [sorted[result]];
        else state.filteredTransaction = [];
    }
    RenderPage();
});

// Sort

document.getElementById('sort-btn').addEventListener('click', () => {
    const base = document.getElementById('sort-base').value;
    const method = document.getElementById('sort-method').value;
    
    ApplySort(base, method);
    RenderPage();
})

function ApplySort(base, method){
    let sorted = [...state.filteredTransaction];

    if(method === 'bub-sort') BubbleSort(sorted, base);
    else if(method === 'mrg-sort') MergeSort(sorted, base, 0, sorted.length - 1);

    state.filteredTransaction = sorted;
}

// Searching Mechanics

function LinearSearch(arr, x){
    return arr.filter(trans => trans.customer.toLowerCase().includes(x));
}

function BinarySearch(arr, x){
    let low = 0;
    let high = arr.length - 1;
    let mid;
    while (high >= low) {
        mid = low + Math.floor((high - low) / 2);

        const currId = arr[mid].id.toLowerCase();

        if (currId == x)
            return mid;

        if (currId > x)
            high = mid - 1;

        else
            low = mid + 1;
    }

    return -1;
}

// Sorting Mechanics

function BubbleSort(arr, base) {
    for (var i = 0; i < arr.length; i++) {

        for (var j = 0; j < (arr.length - i - 1); j++) {

            if (arr[j][base] > arr[j + 1][base]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

function Merge(arr, base, left, middle, right) {
    
    let l1 = middle - left + 1;
    let l2 = right - middle;
    let arr1 = new Array(l1);
    let arr2 = new Array(l2);
    
    for (let i = 0; i < l1; ++i) {
        arr1[i] = arr[left + i];
    }
    for (let i = 0; i < l2; ++i) {
        arr2[i] = arr[middle + 1 + i];
    }

    let i = 0,
        j = 0,
        k = left;
        
    while (i < l1 && j < l2) {
        if (arr1[i][base] < arr2[j][base]) {
            arr[k] = arr1[i];
            ++i;
        } else {
            arr[k] = arr2[j];
            j++;
        }
        k++;
    }
    // Update the remaining elements
    while (i < l1) {
        arr[k] = arr1[i];
        i++;
        k++;
    }
    while (j < l2) {
        arr[k] = arr2[j];
        j++;
        k++;
    }
}

function MergeSort(arr, base, left, right) {
    if (left >= right) {
        return;
    }
    
    let middle = left + parseInt((right - left) / 2);
    
    MergeSort(arr, base, left, middle);
    MergeSort(arr, base, middle + 1, right);
    
    Merge(arr, base, left, middle, right)
}


// Paging
document.getElementById('prev-page').addEventListener('click', () => {
    console.log("clickedprev");
    if (state.currPage > 1) {
        state.currPage--;
        RenderPage();
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    console.log("clickedpost");
    const totalPages = Math.ceil(state.filteredTransaction.length / state.transactionPerPage);
    if(state.currPage < totalPages) {
        state.currPage++;
        RenderPage();
    }
});