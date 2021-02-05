const USERS = [];
const FORM = document.forms['add-user-form'];
const LOGIN_INPUT = document.getElementById('inputLogin');
const PASSWORD_INPUT = document.getElementById('inputPassword');
const EMAIL_INPUT = document.getElementById('inputEmail');
const USERS_BLOCK = document.querySelector('.table > tbody');
function createNewUserBlock(index, { login, password, email }) {
    return (`
        <tr>
            <td class="user__index">${index + 1}</td>
            <td class="user__login">${login}</td>
            <td class="user__password">${password}</td>
            <td class="user__email">${email}</td>
            <td class="user__edit-btn">
                <button type="button" class="btn btn-warning" onClick="editUser()" data-id="${index}">Edit</button>
            </td>
            <td class="user__delete-btn">
                <button type="button" class="btn btn-danger" onClick="deleteUser()" data-id="${index}">Delete</button>
            </td>
        </tr>
        `);
}
function render() {
    USERS_BLOCK.innerHTML = '';
    USERS.forEach(function (user, index) {
        USERS_BLOCK.innerHTML += createNewUserBlock(index, user);
    });
}
function deleteUser() {
    let userId = +event.target.dataset.id;
    USERS.splice(userId, 1);
    render();
}
function editUser() {
    let userId = +event.target.dataset.id;
    let { login, password, email } = USERS[userId];
    LOGIN_INPUT.value = login;
    PASSWORD_INPUT.value = password;
    EMAIL_INPUT.value = email;
    function saveChanges(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.checkValidity()) {
            let newUser = {
                login: LOGIN_INPUT.value,
                password: PASSWORD_INPUT.value,
                email: EMAIL_INPUT.value
            };
            USERS[userId] = newUser;
            if (this.classList.contains('was-validated'))
                this.classList.remove('was-validated');
            render();
            this.reset();
            FORM.removeEventListener('submit', saveChanges);
            FORM.addEventListener('submit', addUser);
            document.querySelector('.btn-add-user').textContent = 'Add user';
        }
        else {
            this.classList.add('was-validated');
        }
    }
    FORM.removeEventListener('submit', addUser);
    FORM.addEventListener('submit', saveChanges);
    document.querySelector('.btn-add-user').textContent = 'Save changes';
}
function addUser(e) {
    e.preventDefault();
    if (this.checkValidity()) {
        let newUser = {
            login: LOGIN_INPUT.value,
            password: PASSWORD_INPUT.value,
            email: EMAIL_INPUT.value
        };
        USERS.push(newUser);
        if (this.classList.contains('was-validated'))
            this.classList.remove('was-validated');
        render();
        this.reset();
    }
    else {
        this.classList.add('was-validated');
    }
}
FORM.addEventListener('submit', addUser);
