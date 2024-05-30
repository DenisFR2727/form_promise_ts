const nameText = document.querySelector('.name') as HTMLInputElement;
const emailText = document.querySelector('.email') as HTMLInputElement;
const username = document.querySelector('.username') as HTMLInputElement;
const form = document.querySelector('.form') as HTMLFormElement;
// Validation
const valid_name = document.querySelector('.validation_name') as HTMLElement;
const valid_email = document.querySelector('.validation_email') as HTMLElement;
const valid_user = document.querySelector(
    '.validation_username'
) as HTMLElement;

interface UserData {
    name: string;
    email: string;
    user: string;
}

interface ErrorResponse {
    error: string;
}

const url: string = 'https://jsonplaceholder.typicode.com/posts';
enum HttpMethod {
    POST = 'POST',
    GET = 'GET',
}
document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const name: string = nameText.value ?? '';
        const email: string = emailText.value ?? '';
        const user: string = username.value ?? '';

        const userData: UserData = {
            name,
            email,
            user,
        };
        if (validationForm(userData)) {
            postDataUser(url, userData);

            nameText.value = '';
            emailText.value = '';
            username.value = '';

            setTimeout((): void => {
                valid_name.innerHTML = '';
                valid_email.innerHTML = '';
                valid_user.innerHTML = '';
            }, 3000);
        }
    });
});

async function postDataUser<T extends UserData>(
    url: string,
    user: T
): Promise<T | ErrorResponse | undefined> {
    try {
        const response: Response = await fetch(url, {
            method: HttpMethod.POST,
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            console.error('Server responded with status', response.status);
        }
        const data = await response.json();
        console.log('Server response:', data);
        if (isError(data)) {
            console.error('Server responded with error', data.error);
            return data;
        }

        return data;
    } catch (e: any) {
        console.error('An error occurred while fetching', e);
        throw new Error('Error post data');
    }
}
function isError(response: unknown): response is ErrorResponse {
    return (response as ErrorResponse).error !== undefined;
}
function validationForm(userData: UserData): boolean {
    const isNameValid = validationInput(
        userData.name,
        /^[a-zA-Z]{2,}/,
        valid_name,
        'Name'
    );
    const isEmailValid = validationInput(
        userData.email,
        /^\S+@\S+\.\S+$/,
        valid_email,
        'Email'
    );
    const isUserValid = validationInput(
        userData.user,
        /^[a-zA-Z]{2,}/,
        valid_user,
        'User'
    );

    return isNameValid && isEmailValid && isUserValid;
}
function validationInput(
    input: string,
    regex: RegExp,
    element: HTMLElement,
    message: string
): boolean {
    if (!regex.test(input)) {
        element.innerHTML = `${message} is not valid!`;
        element.style.color = 'red';
        return false;
    } else {
        element.innerHTML = `${message} valid`;
        element.style.color = 'green';
        return true;
    }
}

// Generics: Використовуйте Generics для створення функції, яка буде відправляти запити до API. Функція повинна приймати URL і об'єкт даних, які потрібно відправити, і повертати Promise з відповіддю від сервера.

// Enums: Створіть Enum для методів HTTP, які ви будете використовувати (наприклад, GET, POST).

// Interface: Створіть Interface для даних, які ви відправляєте через форму. Наприклад, якщо ви відправляєте дані користувача, ваш Interface може включати поля, такі як name, email та username.

// Promise: Ваша функція для відправки запитів до API повинна повертати Promise. Використовуйте async/await для обробки цих Promise.

// TypeGuard: Створіть TypeGuard для перевірки, чи відповідь від сервера є помилкою. Якщо це так, відобразіть помилку користувачеві.

// Додатково:

// Використовуйте модульність TypeScript для організації вашого коду.
// Переконайтеся, що ваш код є типізованим та відповідає стандартам TypeScript.
// Переконайтеся, що ваша форма валідує дані перед відправкою запиту до API.
