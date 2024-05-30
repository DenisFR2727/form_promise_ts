var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var nameText = document.querySelector('.name');
var emailText = document.querySelector('.email');
var username = document.querySelector('.username');
var form = document.querySelector('.form');
// Validation
var valid_name = document.querySelector('.validation_name');
var valid_email = document.querySelector('.validation_email');
var valid_user = document.querySelector('.validation_username');
var url = 'https://jsonplaceholder.typicode.com/posts';
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["POST"] = "POST";
    HttpMethod["GET"] = "GET";
})(HttpMethod || (HttpMethod = {}));
document.addEventListener('DOMContentLoaded', function () {
    form.addEventListener('submit', function (e) {
        var _a, _b, _c;
        e.preventDefault();
        var name = (_a = nameText.value) !== null && _a !== void 0 ? _a : '';
        var email = (_b = emailText.value) !== null && _b !== void 0 ? _b : '';
        var user = (_c = username.value) !== null && _c !== void 0 ? _c : '';
        var userData = {
            name: name,
            email: email,
            user: user,
        };
        if (validationForm(userData)) {
            postDataUser(url, userData);
            nameText.value = '';
            emailText.value = '';
            username.value = '';
            setTimeout(function () {
                valid_name.innerHTML = '';
                valid_email.innerHTML = '';
                valid_user.innerHTML = '';
            }, 3000);
        }
    });
});
function postDataUser(url, user) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url, {
                            method: HttpMethod.POST,
                            body: JSON.stringify(user),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        console.error('Server responded with status', response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log('Server response:', data);
                    if (isError(data)) {
                        console.error('Server responded with error', data.error);
                        return [2 /*return*/, data];
                    }
                    return [2 /*return*/, data];
                case 3:
                    e_1 = _a.sent();
                    console.error('An error occurred while fetching', e_1);
                    throw new Error('Error post data');
                case 4: return [2 /*return*/];
            }
        });
    });
}
function isError(response) {
    return response.error !== undefined;
}
function validationForm(userData) {
    var isNameValid = validationInput(userData.name, /^[a-zA-Z]{2,}/, valid_name, 'Name');
    var isEmailValid = validationInput(userData.email, /^\S+@\S+\.\S+$/, valid_email, 'Email');
    var isUserValid = validationInput(userData.user, /^[a-zA-Z]{2,}/, valid_user, 'User');
    return isNameValid && isEmailValid && isUserValid;
}
function validationInput(input, regex, element, message) {
    if (!regex.test(input)) {
        element.innerHTML = "".concat(message, " is not valid!");
        element.style.color = 'red';
        return false;
    }
    else {
        element.innerHTML = "".concat(message, " valid");
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
