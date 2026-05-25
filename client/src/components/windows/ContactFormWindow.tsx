import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Win98Window } from '../ui/Win98Window';
import { Win98Button } from '../ui/Win98Button';
import { useWindowStore } from '../../store/useWindowStore';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters')
});

type ContactFormData = z.infer<typeof schema>;

export const ContactFormWindow: React.FC = () => {
  const { closeWindow } = useWindowStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema)
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const res = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message ?? 'Submission failed');
      }
      return res.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      reset();
      setShowError(false);
    },
    onError: (error) => {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
      setShowError(true);
      setShowSuccess(false);
    }
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  if (showSuccess) {
    return (
      <Win98Window
        id="contact-form"
        title="Send Message"
        showMenubar={false}
        statusbarContent={['Message sent']}
        hideResize
      >
        <div className="p-6 flex flex-col items-center justify-center h-full bg-win-gray select-none">
          <div className="border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white bg-white p-4 text-center max-w-xs">
            <p className="text-[11px] font-win text-win-black mb-4">
              Message sent. I will reply within 48 hours.
            </p>
            <Win98Button
              onClick={() => closeWindow('contact-form')}
              defaultBtn
              className="select-none"
            >
              Close
            </Win98Button>
          </div>
        </div>
      </Win98Window>
    );
  }

  return (
    <Win98Window
      id="contact-form"
      title="Send Message"
      showMenubar={false}
      statusbarContent={['Send your message']}
      hideResize
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-3 bg-win-gray flex flex-col h-full select-none">
        {/* Error message */}
        {showError && (
          <div className="mb-3 p-2 border border-red-500 bg-white text-[10px] text-red-600 font-win select-text">
            {errorMessage}
          </div>
        )}

        {/* Name field */}
        <div className="mb-3">
          <label className="block text-[11px] font-win text-win-black font-bold mb-1 select-none">
            Name
          </label>
          <input
            {...register('name')}
            type="text"
            className="w-full px-2 py-1 text-[11px] font-win border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white bg-white text-win-black"
          />
          {errors.name && (
            <div className="text-[10px] text-red-600 mt-1 select-text">
              {errors.name.message}
            </div>
          )}
        </div>

        {/* Email field */}
        <div className="mb-3">
          <label className="block text-[11px] font-win text-win-black font-bold mb-1 select-none">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-2 py-1 text-[11px] font-win border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white bg-white text-win-black"
          />
          {errors.email && (
            <div className="text-[10px] text-red-600 mt-1 select-text">
              {errors.email.message}
            </div>
          )}
        </div>

        {/* Subject field */}
        <div className="mb-3">
          <label className="block text-[11px] font-win text-win-black font-bold mb-1 select-none">
            Subject
          </label>
          <input
            {...register('subject')}
            type="text"
            className="w-full px-2 py-1 text-[11px] font-win border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white bg-white text-win-black"
          />
          {errors.subject && (
            <div className="text-[10px] text-red-600 mt-1 select-text">
              {errors.subject.message}
            </div>
          )}
        </div>

        {/* Message field */}
        <div className="mb-3 flex-1 flex flex-col">
          <label className="block text-[11px] font-win text-win-black font-bold mb-1 select-none">
            Message
          </label>
          <textarea
            {...register('message')}
            className="flex-1 px-2 py-1 text-[11px] font-win border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white bg-white text-win-black resize-none"
          />
          {errors.message && (
            <div className="text-[10px] text-red-600 mt-1 select-text">
              {errors.message.message}
            </div>
          )}
        </div>

        {/* Submit button */}
        <div className="flex gap-2 justify-end select-none">
          <Win98Button
            onClick={() => closeWindow('contact-form')}
            type="button"
            className="select-none"
          >
            Cancel
          </Win98Button>
          <Win98Button
            type="submit"
            disabled={mutation.isPending}
            defaultBtn
            className="select-none"
          >
            {mutation.isPending ? 'Sending...' : 'Send Message'}
          </Win98Button>
        </div>
      </form>
    </Win98Window>
  );
};
