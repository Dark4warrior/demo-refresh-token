const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let refreshTokens = []; 

const ACCESS_SECRET = "ma_cle_secrete_access";
const REFRESH_SECRET = "ma_cle_super_secrete_refresh";

app.post('/login', (req, res) => {
    const { username } = req.body;
    const user = { name: username };

    const accessToken = jwt.sign(user, ACCESS_SECRET, { expiresIn: '5s' });
    const refreshToken = jwt.sign(user, REFRESH_SECRET);
    
    refreshTokens.push(refreshToken);
    res.json({ accessToken, refreshToken });
});

app.post('/token', (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);
    if (!refreshTokens.includes(token)) return res.sendStatus(403);

    jwt.verify(token, REFRESH_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({ name: user.name }, ACCESS_SECRET, { expiresIn: '15s' });
        res.json({ accessToken });
    });
});

app.get('/data', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, ACCESS_SECRET, (err, user) => {
        if (err) {
            return res.status(401).send("Token expiré");
        }
        res.json({ message: "Succès !", data: "Voici vos données protégées" });
    });
});

app.listen(4000, () => console.log("Serveur sur le port 4000"));