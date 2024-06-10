document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("contactForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        var name = document.getElementById("name").value;
        var surname = document.getElementById("surname").value;
        var email = document.getElementById("email").value;
        var message = document.getElementById("message").value;
        var consent = document.getElementById("consent").checked;

        if (name && surname && email && message && consent) { 
            var data = {
                name: name,
                surname: surname,
                email: email,
                message: message
            };

            fetch("http://localhost:8080/v1/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Sunucu hatası!");
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    showPopup("Mesaj başarıyla gönderildi", 'success');
                } else {
                    showPopup("Gönderilirken bir hata oluştu, lütfen daha sonra tekrar deneyiniz.", 'error');
                }
            })
            .catch(error => {
                showPopup("Gönderilirken bir hata oluştu, lütfen daha sonra tekrar deneyiniz.", 'error');
            });
        } else {
            showPopup("Lütfen tüm alanları doldurun ve onay kutusunu işaretleyin.", 'error');
        }
    });
});

function showPopup(message, type) {
    const popup = document.getElementById('popupMessage');
    popup.className = `popup show ${type}`;
    popup.textContent = message;
    setTimeout(() => {
        popup.className = popup.className.replace('show', '');
    }, 3000);
}
