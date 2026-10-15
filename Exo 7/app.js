const express = require("express");
const crypto = require("crypto");
const { getRegisteredUsers, newUserRegistered } = require("./inMemoryUserRepository");
const app = express();
const port = 3000;

const authenticatedUsers = {}; /////

function headers(req, res, next) {
  console.log(req.headers);
  next();
}

function firewall(req, res, next) {
    const whitelist = ["/hello", "/authenticate", "/register"];

    if (whitelist.includes(req.url)) {
        next();
    } else {
        // cmp token
        if (!req.headers.token || !authenticatedUsers[req.headers.token]) {
            res.status(403).json({ message: "Forbidden" });
        } else {
            next();
        }
    }
}

function checkCredentials(email, password) {
    const registeredUsers = getRegisteredUsers();
    const user = registeredUsers.find(user => user.email === email && user.password === password);

    if (user) {
        return true;
    }
    return false;
}

app.use(express.json());
app.use(headers);
app.use(firewall);


app.get("/hello", (req, res) => {
  res.send("<h1>hello</h1>");
});

app.post("/authenticate", (req, res) => {
    const { email, password } = req.body;
    
    if (!checkCredentials(email, password)) {
        res.status(403).json({ message: "Invalid credentials" });
        return;
    }

    // generate token
    const token = crypto.randomUUID();

    authenticatedUsers[token] = { email };
    res.json({ token });
});

app.post("/register", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    }

    if (getRegisteredUsers().find(user => user.email === email)) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    newUserRegistered(email, password);
    res.status(201).json({ message: "User registered successfully" });

});

app.get("/restricted1", (req, res) => {
    res.json({ message: "topsecret" });
});

app.get("/restricted2", (req, res) => {
    res.send("<h1>Admin space</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});