export type APIResponse<T = null> = {
  success: boolean;
  status: number;
  message?: string;
  error?: string;
  data?: T;
};
