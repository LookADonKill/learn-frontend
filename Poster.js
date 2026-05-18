// // Arrow Function
// const add = (a, b) => {
//     return a + b;
// };
// console.log(add(5, 3));

// // Spread Operator
// const oldArr = [1, 2, 3];
// const newArr = [...oldArr, 4, 5];
// console.log(newArr);

// // Destructuring Assignment
// const student = {
//     name: 'Alice',
//     age: 20,
//     grade: 'A'
// };

// const { name, age, grade } = student;
// console.log(name, age, grade);

let state = {
    currPage: 1,
    searchTerm: '',
    sortMethod: 'id',
    sortOrder: 'asc',
    totalPosts: 100,
    postsPerPage: 10,
    allPosts: [],
    filteredPosts: []
};

function Start(){
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    // LoadAllPosts();
}

document.addEventListener('DOMContentLoaded', Start);

async function LoadAllPosts(){ // Testings
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        state.allPosts = await response.json();
        state.filteredPosts = [...state.allPosts];
        RenderPage();
    } catch(error) {
        console.error('Unable to load all posts!')
    }
}

// Dynamic Page Rendering

function RenderPage(){
    const start = (state.currPage - 1) * state.postsPerPage;
    const end = start + state.postsPerPage;
    const postsToShow = state.filteredPosts.slice(start, end);

    const tbody = document.getElementById('posted-data');
    const date = new Date().toLocaleDateString();
    tbody.innerHTML = postsToShow.map(post => `
            <tr>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.body}</td>
                <td>${post.date || date}</td>
            </tr>
        `).join('');
    
    const totalPages = Math.max(1, Math.ceil(state.filteredPosts.length / state.postsPerPage));
    document.getElementById('page-info').textContent = `Page ${state.currPage} of ${totalPages}`;

    document.getElementById('prev-page').disabled = state.currPage === 1; // If we're in the first page, we can't use Prev
    document.getElementById('next-page').disabled = state.currPage === totalPages; // If we're in the final page, we can't continue further
}

// Search
document.getElementById('search-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('input').value.toLowerCase();
    state.searchTerm = searchTerm;
    state.currPage = 1;

    if(searchTerm.trim() === ''){
        state.filteredPosts = [...state.allPosts];
    } else {
        state.filteredPosts = state.allPosts.filter(post => post.title.toLowerCase().includes(searchTerm))
    }

    ApplySort();
    RenderPage();
});

// Sort
document.getElementById('sort-method').addEventListener('change', (e) => {
    const [method, order] = e.target.value.split('-'); // The way it's written, adjusting with HTML
    state.sortMethod = method;
    state.sortOrder = order || 'asc'; // Descending is the "natural" order
    state.currPage = 1;

    ApplySort();
    RenderPage();
});

function ApplySort(){
    let sorted = [...state.filteredPosts];

    if(state.sortMethod === 'id') {
        sorted.sort((a, b) => state.sortOrder === 'asc' ? a.id - b.id : b.id - a.id)
    } else if (state.sortMethod === 'title') {
        sorted.sort((a, b) => state.sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
    }

    state.filteredPosts = sorted;
}


// Paging
document.getElementById('prev-page').addEventListener('click', () => {
    if (state.currPage > 1) {
        state.currPage--;
        RenderPage();
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    const totalPages = Math.ceil(state.filteredPosts.length / state.postsPerPage);
    if(state.currPage < totalPages) {
        state.currPage++;
        RenderPage();
    }
});


// Add Post
document.getElementById('add-post').addEventListener('click', () => {
    const modal = document.getElementById('modal');

    modal.innerHTML = `
        <div class="modal-content">
        <h2>Add New Post</h2>
        <button id="close-btn">X</button>
        <input type="text" id="title-input" placeholder="Enter title" />
        <textarea id="content-input" placeholder="Enter content"></textarea>
        <button id="submit-btn">Submit</button>
        </div>
    `;

    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false'); // Reveal Modal
    document.getElementById('add-post').disabled = true; // Ensuring that multiple modals won't appear

    document.getElementById('submit-btn').addEventListener('click', async() => {
        const title = document.getElementById('title-input').value.trim();
        const content = document.getElementById('content-input').value.trim();
        
        if(!title) {
            alert('Title cannot be empty!');
            return;
        }
        if(!content) {
            alert('Content cannot be empty!');
            return;
        }
        if(!isNaN(title)) {
            alert('Title cannot be a number!');
        }
        if(!isNaN(content)) {
            alert('Content cannot be a number!');
        }
        if(title.length > 30) {
            alert('Title cannot be more than 30 characters!');
            return;
        }

        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, body: content, userId: 1 })
        });

        const newPost = await response.json();
        newPost.date = new Date().toLocaleDateString();
        state.allPosts.unshift(newPost);
        state.filteredPosts.unshift(newPost);
        state.currPage = 1;
        RenderPage();

        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true'); // Hide the Modal again
        document.getElementById('add-post').disabled = false; // Now, the Add Post can be used again
    }
    );

    document.getElementById('close-btn').addEventListener('click', () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true'); // Hide the Modal again
        document.getElementById('add-post').disabled = false; // Now, the Add Post can be used again
    });
});
