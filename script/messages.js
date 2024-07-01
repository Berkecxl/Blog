document.addEventListener('DOMContentLoaded', () => {
    const commentsList = document.getElementById('commentsList');
    const authButton = document.getElementById('authButton');

    function getComments() {
        fetch('http://localhost:8080/v1/message')
            .then(response => response.json())
            .then(messages => {
                commentsList.innerHTML = ''; 
                messages.forEach(message => {
                    const commentElement = document.createElement('div');
                    commentElement.className = 'comment';
                    commentElement.innerHTML = `
                        <div class="comment-header">
                            <span class="comment-username">${message.name} ${message.surname}</span>
                            <span class="comment-date">${new Date(message.createdDate).toLocaleString('tr-TR')}</span>
                        </div>
                        <div class="comment-body">
                            <p><strong>Email:</strong> ${message.email}</p>
                            <p><strong>Mesaj:</strong> ${message.message}</p>
                        </div>
                    `;
                    commentsList.appendChild(commentElement);
                });
            })
            .catch(error => console.error('Yorumlar alınırken hata oluştu:', error));
    }
    
    getComments();

    checkSession();

    function checkSession() {
        const token = sessionStorage.getItem('token');
        if (token) {
            authButton.textContent = 'Çıkış Yap';
            authButton.addEventListener('click', () => {
                sessionStorage.removeItem('token');
                window.location.href = 'login.html'; 
            });
        } else {
            authButton.textContent = 'Giriş Yap';
            authButton.addEventListener('click', () => {
                window.location.href = 'login.html'; 
            });
        }
    }
});
