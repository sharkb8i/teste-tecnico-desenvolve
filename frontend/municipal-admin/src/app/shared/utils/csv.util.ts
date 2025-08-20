export function exportToCsv(filename: string, rows: any[]) {
  if (!rows?.length) return;
  
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(',')]
    .concat(rows.map(r => headers.map(h => JSON.stringify(r[h] ?? '')).join(',')))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename; link.click();
  
  URL.revokeObjectURL(url);
}