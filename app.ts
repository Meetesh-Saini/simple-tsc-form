const API_URL = "https://6716c8003fcb11b265d397f4.mockapi.io";
const API_ENDPOINT = `${API_URL}/form`;

const form = document.getElementById('contactForm') as HTMLFormElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const contactInput = document.getElementById('contact') as HTMLInputElement;
const subjectInput = document.getElementById('subject') as HTMLInputElement;
const messageInput = document.getElementById('message') as HTMLTextAreaElement;

const successMessage = document.getElementById('successMessage') as HTMLElement;
const errorMessage = document.getElementById('errorMessage') as HTMLElement;

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidContact(contact: string): boolean {
    const contactRegex = /^[0-9]{10}$/;
    return contactRegex.test(contact);
}


function markFieldAsInvalid(field: HTMLInputElement | HTMLTextAreaElement): void {
    field.classList.add('border-red-500');
    field.setAttribute("placeholder", `${field.getAttribute("field-type")} is Required`)
}

function markFieldAsValid(field: HTMLInputElement | HTMLTextAreaElement): void {
    field.classList.remove('border-red-500');
}

function showMessage(type: 'success' | 'error'): void {
    if (type === 'success') {
        successMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    } else {
        successMessage.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
}


function validateForm(): boolean {
    let isValid = true;

    if (nameInput.value.trim() === '') {
        markFieldAsInvalid(nameInput);
        isValid = false;
    } else {
        markFieldAsValid(nameInput);
    }

    if (!isValidEmail(emailInput.value)) {
        markFieldAsInvalid(emailInput);
        isValid = false;
    } else {
        markFieldAsValid(emailInput);
    }

    if (!isValidContact(contactInput.value)) {
        markFieldAsInvalid(contactInput);
        isValid = false;
    } else {
        markFieldAsValid(contactInput);
    }

    if (subjectInput.value.trim() === '') {
        markFieldAsInvalid(subjectInput);
        isValid = false;
    } else {
        markFieldAsValid(subjectInput);
    }

    if (messageInput.value.trim() === '') {
        markFieldAsInvalid(messageInput);
        isValid = false;
    } else {
        markFieldAsValid(messageInput);
    }

    return isValid;
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            contact: contactInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim(),
        };

        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showMessage('success');
                form.reset();
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            showMessage('error');
        }
    }
});