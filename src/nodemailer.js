import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Remplace par ton hôte SMTP
  port: 587,
  auth: {
    user: process.env.MAIL_USERNAME, // Ton nom d'utilisateur
    pass: process.env.MAIL_PASSWORD, // Ton mot de passe
  },
});

export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'noreply@introductionofmyvideogame.com', // Adresse de l'expéditeur
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};