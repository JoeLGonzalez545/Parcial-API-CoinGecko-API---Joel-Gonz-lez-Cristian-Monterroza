async function obtenerCripto() {

    const nombreCripto = document.getElementById("criptomoneda").value.trim();
    const resultado = document.getElementById("resultado");
    const apiKey = "CG-QPnkgy3H7hshjpCiQRqEZLoj";

    if (!nombreCripto) {
        resultado.textContent = "Escribe una criptomoneda";
        return;
    }

    const parametros = new URLSearchParams({ vs_currency: "usd", ids: nombreCripto, sparkline: "true", x_cg_demo_api_key: apiKey });
    const url = `https://api.coingecko.com/api/v3/coins/markets?${parametros.toString()}`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (!respuesta.ok || datos.length === 0) {
            resultado.textContent = "Moneda no encontrada o error de la API";
            return;
        }

        const coin = datos[0];
        resultado.innerHTML = `
        <h2><img src="${coin.image}" class="coin-img"> ${coin.name} (${coin.symbol}) / Top: ${coin.market_cap_rank}</h2>
        <p> <strong>Precio:</strong> $${coin.current_price} USD</p>
        <p> <strong>Precio más alto en 24h:</strong> $${coin.high_24h}</p>
        <p> <strong>Precio más bajo en 24h:</strong> $${coin.low_24h}</p>
        <p> <strong>Tasa de cambio en 24h:</strong> ${coin.price_change_percentage_24h}% </p>
        `;


    } catch (error) {
        console.error("Error al consultar CoinGecko:", error);
        resultado.textContent = "No se pudo conectar con el servicio de criptomonedas. Revisa tu conexión y la clave de API";
    }
}