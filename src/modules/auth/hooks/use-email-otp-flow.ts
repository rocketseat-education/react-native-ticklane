import { useCallback, useState } from 'react';

import { useAuth } from '../context/use-auth';

export type EmailOtpStep = 'email' | 'code';
export type EmailOtpFeedback = { kind: 'info' | 'error'; text: string } | null;

export type UseEmailOtpFlowOptions = {
  onAuthenticated?: () => void;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPlausibleEmail(value: string): boolean {
  const v = value.trim();
  if (v.length === 0 || v.length > 254) {
    return false;
  }
  return EMAIL_REGEX.test(v);
}

/**
 * Estado partilhado do fluxo de login por e-mail + OTP.
 * Usado tanto pelo ecrã `/auth` (modal completo) como pelo bottom-sheet
 * de gating (`AuthGate`).
 */
export function useEmailOtpFlow({ onAuthenticated }: UseEmailOtpFlowOptions = {}) {
  const { requestEmailLoginCode, verifyEmailLoginCode } = useAuth();

  const [step, setStep] = useState<EmailOtpStep>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState<EmailOtpFeedback>(null);
  const [pendingSend, setPendingSend] = useState(false);
  const [pendingVerify, setPendingVerify] = useState(false);

  const submitEmail = useCallback(async () => {
    if (pendingSend) {
      return;
    }
    const normalized = email.trim().toLowerCase();
    if (!isPlausibleEmail(normalized)) {
      setFeedback({ kind: 'error', text: 'Insere um e-mail válido.' });
      return;
    }
    setPendingSend(true);
    setFeedback(null);
    const res = await requestEmailLoginCode(normalized);
    setPendingSend(false);
    if (res.ok) {
      setEmail(normalized);
      setCode('');
      setStep('code');
      setFeedback({
        kind: 'info',
        text: `Enviámos um código para ${normalized}. Verifica o e-mail.`,
      });
      return;
    }
    setFeedback({ kind: 'error', text: res.error });
  }, [email, pendingSend, requestEmailLoginCode]);

  const submitCode = useCallback(async () => {
    if (pendingVerify) {
      return;
    }
    const digits = code.replace(/\D/g, '');
    if (digits.length !== 6) {
      setFeedback({ kind: 'error', text: 'O código tem 6 dígitos.' });
      return;
    }
    setPendingVerify(true);
    setFeedback(null);
    const res = await verifyEmailLoginCode(email, digits);
    setPendingVerify(false);
    if (res.ok) {
      onAuthenticated?.();
      return;
    }
    setFeedback({ kind: 'error', text: res.error });
  }, [code, email, onAuthenticated, pendingVerify, verifyEmailLoginCode]);

  const resend = useCallback(async () => {
    if (!email || pendingSend) {
      return;
    }
    setPendingSend(true);
    setFeedback(null);
    const res = await requestEmailLoginCode(email);
    setPendingSend(false);
    if (res.ok) {
      setFeedback({ kind: 'info', text: `Reenviámos o código para ${email}.` });
      return;
    }
    setFeedback({ kind: 'error', text: res.error });
  }, [email, pendingSend, requestEmailLoginCode]);

  const editEmail = useCallback(() => {
    setStep('email');
    setCode('');
    setFeedback(null);
  }, []);

  const reset = useCallback(() => {
    setStep('email');
    setEmail('');
    setCode('');
    setFeedback(null);
    setPendingSend(false);
    setPendingVerify(false);
  }, []);

  const handleCodeChange = useCallback((value: string) => {
    setCode(value.replace(/\D/g, '').slice(0, 6));
  }, []);

  return {
    step,
    email,
    code,
    feedback,
    pendingSend,
    pendingVerify,
    canSubmitEmail: email.trim().length > 0 && !pendingSend,
    canSubmitCode: code.length === 6 && !pendingVerify,
    setEmail,
    setCode: handleCodeChange,
    submitEmail,
    submitCode,
    resend,
    editEmail,
    reset,
  };
}
