import express from 'express';
import * as fs from 'fs';
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.POCKET);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('static'));


// Setup template engine //////////
app.engine('html', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {

        let rendered = content.toString();
        for (let key in options) {
            if(key !== 'settings' && key !== '_locals' && key !== 'cache') {
                rendered = rendered.replace(new RegExp('{{' + key + '}}', 'g'), options[key]);
            }
        }

        return callback(null, rendered)
    });
});
app.set('views', './views');
app.set('view engine', 'html');
// End of template engine setup ///

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        pageTitle: '<h1>TheWhatDeep</h1>'
    });
});
app.get('/page/:title', (req, res) => {
    res.render('index', {
        title: req.params.title,
        pageTitle: '<h1>TheWhatDeep</h1>'
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});