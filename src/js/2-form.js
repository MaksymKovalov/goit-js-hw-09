const STORAGE_KEY = 'feedback-form-state';
const formData = { email: '', message: '' };
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

document.addEventListener('DOMContentLoaded', loadFormData);
form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

// function upload from localStorage
function loadFormData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      // update object formData
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';

      emailInput.value = formData.email;
      messageTextarea.value = formData.message;
    }
  } catch (error) {
    console.error('Помилка завантаження даних з localStorage:', error);
  }
}

function onFormInput(event) {
  const { name, value } = event.target;

  // Update object
  formData[name] = value.trim();

  // save in localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  // Check field
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form data:', formData);

  // Clear localStorage, formData and form
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
}
