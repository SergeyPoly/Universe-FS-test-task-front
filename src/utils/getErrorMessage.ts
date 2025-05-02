import {AxiosError} from 'axios';

export function getErrorMessage(error: unknown): string {
    const err = error as AxiosError<{ message: string }>;

    return err?.response?.data?.message || 'Unknown error occurred';
}
