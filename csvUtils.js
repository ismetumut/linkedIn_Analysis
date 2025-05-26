import { parse } from 'csv-parse/sync';

export function parseConnectionsCSV(buffer) {
  const text = Buffer.from(buffer).toString('utf-8');
  return parse(text, { columns: true, skip_empty_lines: true });
}

export function diffConnections(oldList, newList) {
  // Use email as unique key
  const oldSet = new Set(oldList.map(x => x.email));
  const newSet = new Set(newList.map(x => x.email));

  const added = newList.filter(x => !oldSet.has(x.email));
  const removed = oldList.filter(x => !newSet.has(x.email));

  return { added, removed };
}

export function csvFromList(list) {
  if (list.length === 0) return '';
  const headers = Object.keys(list[0]);
  return [headers.join(','), ...list.map(row => headers.map(h => row[h]).join(','))].join('\n');
}
