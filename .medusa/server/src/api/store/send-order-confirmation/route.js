"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
const POST = async (req, res) => {
    try {
        const body = req.body;
        const { formData, cartItems, cartId } = body;
        console.log("✅ BACKEND_URL:", process.env.MEDUSA_BACKEND_URL);
        console.log('🛒 cartId:', cartId);
        const completeRes = await fetch(`${process.env.MEDUSA_BACKEND_URL}/store/carts/${cartId}/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-publishable-api-key': process.env.MEDUSA_API_KEY,
            },
        });
        const completeData = await completeRes.json();
        if (!completeRes.ok || !completeData.order) {
            console.log('📦 completeRes.ok:', completeRes.ok);
            console.log('📦 completeData:', completeData);
            return res.status(500).send({ error: 'No se pudo completar el carrito' });
        }
        const order = completeData.order;
        const orderInfo = {
            display_id: order.display_id,
            payment_method: order.payments?.[0]?.provider_id || 'N/A',
            subtotal: order.subtotal / 100,
            shipping_total: order.shipping_total / 100,
            tax_total: order.tax_total / 100,
            total: order.total / 100,
        };
        const adminBody = `
Nuevo pedido recibido:

Orden #: ${orderInfo.display_id}
Método de pago: ${orderInfo.payment_method.toUpperCase()}

Destinatario: ${formData.nombre} ${formData.apellidos}
Carné de Identidad: ${formData.ci}
Teléfono: ${formData.telefono}
Email: ${formData.email}
Provincia: ${formData.provincia}
Municipio: ${formData.municipio}
Dirección Exacta: ${formData.direccion}
Instrucciones: ${formData.instrucciones || 'N/A'}

Productos:
${cartItems
            .map((item) => `- ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
            .join('\n')}

Totales:
Subtotal: $${orderInfo.subtotal.toFixed(2)}
Envío: $${orderInfo.shipping_total.toFixed(2)}
Impuestos: $${orderInfo.tax_total.toFixed(2)}
Total: $${orderInfo.total.toFixed(2)}
`;
        const clientBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
  <h2 style="color:rgb(15, 15, 15);">Hola ${formData.nombre},</h2>
  <p>Gracias por tu compra. Este es el resumen de tu pedido:</p>
  <p><strong>Orden #:</strong> ${orderInfo.display_id}</p>
  <p><strong>Método de pago:</strong> ${orderInfo.payment_method.toUpperCase()}</p>

  <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
    <thead>
      <tr>
        <th style="text-align: left; border-bottom: 1px solid #ccc; padding: 8px;">Producto</th>
        <th style="text-align: center; border-bottom: 1px solid #ccc; padding: 8px;">Cantidad</th>
        <th style="text-align: right; border-bottom: 1px solid #ccc; padding: 8px;">Total</th>
      </tr>
    </thead>
    <tbody>
      ${cartItems
            .map((item) => {
            const imageUrl = item.thumbnail?.startsWith('/')
                ? `${process.env.MEDUSA_BACKEND_URL}${item.thumbnail}`
                : item.thumbnail || 'https://via.placeholder.com/50';
            return `
          <tr>
            <td style="padding: 8px; display: flex; align-items: center;">
              <img src="${imageUrl}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 8px; border-radius: 4px;" />
              ${item.name}
            </td>
            <td style="text-align: center; padding: 8px;">${item.quantity}</td>
            <td style="text-align: right; padding: 8px;">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        `;
        })
            .join('')}
    </tbody>
  </table>

  <p style="margin-top: 20px;"><strong>Dirección:</strong> ${formData.direccion}</p>
  <p><strong>Instrucciones:</strong> ${formData.instrucciones || 'N/A'}</p>

  <h3 style="margin-top: 24px;">Totales:</h3>
  <p>Subtotal: $${orderInfo.subtotal.toFixed(2)}</p>
  <p>Envío: $${orderInfo.shipping_total.toFixed(2)}</p>
  <p>Impuestos: $${orderInfo.tax_total.toFixed(2)}</p>
  <p><strong>Total: $${orderInfo.total.toFixed(2)}</strong></p>

  <p style="margin-top: 20px;">Nos pondremos en contacto contigo cuando el pedido esté en camino.</p>
  <p style="color:rgb(18, 18, 19);">Equipo de <strong>Valelee</strong></p>
</div>
`;
        await resend.emails.send({
            from: 'info@valelee.com',
            to: 'leidivioleta@gmail.com',
            subject: `🛒 Nuevo pedido #${orderInfo.display_id}`,
            html: `<pre>${adminBody}</pre>`,
        });
        await resend.emails.send({
            from: 'info@valelee.com',
            to: formData.email,
            subject: `✅ Confirmación de tu pedido #${orderInfo.display_id}`,
            html: clientBody,
        });
        return res.send({ success: true });
    }
    catch (error) {
        console.error('❌ Error en send-order-confirmation:', error);
        return res.status(500).send({ error: 'Fallo al enviar correos' });
    }
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3NlbmQtb3JkZXItY29uZmlybWF0aW9uL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG1DQUErQjtBQUUvQixNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0FBRTlDLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFBRSxHQUFtQixFQUFFLEdBQWlCLEVBQUUsRUFBRTtJQUNuRSxJQUFJLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBMkIsQ0FBQTtRQUM1QyxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFFakMsTUFBTSxXQUFXLEdBQUcsTUFBTSxLQUFLLENBQzdCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsZ0JBQWdCLE1BQU0sV0FBVyxFQUNsRTtZQUNFLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBZTthQUNyRDtTQUNGLENBQ0YsQ0FBQTtRQUVELE1BQU0sWUFBWSxHQUFHLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFBO1FBRTdDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9C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