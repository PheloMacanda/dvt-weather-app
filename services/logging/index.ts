import axios from 'axios';
import { IError } from '../../interfaces/error';

const api = axios.create({
  baseURL: process.env.LOGGER_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export async function logErrorToServer(errorDetails: IError): Promise<void> {
  console.log(errorDetails.message);
  try {
    await api.post('/api/logger', 
      {
        "message": errorDetails.message,
        "stack": errorDetails.stack,
      }
    );
  } catch (error: any) {
    console.error('Failed to log error:', error.message || error);
  }
}