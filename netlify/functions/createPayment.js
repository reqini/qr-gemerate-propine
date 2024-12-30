const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN, // Usá el token desde .env
});

exports.handler = async (event) => {
  try {
    const { employee, amount, message } = JSON.parse(event.body);

    const preference = {
      items: [
        {
          title: `Propina para ${employee}`,
          quantity: 1,
          unit_price: parseFloat(amount),
          description: message || "Sin mensaje",
        },
      ],
      back_urls: {
        success: "https://www.tusitio.com/success",
        failure: "https://www.tusitio.com/failure",
        pending: "https://www.tusitio.com/pending",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    return {
      statusCode: 200,
      body: JSON.stringify({ init_point: response.body.init_point }),
    };
  } catch (error) {
    console.error("Error al generar el enlace de pago:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No se pudo generar el enlace de pago." }),
    };
  }
};
