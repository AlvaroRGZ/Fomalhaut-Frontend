import axios, { AxiosResponse } from 'axios';
import { Log } from './Log.model';

class LogsService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:8081/logs';
  }

  async getAllLogs(): Promise<Log[]> {
    const response: AxiosResponse<Log[]> = await axios.get(this.baseUrl);
    return response.data;
  }

  async getLogById(id: number): Promise<Log> {
    const response: AxiosResponse<Log> = await axios.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async createLog(log: Log): Promise<Log> {
    const response: AxiosResponse<Log> = await axios.post(this.baseUrl, log);
    return response.data;
  }

  async updateLog(id: number, log: Log): Promise<Log> {
    const response: AxiosResponse<Log> = await axios.put(`${this.baseUrl}/${id}`, log);
    return response.data;
  }

  async deleteLog(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }

  async deleteAllLogsBeforeDate(): Promise<void> {
    await axios.delete(this.baseUrl);
  }
}

export default new LogsService();
