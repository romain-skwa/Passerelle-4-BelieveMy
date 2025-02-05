import { createTransport, Transporter } from 'nodemailer';
/*
type EmailPayload = {
  to: string;
  subject: string;
  text?: string;
  html: string;
};
*/
const smtpOptions = {
  host: process.env.NODEMAILER_SMTP_HOST ?? 'smtp.mailtrap.io',
  port: parseInt(process.env.NODEMAILER_SMTP_PORT ?? '2525'),
  //secure: true,
  pool: true,
  auth: {
    user: process.env.NODEMAILER_SMTP_USER ?? 'user',
    pass: process.env.NODEMAILER_SMTP_PASSWORD ?? 'password',
  },
  /*tls: {
    servername: process.env.NODEMALER_SMTP_SERVERNAME ?? 'smtp.mailtrap.io',
  },*/
};

export class MailerService {
  #transporter;

  constructor() {
    this.#transporter = createTransport(smtpOptions);
  }

  async sendEmail(payload) {
    return await this.#transporter.sendMail({
      from: process.env.NODEMAILER_SMTP_USER ?? 'noreply@localhost',
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    });
  }
}

const mailerService = new MailerService();

export default mailerService;