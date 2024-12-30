
export const createPreference = async (employee: string, amount: number, message?: string) => {
    const preference = {
      items: [
        {
          title: `Propina para ${employee}`,
          quantity: 1,
          unit_price: amount,
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
  
    try {
      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          Authorization: `Bearer TEST-6893098950915780-122516-d4ef99e07e16dd1dfc35ad19d655b50e-24582974`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preference),
      });
  
      const data = await response.json();
      return data.init_point; // Retorna el enlace de pago
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      throw new Error("No se pudo generar el enlace de pago.");
    }
  };
  