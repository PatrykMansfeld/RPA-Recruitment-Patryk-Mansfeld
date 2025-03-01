import { useState } from 'react';
import { ReportData } from '../types';
import { reportService } from '../services/Api';

export const WeatherReportsHooks = () => {
    const [state, setState] = useState({
        data: [] as ReportData[],
        loading: true,
        error: null as string | null,
    });
    const [editingReport, setEditingReport] = useState<ReportData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchReports = async () => {
        try {
            const data = await reportService.getReports();
            setState(prev => ({ ...prev, data, loading: false }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'An error occurred',
                loading: false,
            }));
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this report?')) return;
        
        try {
            await reportService.deleteReport(id);
            await fetchReports();
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Failed to delete report');
        }
    };

    const handleEdit = (report: ReportData) => {
        setEditingReport(report);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingReport) return;

        setIsSubmitting(true);
        try {
            const { id, ...formData } = editingReport;
            await reportService.updateReport(id, formData);
            setEditingReport(null);
            await fetchReports();
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Failed to update report');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!editingReport) return;
        
        const { name, value } = e.target;
        setEditingReport(prev => ({
            ...prev!,
            [name]: name === 'temperature' ? Number(value) : value
        }));
    };

    return {
        state,
        editingReport,
        isSubmitting,
        fetchReports,
        handleDelete,
        handleEdit,
        handleUpdate,
        handleEditChange,
        setEditingReport
    };
};