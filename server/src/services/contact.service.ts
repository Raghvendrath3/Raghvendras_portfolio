import crypto from 'crypto';
import { Contact } from '../models/Contact.model';
import { getMailer } from '../config/mailer';

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactService {
  static async submit(data: ContactInput, rawIp: string): Promise<void> {
    // Hash the IP
    const ipHash = crypto.createHash('sha256').update(rawIp).digest('hex');

    // Save to MongoDB
    const contact = new Contact({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      ipHash
    });

    await contact.save();
    console.log('[contact] Message saved:', contact._id);

    // Try to send email
    const mailer = getMailer();
    if (mailer) {
      try {
        await mailer.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@portfolio.local',
          to: 'raghvendrath3@gmail.com',
          subject: `New Portfolio Message: ${data.subject}`,
          text: `From: ${data.name} <${data.email}>\n\n${data.message}`
        });
        console.log('[contact] Email sent for message:', contact._id);
      } catch (emailError) {
        console.warn('[contact] Email sending failed:', emailError);
      }
    }
  }
}
