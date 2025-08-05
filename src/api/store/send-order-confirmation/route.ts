import type { FastifyRequest, FastifyReply } from 'fastify'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const POST = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const body = req.body as Record<string, any>
    const { formData, cartItems, cartId } = body
    console.log("✅ BACKEND_URL:", process.env.MEDUSA_BACKEND_URL)
    console.log('🛒 cartId:', cartId)
    
    const completeRes = await fetch(
      `${process.env.MEDUSA_BACKEND_URL}/store/carts/${cartId}/complete`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': process.env.MEDUSA_API_KEY!,
        },
      }
    )

    const completeData = await completeRes.json()

    if (!completeRes.ok || !completeData.order) {
        console.log('📦 completeRes.ok:', completeRes.ok)
        console.log('📦 completeData:', completeData)
      return res.status(500).send({ error: 'No se pudo completar el carrito' })
    }

    const order = completeData.order
    const orderInfo = {
      display_id: order.display_id,
      payment_method: order.payments?.[0]?.provider_id || 'N/A',
      subtotal: order.subtotal / 100,
      shipping_total: order.shipping_total / 100,
      tax_total: order.tax_total / 100,
      total: order.total / 100,
    }

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
  .map(
    (item: any) =>
      `- ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
  )
  .join('\n')}

Totales:
Subtotal: $${orderInfo.subtotal.toFixed(2)}
Envío: $${orderInfo.shipping_total.toFixed(2)}
Impuestos: $${orderInfo.tax_total.toFixed(2)}
Total: $${orderInfo.total.toFixed(2)}
`

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
        .map((item: any) => {
          const imageUrl = item.thumbnail?.startsWith('/')
            ? `${process.env.MEDUSA_BACKEND_URL}${item.thumbnail}`
            : item.thumbnail || 'https://via.placeholder.com/50'

          return `
          <tr>
            <td style="padding: 8px; display: flex; align-items: center;">
              <img src="${imageUrl}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 8px; border-radius: 4px;" />
              ${item.name}
            </td>
            <td style="text-align: center; padding: 8px;">${item.quantity}</td>
            <td style="text-align: right; padding: 8px;">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        `
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
`

    await resend.emails.send({
      from: 'info@valelee.com',
      to: 'leidivioleta@gmail.com',
      subject: `🛒 Nuevo pedido #${orderInfo.display_id}`,
      html: `<pre>${adminBody}</pre>`,
    })

    await resend.emails.send({
      from: 'info@valelee.com',
      to: formData.email,
      subject: `✅ Confirmación de tu pedido #${orderInfo.display_id}`,
      html: clientBody,
    })

    return res.send({ success: true })
  } catch (error) {
    console.error('❌ Error en send-order-confirmation:', error)
    return res.status(500).send({ error: 'Fallo al enviar correos' })
  }
}
