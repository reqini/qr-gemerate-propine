import { MERCADO_PAGO_SUCCESS_URL, MERCADO_PAGO_FAILURE_URL, MERCADO_PAGO_PENDING_URL } from "./constants";

export const generateMercadoPagoLink = async (cvu: string, amount: string, message: string) => {
  const accessToken = "YOUR_ACCESS_TOKEN"; // Reemplaza esto con tu token de acceso

  try {
    const response = await fetch("https://api.mercadopago.com/v1/payment_links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        transaction_amount: amount,
        description: message,
        payer_email: "payer@example.com", // Este es un campo opcional
        back_urls: {
            success: MERCADO_PAGO_SUCCESS_URL,
            failure: MERCADO_PAGO_FAILURE_URL,
            pending: MERCADO_PAGO_PENDING_URL,
        },
        payment_method: "QR",
        cvu: cvu, // El CVU del empleado
      }),
    });

    const data = await response.json();

    if (data.init_point) {
      return data.init_point; // Esta es la URL del enlace de pago
    } else {
      throw new Error("No se pudo generar el enlace de pago");
    }
  } catch (error) {
    console.error("Error al generar el enlace de pago:", error);
    return null;
  }
};
