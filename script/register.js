const themes = [
    {
        background: "#1A1A2E",
        color: "#FFFFFF",
        primaryColor: "#0F3460"
    },
    {
        background: "#461220",
        color: "#FFFFFF",
        primaryColor: "#E94560"
    },
    {
        background: "#192A51",
        color: "#FFFFFF",
        primaryColor: "#967AA1"
    },
    {
        background: "#F7B267",
        color: "#000000",
        primaryColor: "#F4845F"
    },
    {
        background: "#F25F5C",
        color: "#000000",
        primaryColor: "#642B36"
    },
    {
        background: "#231F20",
        color: "#FFF",
        primaryColor: "#BB4430"
    }
];

const setTheme = (theme) => {
    const root = document.querySelector(":root");
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--color", theme.color);
    root.style.setProperty("--primary-color", theme.primaryColor);
};

const displayThemeButtons = () => {
    const btnContainer = document.querySelector(".theme-btn-container");
    themes.forEach((theme) => {
        const div = document.createElement("div");
        div.className = "theme-btn";
        div.style.cssText = `background: ${theme.background}; width: 25px; height: 25px`;
        btnContainer.appendChild(div);
        div.addEventListener("click", () => setTheme(theme));
    });
};

displayThemeButtons();

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Formun varsayılan submit davranışını engelle

    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const popupMessage = document.getElementById('popupMessage');

    try {
        const response = await fetch('http://localhost:8080/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, name, surname, password, email })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            showPopup('Kayıt başarılı!', 'success');
            setTimeout(() => {
                window.location.href = 'login.html'; // Kayıt başarılı olduğunda giriş sayfasına yönlendirme
            }, 3000);
        } else {
            showPopup(result.resultMessage || 'Kayıt başarısız oldu. Lütfen tekrar deneyin.', 'error');
        }
    } catch (error) {
        showPopup('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
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
