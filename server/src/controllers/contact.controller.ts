import { Request, Response, NextFunction } from 'express';
import { ContactService } from '../services/contact.service';

export class ContactController {
  static async submit(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, subject, message } = req.body;
      const rawIp = req.ip || '0.0.0.0';

      await ContactService.submit(
        { name, email, subject, message },
        rawIp
      );

      res.status(200).json({
        success: true,
        message: 'Message received.'
      });
    } catch (error) {
      next(error);
    }
  }
}
