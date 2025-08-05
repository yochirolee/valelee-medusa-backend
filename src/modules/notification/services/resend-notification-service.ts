import { Resend } from 'resend'

class ResendNotificationService {
  static identifier = 'resend'
  protected resend: Resend

  constructor({}) {
    this.resend = new Resend(process.env.RESEND_API_KEY)
  }

  async sendNotification(
    event: string,
    data: Record<string, unknown>,
    to: string[]
  ): Promise<
    {
      to: string
      status: string
      data: unknown
    }[]
  > {
    const results: {
      to: string
      status: string
      data: unknown
    }[] = []

    for (const email of to) {
      const response = await this.resend.emails.send({
        from: 'tu-correo@tudominio.com', // Cambia esto por uno verificado
        to: email,
        subject: `Notificación: ${event}`,
        html: `<p>Hola, este es un evento de tipo: <b>${event}</b></p><pre>${JSON.stringify(
          data,
          null,
          2
        )}</pre>`,
      })

      results.push({
        to: email,
        status: response.data?.id ? 'sent' : 'failed',
        data: response,
      })
    }

    return results
  }

  async resendNotification(notificationId: string): Promise<void> {
    return
  }

  async deleteNotification(notificationId: string): Promise<void> {
    return
  }
}

export default ResendNotificationService
