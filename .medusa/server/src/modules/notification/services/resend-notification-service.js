"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resend_1 = require("resend");
class ResendNotificationService {
    constructor({}) {
        this.resend = new resend_1.Resend(process.env.RESEND_API_KEY);
    }
    async sendNotification(event, data, to) {
        const results = [];
        for (const email of to) {
            const response = await this.resend.emails.send({
                from: 'tu-correo@tudominio.com', // Cambia esto por uno verificado
                to: email,
                subject: `Notificación: ${event}`,
                html: `<p>Hola, este es un evento de tipo: <b>${event}</b></p><pre>${JSON.stringify(data, null, 2)}</pre>`,
            });
            results.push({
                to: email,
                status: response.data?.id ? 'sent' : 'failed',
                data: response,
            });
        }
        return results;
    }
    async resendNotification(notificationId) {
        return;
    }
    async deleteNotification(notificationId) {
        return;
    }
}
ResendNotificationService.identifier = 'resend';
exports.default = ResendNotificationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZW5kLW5vdGlmaWNhdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbm90aWZpY2F0aW9uL3NlcnZpY2VzL3Jlc2VuZC1ub3RpZmljYXRpb24tc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUErQjtBQUUvQixNQUFNLHlCQUF5QjtJQUk3QixZQUFZLEVBQUU7UUFDWixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDdEQsQ0FBQztJQUVELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDcEIsS0FBYSxFQUNiLElBQTZCLEVBQzdCLEVBQVk7UUFRWixNQUFNLE9BQU8sR0FJUCxFQUFFLENBQUE7UUFFUixLQUFLLE1BQU0sS0FBSyxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUM3QyxJQUFJLEVBQUUseUJBQXlCLEVBQUUsaUNBQWlDO2dCQUNsRSxFQUFFLEVBQUUsS0FBSztnQkFDVCxPQUFPLEVBQUUsaUJBQWlCLEtBQUssRUFBRTtnQkFDakMsSUFBSSxFQUFFLDBDQUEwQyxLQUFLLGdCQUFnQixJQUFJLENBQUMsU0FBUyxDQUNqRixJQUFJLEVBQ0osSUFBSSxFQUNKLENBQUMsQ0FDRixRQUFRO2FBQ1YsQ0FBQyxDQUFBO1lBRUYsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDWCxFQUFFLEVBQUUsS0FBSztnQkFDVCxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUTtnQkFDN0MsSUFBSSxFQUFFLFFBQVE7YUFDZixDQUFDLENBQUE7UUFDSixDQUFDO1FBRUQsT0FBTyxPQUFPLENBQUE7SUFDaEIsQ0FBQztJQUVELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxjQUFzQjtRQUM3QyxPQUFNO0lBQ1IsQ0FBQztJQUVELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxjQUFzQjtRQUM3QyxPQUFNO0lBQ1IsQ0FBQzs7QUFwRE0sb0NBQVUsR0FBRyxRQUFRLENBQUE7QUF1RDlCLGtCQUFlLHlCQUF5QixDQUFBIn0=