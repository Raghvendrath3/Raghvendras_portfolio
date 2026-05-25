import { Router } from 'express';
import { contactRateLimiter } from '../middleware/rateLimiter';
import { contactValidators, requestValidatorMiddleware } from '../middleware/requestValidator';
import { ContactController } from '../controllers/contact.controller';

const router = Router();

router.post(
  '/contact',
  contactRateLimiter,
  contactValidators,
  requestValidatorMiddleware,
  ContactController.submit
);

export default router;
