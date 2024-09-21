import nodemailer from 'nodemailer';

export const internalMailer = nodemailer.createTransport({
  host: process.env.INTERNAL_MAILER_HOST,
  port: Number(process.env.INTERNAL_MAILER_PORT),
  secure: true,
  auth: {
    user: process.env.INTERNAL_MAILER_USER,
    pass: process.env.INTERNAL_MAILER_PASS,
  },
});
