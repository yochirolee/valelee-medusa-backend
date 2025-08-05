import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  body,
}: {
  to: string
  subject: string
  body: string
}) {
  try {
    const response = await resend.emails.send({
      from: 'info@valelee.com',
      to,
      subject,
      html: `<pre>${body}</pre>`,
    })

    if (response.error) {
      console.error('❌ Error al enviar correo:', response.error)
      return { success: false }
    }

    return { success: true }
  } catch (err) {
    console.error('❌ Error general al enviar correo:', err)
    return { success: false }
  }
}
