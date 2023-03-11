require('dotenv').config()
const express = require('express')
const base64 = require('base-64');
const utf8 = require('utf8');

const app = express();
const port = process.env.PORT || 6000

app.use(express.urlencoded({ extended: false }))

// To base64
const base64_encode = (text) => {
    var bytes = utf8.encode(text);
    var encoded = base64.encode(bytes);

    return encoded
}

// From base64
const base64_decode = (encoded) => { 
    var bytes = base64.decode(encoded);
    var text = utf8.decode(bytes);

    return text
}

app.get('/e/:base', (req, res) => {
    res.send(base64_encode(req.params.base));
})

app.get('/d/:base', (req, res) => {
    res.send(base64_decode(req.params.base));
})

app.get('/je/:base', (req, res) => {
    res.send({"encoded" : base64_encode(req.params.base)});
})

app.get('/jd/:base', (req, res) => {
    res.send({"decoded" : base64_decode(req.params.base)});
})

app.get('/', (req, res) => {
    res.send("Use /e/ or /d/ followed by the text to encode or decode (use /je/ or /jd/ for json response)")
})

app.listen(port, () => console.log(`Server is running on port ${port}.`))