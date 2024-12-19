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
const closeBtn = document.querySelector('.close');

function safeJSONParse(str, defaultValue) {
    try {
        return str ? JSON.parse(str) : defaultValue;
    } catch (e) {
        console.error('JSON parse error:', e, 'for string:', str);
        return defaultValue;
    }
}

function editNote(button) {
    try {
        const noteId = button.dataset.noteId;
        const title = button.dataset.title || '';
        const content = button.dataset.content || '';
        const category = button.dataset.category || '';
        const tags = safeJSONParse(button.dataset.tags, []);

        console.log('Button dataset:', {
            noteId,
            title,
            content,
            category,
            tags
        });

        if (!noteId) {
            console.error('No note ID provided');
            return;
        }
        const editForm = document.getElementById('editForm');
        const editTitle = document.getElementById('editTitle');
        const editContent = document.getElementById('editContent');
        const editCategory = document.getElementById('editCategory');
        const editModal = document.getElementById('editModal');

        if (!editForm || !editTitle || !editContent || !editCategory || !editModal) {
            console.error('Required form elements not found');
            return;
        }

        const tagsText = tags.length > 0 ? '\n' + tags.map(tag => `#${tag}`).join(' ') : '';
        const fullContent = content + tagsText;

        editTitle.value = title;
        editContent.value = fullContent;
        editCategory.value = category;
        editForm.action = `/edit_note/${noteId}`;

        editModal.style.display = 'block';
        editTitle.focus();
    } catch (error) {
        console.error('Error in editNote:', error);
        console.error('Button dataset:', button.dataset);
    }
}

if (closeBtn) {
    closeBtn.onclick = function() {
        editModal.style.display = 'none';
    }
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
    const archiveButton = document.getElementById('archiveButton');
    archiveButton.textContent = showArchived ? '📁' : '📂';
    archiveButton.dataset.archived = showArchived;
    updateURL();
}

function updateURL() {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('sort', currentSort);
    searchParams.set('archived', showArchived);
    window.location.search = searchParams.toString();
}

const urlParams = new URLSearchParams(window.location.search);
currentSort = urlParams.get('sort') || 'desc';
document.getElementById('sortButton').textContent = currentSort === 'desc' ? '⬇' : '⬆';

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
