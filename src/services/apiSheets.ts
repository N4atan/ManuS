import * as XLSX from 'xlsx';
import { readServices } from './apiServices';

export const exportToExcel = async () => {
    try {
        const json = await readServices();

        const worksheet = XLSX.utils.json_to_sheet(json);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Chamados");

        // Gera o arquivo e inicia o download no navegador
        XLSX.writeFile(workbook, `manus-${new Date().toISOString()}.xlsx`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};