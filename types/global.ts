export type TError = {
  data: { message: string; success: boolean; stack: string };
  status: number;
};

export type TResponse = {
  data?: { message: string; success: boolean; stack: string };
  error?: TError;
};
