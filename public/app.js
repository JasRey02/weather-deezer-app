const climaES = {

    Rain: 'Lluvia',
    Clouds: 'Nublado',
    Clear: 'Despejado',
    Thunderstorm: 'Tormenta',
    Drizzle: 'Llovizna',
    Mist: 'Neblina'
};

async function buscar() {

    try {

        document.getElementById('resultado').innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Obteniendo información...</p>
        </div>
        `;

        const city =
            document.getElementById('city').value;

        const response = await fetch(
            `/api/recommendation/${city}`
        );

        if (!response.ok) {

            throw new Error(
                'No se encontró la ciudad'
            );
        }

        const data = await response.json();

        mostrarResultado(data);

    } catch (error) {

        document.getElementById('resultado').innerHTML = `
        <div class="error-box">

            <h2>❌ Error</h2>

            <p>${error.message}</p>

        </div>
        `;
    }

}

function mostrarResultado(data) {

    applyTheme(data.clima);

        let html = `

    <div class="weather-card">

        <div class="weather-header">

            <img
                src="https://openweathermap.org/img/wn/${data.icon}@4x.png"
                alt="Clima">

            <div>

                <h2>${data.ciudad}</h2>

                <h1>${Math.round(data.temperatura)}°C</h1>

                <p>
                    ${climaES[data.clima] || data.clima}
                </p>

            </div>

        </div>

        <div class="weather-details">

            <div>
                🥵 Sensación:
                ${Math.round(data.sensacion)}°C
            </div>

            <div>
                💧 Humedad:
                ${data.humedad}%
            </div>

            <div>
                🌬️ Viento:
                ${data.viento} m/s
            </div>

            <div>
                🎵 Música:
                ${data.recomendacion}
            </div>

        </div>

    </div>

    <div class="cards">
    `;

    data.canciones.forEach(song => {

        html += `
        <div class="card">

            <img src="${song.portada}">

            <div class="song-info">

                <h3>${song.titulo}</h3>

                <p>${song.artista}</p>

                <audio controls>
                    <source src="${song.preview}">
                </audio>

                <br><br>

                <a
                    href="${song.enlace}"
                    target="_blank">
                    Escuchar en Deezer
                </a>

            </div>

        </div>
        `;
    });

    html += '</div>';

    document.getElementById('resultado')
        .innerHTML = html;
}

function applyTheme(weather) {

    const body = document.body;

    switch (weather) {

        case 'Rain':

            body.style.background =
                'linear-gradient(135deg,#0f172a,#1d4ed8)';
            break;

        case 'Clear':

            body.style.background =
                'linear-gradient(135deg,#f59e0b,#ea580c)';
            break;

        case 'Clouds':

            body.style.background =
                'linear-gradient(135deg,#374151,#111827)';
            break;

        case 'Thunderstorm':

            body.style.background =
                'linear-gradient(135deg,#312e81,#111827)';
            break;

        default:

            body.style.background =
                'linear-gradient(135deg,#0f172a,#1e293b)';
    }
}

async function usarUbicacion() {

    if (!navigator.geolocation) {

        alert(
            'Tu navegador no soporta geolocalización'
        );

        return;
    }

    document.getElementById('resultado').innerHTML = `
    <div class="loading">
        <div class="spinner"></div>
        <p>Obteniendo ubicación...</p>
    </div>
    `;

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            try {

                const lat =
                    position.coords.latitude;

                const lon =
                    position.coords.longitude;

                const response =
                    await fetch(
                        `/api/location/${lat}/${lon}`
                    );

                if (!response.ok) {

                    throw new Error(
                        'No fue posible obtener información climática'
                    );
                }

                const data =
                    await response.json();

                mostrarResultado(data);

            } catch (error) {

                document.getElementById('resultado').innerHTML = `
                <div class="error-box">

                    <h2>❌ Error</h2>

                    <p>${error.message}</p>

                </div>
                `;
            }

        },

        () => {

            document.getElementById('resultado').innerHTML = `
            <div class="error-box">

                <h2>❌ Error</h2>

                <p>No fue posible obtener tu ubicación.</p>

            </div>
            `;
        }
    );
}


window.onload = () => {

    usarUbicacion();

};