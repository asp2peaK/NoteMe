function toggleTheme() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    localStorage.setItem('theme', newTheme);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
document.getElementById('themeToggle').textContent = savedTheme === 'light' ? '🌙' : '☀️';

const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const editTitle = document.getElementById('editTitle');
const editContent = document.getElementById('editContent');
const editCategory = document.getElementById('editCategory');

function editNote(button) {
    editModal.style.display = 'block';
    editForm.action = `/edit_note/${button.dataset.id}`;
    editTitle.value = JSON.parse(button.dataset.title);
    editContent.value = JSON.parse(button.dataset.content);
    editCategory.value = JSON.parse(button.dataset.category);
}

const closeBtn = document.querySelector('.close');
closeBtn.onclick = function() {
    editModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == editModal) {
        editModal.style.display = 'none';
    }
}

let currentSort = 'desc';
let showArchived = document.getElementById('archiveButton').dataset.archived === 'true';

function toggleSort() {
    currentSort = currentSort === 'desc' ? 'asc' : 'desc';
    const sortButton = document.getElementById('sortButton');
    sortButton.textContent = currentSort === 'desc' ? '⬇' : '⬆';
    updateURL();
}

function toggleArchived() {
    showArchived = !showArchived;
    updateURL();
}

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const tagFilter = document.getElementById('tagFilter');
let searchTimeout;

searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(updateURL, 300);
});

categoryFilter.addEventListener('change', updateURL);
tagFilter.addEventListener('change', updateURL);

function updateURL() {
    const searchQuery = searchInput.value;
    const category = categoryFilter.value;
    const tag = tagFilter.value;
    const newURL = `${window.location.pathname}?search=${encodeURIComponent(searchQuery)}&sort=${currentSort}&category=${encodeURIComponent(category)}&tag=${encodeURIComponent(tag)}&archived=${showArchived}`;
    window.location.href = newURL;
}

const urlParams = new URLSearchParams(window.location.search);
currentSort = urlParams.get('sort') || 'desc';
document.getElementById('sortButton').textContent = currentSort === 'desc' ? '⬇' : '⬆';
searchInput.value = urlParams.get('search') || '';
