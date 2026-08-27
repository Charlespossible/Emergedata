import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FormField, Input, Select, Textarea } from '@/components/ui/FormField';
import { contactSchema, type ContactValues } from '@/lib/validation';
import { hasContactEndpoint, submitContact } from '@/lib/contact';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type Props = {
  /** Option list for "Area of interest", sourced from the focus areas content. */
  interests: { value: string; label: string }[];
  successMessage: string;
  mailtoNote: string;
};

export function ContactForm({ interests, successMessage, mailtoNote }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      organisation: '',
      interest: '',
      message: '',
      website: '',
    },
  });

  const onSubmit = async (values: ContactValues) => {
    setStatus('submitting');
    setErrorMessage('');
    const result = await submitContact(values);
    if (result.ok) {
      setStatus('success');
      reset();
    } else {
      setStatus('error');
      setErrorMessage(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Name" required error={errors.name?.message}>
          {({ id, describedBy, invalid }) => (
            <Input
              id={id}
              autoComplete="name"
              aria-describedby={describedBy}
              aria-invalid={invalid}
              {...register('name')}
            />
          )}
        </FormField>

        <FormField label="Email" required error={errors.email?.message}>
          {({ id, describedBy, invalid }) => (
            <Input
              id={id}
              type="email"
              autoComplete="email"
              aria-describedby={describedBy}
              aria-invalid={invalid}
              {...register('email')}
            />
          )}
        </FormField>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Organisation" error={errors.organisation?.message}>
          {({ id, describedBy, invalid }) => (
            <Input
              id={id}
              autoComplete="organization"
              aria-describedby={describedBy}
              aria-invalid={invalid}
              {...register('organisation')}
            />
          )}
        </FormField>

        <FormField label="Area of interest" error={errors.interest?.message}>
          {({ id, describedBy, invalid }) => (
            <Select
              id={id}
              aria-describedby={describedBy}
              aria-invalid={invalid}
              {...register('interest')}
            >
              <option value="">Select an area</option>
              {interests.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
              <option value="general">General enquiry</option>
            </Select>
          )}
        </FormField>
      </div>

      <FormField label="Message" required error={errors.message?.message}>
        {({ id, describedBy, invalid }) => (
          <Textarea
            id={id}
            aria-describedby={describedBy}
            aria-invalid={invalid}
            placeholder="Tell us about the decision you are trying to make."
            {...register('message')}
          />
        )}
      </FormField>

      {/* Honeypot. Hidden from people and from assistive technology; bots fill it. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="website-field">Website</label>
        <input id="website-field" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            'Send message'
          )}
        </Button>
        {!hasContactEndpoint ? <p className="text-small text-ink-500">{mailtoNote}</p> : null}
      </div>

      <div aria-live="polite" className="min-h-[1.5rem]">
        {status === 'success' ? (
          <p className="flex items-start gap-2 rounded-lg bg-brand-50 p-4 text-small text-brand-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
            {successMessage}
          </p>
        ) : null}
        {status === 'error' ? (
          <p className="flex items-start gap-2 rounded-lg bg-accent-50 p-4 text-small text-accent-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
            {errorMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
