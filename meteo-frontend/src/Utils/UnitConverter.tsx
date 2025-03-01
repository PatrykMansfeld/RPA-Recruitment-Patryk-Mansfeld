export const convertToKelvin = (temperature: number, unit: string): number => {
    const normalizedUnit = unit.toLowerCase();
    if (normalizedUnit === 'k' || normalizedUnit === 'kelvin') {
        return temperature;
    } else if (normalizedUnit === 'c' || normalizedUnit === 'celsius') {
        return temperature + 273.15;
    } else if (normalizedUnit === 'f' || normalizedUnit === 'fahrenheit') {
        return (temperature - 32) * 5/9 + 273.15;
    } else {
        throw new Error(`Unsupported unit: ${unit}`);
    }
};