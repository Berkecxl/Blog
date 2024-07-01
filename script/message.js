document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("contactForm");
    var alertMessage = document.getElementById("alert");

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
            if (response.ok && result.success) {
                showPopup('Mesaj başarılı bir şekilde gönderildi!', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html'; 
                }, 3000);            
            } else {
                showPopup('Mesaj başarılı bir şekilde gönderildi!', 'success');
            }
        }
    });

function showPopup(message, type) {
    const popup = document.getElementById('popupMessage');
    popup.className = `popup show ${type}`;
    popup.textContent = message;
    setTimeout(() => {
        popup.className = popup.className.replace('show', '');
    }, 3000);
}
});
