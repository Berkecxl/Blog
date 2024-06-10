document.getElementById('submitCommentButton').addEventListener('click', function (event) {
    event.preventDefault();
    var username = parseJwt(sessionStorage.getItem('token')).sub;
    var message = document.getElementById('commentText').value; 

    if (message === "") {
        document.getElementById('error-message').style.color = "red";
        document.getElementById('error-message').textContent = "Bütün Alanları Doldurun!"
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/v1/comment/create', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 200 && response.success) {
                setTimeout(function () {
                    swal.fire({
                        title: 'Başarılı!',
                        text: "Yorum başarıyla yapıldı.",
                        icon: 'success',
                        confirmButtonText: 'Kapat'
                    }).then(function () {
                        window.location.href = 'index.html';
                    })
                }, 10);
            } else {

            }
        }
    };
    xhr.send(JSON.stringify({ username, message }));
});

function parseJwt(token) {
    if (token === null) {
        return false;
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
