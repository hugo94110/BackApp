const registeredUsers = [
    { email: "test@test.com", password: "test" },
    { email: "tedyjzdrtu@gmail.com", password: "45781625271122" }
];

function getRegisteredUsers() {
    return registeredUsers;
}

function newUserRegistered(email, password) {
    registeredUsers.push({ email, password });
}

module.exports = { getRegisteredUsers, newUserRegistered };