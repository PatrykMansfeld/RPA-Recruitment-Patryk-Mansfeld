export type TemperatureUnit = 'Celsius' | 'Fahrenheit' | 'Kelvin';

export interface ReportData {
    id: string;
    temperature: number;
    unit: TemperatureUnit;
    city: string;
    date: string;
}

export interface ModifyData {
    temperature: number;
    unit: TemperatureUnit;
    city: string;
    date: string;
}