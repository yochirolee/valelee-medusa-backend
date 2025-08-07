"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
async function sendEmail({ to, subject, body, }) {
    try {
        const response = await resend.emails.send({
            from: 'info@valelee.com',
            to,
            subject,
            html: `<pre>${body}</pre>`,
        });
        if (response.error) {
            console.error('❌ Error al enviar correo:', response.error);
            return { success: false };
        }
        return { success: true };
    }
    catch (err) {
        console.error('❌ Error general al enviar correo:', err);
        return { success: false };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2FwaS9lbWFpbC9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLDhCQTJCQztBQS9CRCxtQ0FBK0I7QUFFL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQUU5QyxLQUFLLFVBQVUsU0FBUyxDQUFDLEVBQzlCLEVBQUUsRUFDRixPQUFPLEVBQ1AsSUFBSSxHQUtMO0lBQ0MsSUFBSSxDQUFDO1FBQ0gsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUN4QyxJQUFJLEVBQUUsa0JBQWtCO1lBQ3hCLEVBQUU7WUFDRixPQUFPO1lBQ1AsSUFBSSxFQUFFLFFBQVEsSUFBSSxRQUFRO1NBQzNCLENBQUMsQ0FBQTtRQUVGLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzFELE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUE7UUFDM0IsQ0FBQztRQUVELE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUE7SUFDM0IsQ0FBQztBQUNILENBQUMifQ==