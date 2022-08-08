import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { env } from '../../env/server.mjs';
import { NodemailerData } from '../../schema/user-schema';

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(input: NodemailerData, userId: string) {
  const { email, firstName } = input;
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.NODEMAILER_EMAIL, // generated ethereal user
        pass: env.NODEMAILER_PASS, // generated ethereal password
      },
    });

    jwt.sign(
      { userId },
      process.env.NODEMAILER_SECRET as string,
      {
        expiresIn: '1d',
        algorithm: 'HS384',
      },
      async (error, emailToken) => {
        if (!error) {
          const url = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/email-confirmed#token=${emailToken}`
            : `http://localhost:${
                process.env.PORT ?? 3000
              }/email-confirmed#token=${emailToken}`;

          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: 'CodeCards', // sender address
            to: `${email}`, // list of receivers
            subject: 'Activating you account', // Subject line
            text: `Please click the link bellow ${firstName} to activate your account.`, // plain text body
            html: `<a href=${url}>Click the <b>Link</b> to activate!</a>`, // html body
          });
        } else {
          console.log(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export default sendMail;
