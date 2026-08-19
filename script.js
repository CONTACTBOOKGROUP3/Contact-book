// ----- Contact class -----
class Contact {
  constructor(id, name, phone, email) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
}

// ----- App state -----
let contacts = [];
let selectedContactId = null;
let isEditing = false;

// ----- DOM elements -----
const contactList = document.getElementById('contactList');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const addContactBtn = document.getElementById('addContactBtn');

const detailPlaceholder = document.getElementById('detailPlaceholder');
const detailView = document.getElementById('detailView');
const formView = document.getElementById('formView');

const detailAvatar = document.getElementById('detailAvatar');
const detailName = document.getElementById('detailName');
const detailPhone = document.getElementById('detailPhone');
const detailEmail = document.getElementById('detailEmail');

const editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById('deleteBtn');
const cancelBtn = document.getElementById('cancelBtn');

const contactForm = document.getElementById('contactForm');
const formTitle = document.getElementById('formTitle');
const nameInput = document.getElementById('nameInput');
const phoneInput = document.getElementById('phoneInput');
const emailInput = document.getElementById('emailInput');

const nameError = document.getElementById('nameError');
const phoneError = document.getElementById('phoneError');
const emailError = document.getElementById('emailError');

// ----- Local Storage -----
function saveToStorage() {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loadFromStorage() {
  const stored = localStorage.getItem('contacts');
  if (stored) {
    contacts = JSON.parse(stored);
  }
}

// ----- Render the contact list -----
function renderContacts(filter = '') {
  contactList.innerHTML = '';

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    const message = document.createElement('p');
    message.className = 'empty-state';
    message.textContent = contacts.length === 0
      ? 'No contacts yet. Add your first contact.'
      : 'No contacts match your search.';
    contactList.appendChild(message);
    return;
  }

  filtered.forEach(contact => {
    const row = document.createElement('div');
    row.className = 'contact-row';
    if (contact.id === selectedContactId) {
      row.classList.add('selected');
    }

    const initials = getInitials(contact.name);

    row.innerHTML = `
      <div class="contact-avatar">${initials}</div>
      <span class="contact-name">${contact.name}</span>
    `;

    row.addEventListener('click', () => {
      selectedContactId = contact.id;
      showDetail(contact);
      renderContacts(searchInput.value);
    });

    contactList.appendChild(row);
  });
}

function getInitials(name) {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

// ----- Show contact detail view -----
function showDetail(contact) {
  detailPlaceholder.classList.add('hidden');
  formView.classList.add('hidden');
  detailView.classList.remove('hidden');

  detailAvatar.textContent = getInitials(contact.name);
  detailName.textContent = contact.name;
  detailPhone.textContent = contact.phone;
  detailEmail.textContent = contact.email;
}

// ----- Show empty placeholder -----
function showPlaceholder() {
  detailView.classList.add('hidden');
  formView.classList.add('hidden');
  detailPlaceholder.classList.remove('hidden');
}

// ----- Show add/edit form -----
function showForm(editingContact = null) {
  detailPlaceholder.classList.add('hidden');
  detailView.classList.add('hidden');
  formView.classList.remove('hidden');

  clearErrors();

  if (editingContact) {
    isEditing = true;
    formTitle.textContent = 'Edit Contact';
    nameInput.value = editingContact.name;
    phoneInput.value = editingContact.phone;
    emailInput.value = editingContact.email;
  } else {
    isEditing = false;
    formTitle.textContent = 'Add Contact';
    contactForm.reset();
  }
}

function clearErrors() {
  nameError.textContent = '';
  phoneError.textContent = '';
  emailError.textContent = '';
}

// ----- Validation -----
function validateContact(name, phone, email) {
  let isValid = true;
  clearErrors();

  if (name.trim() === '') {
    nameError.textContent = 'Name cannot be empty.';
    isValid = false;
  }

    const phonePattern = /^[0-9+\s-]{7,15}$/;
  const digitCount = (phone.match(/[0-9]/g) || []).length;
  if (!phonePattern.test(phone.trim()) || digitCount < 7) {
    phoneError.textContent = 'Enter a valid phone number.';
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.trim())) {
    emailError.textContent = 'Enter a valid email address.';
    isValid = false;
  }

  return isValid;
}

// ----- Add / Edit contact -----
function addContact(name, phone, email) {
  const newContact = new Contact(Date.now().toString(), name, phone, email);
  contacts.push(newContact);
  saveToStorage();
}

function editContact(id, newName, newPhone, newEmail) {
  const contact = contacts.find(c => c.id === id);
  if (contact) {
    contact.name = newName;
    contact.phone = newPhone;
    contact.email = newEmail;
    saveToStorage();
  }
}

// ----- Delete contact -----
function deleteContact(id) {
  contacts = contacts.filter(c => c.id !== id);
  saveToStorage();
}

// ----- Search -----
function searchContacts(keyword) {
  renderContacts(keyword);
}

// ----- Event listeners -----
addContactBtn.addEventListener('click', () => {
  selectedContactId = null;
  showForm();
});

editBtn.addEventListener('click', () => {
  const contact = contacts.find(c => c.id === selectedContactId);
  if (contact) showForm(contact);
});

deleteBtn.addEventListener('click', () => {
  if (selectedContactId) {
    deleteContact(selectedContactId);
    selectedContactId = null;
    renderContacts(searchInput.value);
    showPlaceholder();
  }
});

cancelBtn.addEventListener('click', () => {
  if (selectedContactId) {
    const contact = contacts.find(c => c.id === selectedContactId);
    showDetail(contact);
  } else {
    showPlaceholder();
  }
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const phone = phoneInput.value;
  const email = emailInput.value;

  if (!validateContact(name, phone, email)) {
    return;
  }

  if (isEditing && selectedContactId) {
    editContact(selectedContactId, name, phone, email);
    const updated = contacts.find(c => c.id === selectedContactId);
    showDetail(updated);
  } else {
    addContact(name, phone, email);
    selectedContactId = contacts[contacts.length - 1].id;
    showDetail(contacts[contacts.length - 1]);
  }

  renderContacts(searchInput.value);
});

searchInput.addEventListener('input', () => {
  searchContacts(searchInput.value);
});

// ----- Initial load -----
loadFromStorage();
renderContacts();