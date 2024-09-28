import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { prisma } from '~/modules/prisma.server';
import nodemailer from 'nodemailer';

let mailer: nodemailer.Transporter | null = null;

export async function getMailer(storeId?: string) {
  if (!storeId) {
    if (mailer) {
      return mailer;
    }

    return nodemailer.createTransport({
      host: process.env.INTERNAL_MAILER_HOST,
      port: Number(process.env.INTERNAL_MAILER_PORT),
      secure: true,
      auth: {
        user: process.env.INTERNAL_MAILER_USER,
        pass: process.env.INTERNAL_MAILER_PASS,
      },
    });
  }

  const { SmtpSetting } = await prisma.store.findUniqueOrThrow({
    where: { id: storeId },
    include: {
      SmtpSetting: true,
    },
  });

  if (!SmtpSetting) {
    return null;
  }

  const {
    host,
    port,
    from,
    protocol,
    tlsVersion,
    timeout,
    useProxy,
    proxyHost,
    proxyPort,
    proxyUsername,
    proxyPassword,
    username,
    password,
  } = SmtpSetting;

  if (
    !host ||
    !port ||
    !from
  ) {
    return null;
  }

  const options: SMTPTransport.Options = {
    host,
    port,
    secure: protocol === 'smtps',
  };

  if (timeout) {
    options.connectionTimeout = timeout;
  }

  if (useProxy) {
    const url = new URL(`http://${proxyHost}`);

    if (proxyUsername && proxyPassword) {
      url.username = proxyUsername;
      url.password = proxyPassword;
    }

    if (proxyPort) {
      url.port = proxyPort.toString();
    }

    (options as any).proxy = url.toString();
  }

  if (username && password) {
    options.auth = {
      user: username,
      pass: password,
    };
  }

  if (tlsVersion) {
    options.tls = {
      minVersion: tlsVersion as any,
    };
  }

  return nodemailer.createTransport(options);
}
