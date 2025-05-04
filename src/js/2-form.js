const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
    email: '',
    message: '',
};

// 1. Відновлюємо дані з localStorage при завантаженні
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
    try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.email || parsedData.message) {
            form.email.value = parsedData.email || '';
            form.message.value = parsedData.message || '';
            formData = { ...parsedData };
        }
    } catch (e) {
        console.error('Invalid data in localStorage');
    }
}

// 2. Збереження даних при input
form.addEventListener('input', e => {
    const { name, value } = e.target;
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 3. Submit форми
form.addEventListener('submit', e => {
    e.preventDefault();

    const { email, message } = formData;

    if (email === '' || message === '') {
        alert('Fill please all fields');
        return;
    }

    console.log(formData);

    // Очищення
    form.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData = { email: '', message: '' };
});