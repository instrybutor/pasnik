import axios, { AxiosError } from 'axios';

export function getAxiosErrorMessage(e: unknown) {
  if (axios.isAxiosError(e)) {
    const axiosError = e as AxiosError<{ message: string }>;
    return axiosError.response?.data.message ?? 'Unknown error';
  } else {
    return 'Unknown error';
  }
}
