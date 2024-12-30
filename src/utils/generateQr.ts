import { BASE_MERCADO_PAGO_URL, MERCADO_PAGO_SUCCESS_URL, MERCADO_PAGO_FAILURE_URL, MERCADO_PAGO_PENDING_URL } from "./constants";

export const generateQr = async (
  employee: string,
  amount: string,
  message: string
): Promise<string> => {
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
      success: MERCADO_PAGO_SUCCESS_URL,
      failure: MERCADO_PAGO_FAILURE_URL,
      pending: MERCADO_PAGO_PENDING_URL,
    },
    auto_return: "approved",
  };

  try {
    const response = await fetch(`${BASE_MERCADO_PAGO_URL}/checkout/preferences`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_MP_ACCESS_TOKEN}`, // Token de acceso desde variables de entorno
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preference),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.init_point) {
      throw new Error("No se pudo generar el enlace de pago: init_point ausente.");
    }

    return data.init_point; // Enlace para el QR
  } catch (error) {
    console.error("Error al generar el enlace de pago:", error);
    throw error;
  }
};
