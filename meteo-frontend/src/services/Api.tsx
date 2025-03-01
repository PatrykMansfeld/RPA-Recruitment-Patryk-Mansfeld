import axios from 'axios';
import { ReportData, ModifyData } from '../types/index';

const API_BASE_URL = 'http://localhost:8000/api';

export const reportService = {
    async getReports(): Promise<ReportData[]> {
        const response = await axios.get(`${API_BASE_URL}/reports`);
        return response.data;
    },

    async createReport(report: ModifyData): Promise<ReportData> {
        const response = await axios.post(`${API_BASE_URL}/reports`, report, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    },

    async updateReport(id: number, report: ModifyData): Promise<ReportData> {
        const response = await axios.put(`${API_BASE_URL}/reports/${id}`, report, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    },

    async deleteReport(id: number): Promise<void> {
        await axios.delete(`${API_BASE_URL}/reports/${id}`);
    }
};
