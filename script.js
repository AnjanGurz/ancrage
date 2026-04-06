
    // === state ===
const STORAGE_KEYS = {
onboarded: 'ancrage_onboarded',
blocks:    'ancrage_blocks',
checked:   'ancrage_checked',
parking:   'ancrage_parking',
streak:    'ancrage_streak',
};

// === default blocks ===
const DEFAULT_BLOCKS = [
{ id: 1, time: '4:00',        name: 'Wake + anchor',           cat: 'reset'  },
{ id: 2, time: '4:15 – 6:00', name: 'French — homework',       cat: 'french' },
{ id: 3, time: '6:00 – 7:00', name: 'French — listening',      cat: 'french' },
{ id: 4, time: '7:00 – 8:00', name: 'French — speaking',       cat: 'french' },
{ id: 5, time: '8:00 – 9:15', name: 'French — curiosity time', cat: 'french' },
{ id: 6, time: '9:15 – 10:30',name: 'Dev — ship one thing',    cat: 'dev'    },
];

// === helpers ===
function save(key, value) {
localStorage.setItem(key, JSON.stringify(value));
}

function load(key, fallback = null) {
const item = localStorage.getItem(key);
return item ? JSON.parse(item) : fallback;
}

function showScreen(id) {
document.getElementById('screen-onboarding')
    .classList.add('hidden');
document.getElementById('screen-app')
    .classList.add('hidden');
document.getElementById(id)
    .classList.remove('hidden');
}

// === tab switching ===
function switchTab(name) {
document.querySelectorAll('.tab-panel')
    .forEach(p => p.classList.add('hidden'));
document.querySelectorAll('.tab')
    .forEach(t => t.classList.remove('active'));

document.getElementById('tab-' + name)
    .classList.remove('hidden');
event.target.classList.add('active');

if (name === 'parking') renderParking();
}

// === render blocks ===
function renderBlocks() {
const blocks  = load(STORAGE_KEYS.blocks, DEFAULT_BLOCKS);
const checked = load(STORAGE_KEYS.checked, {});
const list    = document.getElementById('blocks-list');

list.innerHTML = '';

blocks.forEach(block => {
    const isDone = !!checked[block.id];
    const div    = document.createElement('div');
    div.className = 'block-item';
    div.innerHTML = `
    <div class="check-circle ${isDone ? 'done' : ''}" 
        onclick="toggleBlock(${block.id})">
        <span class="check-tick">✓</span>
    </div>
    <div class="block-info">
        <div class="block-time">${block.time}</div>
        <div class="block-name ${isDone ? 'done' : ''}">
        ${block.name}
        </div>
        <span class="badge badge-${block.cat}">
        ${block.cat}
        </span>
    </div>
    <button class="block-edit" 
            onclick="openEditBlock(${block.id})">
        edit
    </button>
    `;
    list.appendChild(div);
});

updateProgress(blocks, checked);
}

// === toggle block ===
function toggleBlock(id) {
const checked = load(STORAGE_KEYS.checked, {});
checked[id]   = !checked[id];
save(STORAGE_KEYS.checked, checked);
renderBlocks();
}

// === progress ===
function updateProgress(blocks, checked) {
const total = blocks.length;
const done  = blocks.filter(b => !!checked[b.id]).length;
const pct   = total === 0 ? 0 : Math.round(done / total * 100);

document.getElementById('progress-label')
    .textContent = `${done} of ${total} done`;
document.getElementById('progress-pct')
    .textContent = `${pct}%`;
document.getElementById('progress-fill')
    .style.width = pct + '%';

const banner = document.getElementById('completed-banner');
if (done === total && total > 0) {
    banner.classList.remove('hidden');
} else {
    banner.classList.add('hidden');
}
}

// === parking lot ===
function renderParking() {
const items = load(STORAGE_KEYS.parking, []);
const list  = document.getElementById('park-list');
const empty = document.getElementById('park-empty');

list.innerHTML = '';

if (items.length === 0) {
    empty.classList.remove('hidden');
    return;
}

empty.classList.add('hidden');

items.forEach(item => {
    const div     = document.createElement('div');
    div.className = 'park-item';
    div.innerHTML = `
    <div class="park-info">
        <div class="park-text">${item.text}</div>
        <div style="display:flex; 
                    align-items:center; 
                    gap:8px; 
                    margin-top:4px;">
        <span class="badge badge-${item.cat}">
            ${item.cat}
        </span>
        <span class="park-meta">
            parked ${timeAgo(item.timestamp)}
        </span>
        </div>
    </div>
    <button class="park-done" 
            onclick="removeParkItem(${item.id})">
        done
    </button>
    `;
    list.appendChild(div);
});
}

function addParkItem() {
const input = document.getElementById('park-input');
const cat   = document.getElementById('park-cat').value;
const text  = input.value.trim();

if (!text) return;

const items = load(STORAGE_KEYS.parking, []);
items.unshift({
    id:        Date.now(),
    text:      text,
    cat:       cat,
    timestamp: Date.now(),
});

save(STORAGE_KEYS.parking, items);
input.value = '';
renderParking();
}

function removeParkItem(id) {
const items   = load(STORAGE_KEYS.parking, []);
const updated = items.filter(i => i.id !== id);
save(STORAGE_KEYS.parking, updated);
renderParking();
}

function timeAgo(timestamp) {
const mins = Math.floor((Date.now() - timestamp) / 60000);
if (mins < 1)  return 'just now';
if (mins < 60) return `${mins}m ago`;
const hrs = Math.floor(mins / 60);
if (hrs < 24)  return `${hrs}h ago`;
return `${Math.floor(hrs / 24)}d ago`;
}

// === placeholders ===
function openAddBlock()    { alert('Add block — coming soon'); }
function openEditBlock(id) { alert('Edit block ' + id + ' — coming soon'); }

// === init ===
function init() {
const onboarded = load(STORAGE_KEYS.onboarded);

if (!onboarded) {
    showScreen('screen-onboarding');
    document
    .getElementById('btn-get-started')
    .addEventListener('click', () => {
        save(STORAGE_KEYS.onboarded, true);
        save(STORAGE_KEYS.blocks, DEFAULT_BLOCKS);
        showScreen('screen-app');
        renderBlocks();
    });
} else {
    showScreen('screen-app');
    renderBlocks();
}

document.getElementById('park-input')
    .addEventListener('keydown', e => {
    if (e.key === 'Enter') addParkItem();
    });
}

// === run ===
init();
