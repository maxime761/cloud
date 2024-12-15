const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;
const path = require('path');
app.use(bodyParser.json());
app.use(express.static('public'));

const COMMENTS_FILE = path.join(__dirname, 'public', 'comments', 'comments.json');


app.get('/', (req, res) => {
    res.redirect('http://localhost:8081/menu.html');
});

app.get('/comments/:videoId', (req, res) => {
    const videoId = req.params.videoId;
    try {
        const comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf-8'));
        const videoComments = comments.filter(comment => comment.video_id === videoId);
        res.json(videoComments);
    } catch (error) {
        console.error('Erreur lors de la lecture des commentaires:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Ajouter un commentaire
app.post('/comments', (req, res) => {
    const { video_id, username, comment } = req.body;
    const comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf-8'));

    comments.push({
        video_id,
        username,
        comment,
        timestamp: new Date().toISOString()
    });

    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
