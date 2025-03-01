'use client'

import React from 'react';
import { ModifyData } from '@/types';

interface ReportFormProps {
    formData: ModifyData;
    isSubmitting: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    submitText: string;
}

const ReportForm: React.FC<ReportFormProps> = ({
    formData,
    isSubmitting,
    onSubmit,
    onChange,
    submitText
}) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex flex-col">
                <label className="mb-1 font-medium">Temperature:</label>
                <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={onChange}
                    required
                    className="border rounded p-2"
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-1 font-medium">Unit:</label>
                <select
                    name="unit"
                    value={formData.unit}
                    onChange={onChange}
                    required
                    className="border rounded p-2"
                >
                    <option value="Celsius">Celsius</option>
                    <option value="Fahrenheit">Fahrenheit</option>
                    <option value="Kelvin">Kelvin</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label className="mb-1 font-medium">City:</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={onChange}
                    required
                    className="border rounded p-2"
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-1 font-medium">Date:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={onChange}
                    required
                    className="border rounded p-2"
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
                {isSubmitting ? 'Processing...' : submitText}
            </button>
        </form>
    );
};

export default ReportForm;