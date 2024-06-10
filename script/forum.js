document.addEventListener('DOMContentLoaded', () => {
    const commentsList = document.getElementById('commentsList');
    const newCommentButton = document.getElementById('newCommentButton');
    const newCommentForm = document.getElementById('newCommentForm');
    const authButton = document.getElementById('authButton');

    // Yeni Yorum Butonuna Tıklama
    newCommentButton.addEventListener('click', () => {
        if (!sessionStorage.getItem('token')) {
            window.location.href = 'login.html'; // Giriş sayfasına yönlendirme
        } else {
            // Yorum oluşturma formunu göster
            newCommentForm.style.display = 'block';
        }
    });

    // Yorumları API'den Alma
    function getComments() {
        fetch('http://localhost:8080/v1/comment')
            .then(response => response.json())
            .then(comments => {
                commentsList.innerHTML = ''; // Yorumları temizle
                comments.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.className = 'comment';
                    commentElement.innerHTML = `
                        <div class="comment-header">
                            <span class="comment-username">${comment.username}</span>
                            <span class="comment-date">${new Date(comment.createdDate).toLocaleString('tr-TR')}</span>
                        </div>
                        <div class="comment-body">${comment.message}</div>
                        <div class="comment-likes">
                            <div class="like-icon" data-comment-id="${comment.id}">❤️</div>
                            <div class="likes-count">${comment.likes !== undefined ? comment.likes : 0}</div>
                        </div>
                    `;
                    commentsList.appendChild(commentElement);
                });
                addLikeEventListeners();
            })
            .catch(error => console.error('Yorumlar alınırken hata oluştu:', error));
    }

    // Kalp İkonlarına Tıklama Olayını Ekleme Fonksiyonu
    function addLikeEventListeners() {
        const likeIcons = document.querySelectorAll('.like-icon');
        likeIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                const commentId = icon.dataset.commentId;
                likeComment(commentId);
            });
        });
    }

    // Yorumu Beğenme Fonksiyonu
    function likeComment(commentId) {
        const username = parseJwt(sessionStorage.getItem('token')).sub;
    
        if (username) {
            const requestData = {
                commentId: commentId,
                username: username
            };
    
            fetch('http://localhost:8080/v1/comment/like', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
            .then(response => {
                if (response.ok) {
                    console.log('Yorum beğenme başarılı');
                    // Gerekirse beğeni sayısını güncelle
                } else {
                    console.error('Yorum beğenme başarısız');
                }
            })
            .catch(error => console.error('İstek gönderilirken hata oluştu:', error));
        } else {
            console.log("Giriş Yap");
        }
    }
    

    // Sayfa yüklendiğinde yorumları al
    getComments();

    // Oturum Durumunu Kontrol Et
    checkSession();

    // Oturum Durumunu Kontrol Etme Fonksiyonu
    function checkSession() {
        const token = sessionStorage.getItem('token');
        if (token) {
            authButton.textContent = 'Çıkış Yap';
            authButton.addEventListener('click', () => {
                sessionStorage.removeItem('token');
                window.location.href = 'login.html'; // Çıkış işlemi, giriş sayfasına yönlendirme
            });
        } else {
            authButton.textContent = 'Giriş Yap';
            authButton.addEventListener('click', () => {
                window.location.href = 'login.html'; // Giriş sayfasına yönlendirme
            });
        }
    }
});
