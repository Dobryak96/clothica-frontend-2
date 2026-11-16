import { isAxiosError } from 'axios';

type BackendErrorBody = {
  message?: string;
  validation?: Record<string, { message?: string }>;
};

const DEFAULT_MESSAGE = 'Щось пішло не так. Спробуйте ще раз.';

export const getErrorMessage = (error: unknown, fallback = DEFAULT_MESSAGE): string => {
  if (isAxiosError<BackendErrorBody>(error)) {
    const body = error.response?.data;
    const validationMessage = body?.validation
      ? Object.values(body.validation).find((segment) => segment?.message)?.message
      : undefined;

    return validationMessage ?? body?.message ?? fallback;
  }

  if (error instanceof Error && error.message) return error.message;

  return fallback;
};
