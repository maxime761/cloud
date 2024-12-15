function openVideo(videoFile) {
    window.location.href = `lecteur.html?video=${videoFile}`;
}

const urlParams = new URLSearchParams(window.location.search);
        const videoFile = urlParams.get('video');
        
        if (videoFile) {
            // Définit la source de la vidéo et démarre la lecture
            const videoPlayer = document.getElementById('videoPlayer');
            videoPlayer.src = `http://localhost:8084/videos/${videoFile}`;  // dossier 'videos' où se trouvent les vidéos
        } else {
            alert("Vidéo non trouvée !");
        }


window.onload = function () {
    fetchComments();
};

const videoId = new URLSearchParams(window.location.search).get('video');

function fetchComments() {
    // Remplacez videoId par l'ID correct dans l'URL
    fetch(`http://0.0.0.0:5000/comments`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau lors de la récupération des commentaires');
            }
            return response.json();
        })
        .then(comments => {
        const filteredComments = comments.filter(comment => comment.video_id === videoId);
            const commentsContainer = document.getElementById('commentsContainer');
            commentsContainer.innerHTML = ''; // Réinitialise le conteneur des commentaires

            // Afficher chaque commentaire
            filteredComments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                commentElement.innerHTML = `<strong>${comment.username}</strong>: ${comment.comment}`;
                commentsContainer.appendChild(commentElement);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des commentaires:', error);
        });
}

// Envoyer un nouveau commentaire au serveur
document.getElementById('commentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const commentText = document.getElementById('commentText').value;

    fetch('http://0.0.0.0:5000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ video_id: videoId, username, comment: commentText})
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            fetchComments(); // Recharger les commentaires après ajout
            document.getElementById('commentForm').reset(); // Réinitialiser le formulaire
        }
    })
    .catch(error => console.error('Erreur:', error));
});
