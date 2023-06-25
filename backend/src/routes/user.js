const express = require('express');
const router = express.Router();
const users = require('../users.json');
const jwt = require('jsonwebtoken');

// Ruta para la solicitud POST a /login
router.get('/users', (req, res) => {
    res.send(users);
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        const user = users.find((user) => user.username === username && user.password === password);

        if (user) {
            const secretKey = 'juanper'; // Clave secreta para firmar el token
            const token = jwt.sign({ username, userId: user.id }, secretKey, { expiresIn: '1h' });
            res.json({ message: 'Login exitoso', token });
        } else {
            res.status(401).json({ error: 'invalid credentials' });
        }
    } else {
        res.status(400).json({ error: 'Introduce your username and password' });
    }
});

module.exports = router;


module.exports = router;
