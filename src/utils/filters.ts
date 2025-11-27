import { Log } from '../lib/supabase';

export type ModuleFilter = 'all' | 'materias' | 'profesores' | 'alumnos';
export type ActionFilter = 'all' | 'create' | 'update' | 'delete';
export type TimeFilter = 'all' | 'today' | 'week';

export function filterLogs(
  logs: Log[],
  moduleFilter: ModuleFilter,
  actionFilter: ActionFilter,
  timeFilter: TimeFilter
): Log[] {
  return logs.filter((log) => {
    const moduleMatch =
      moduleFilter === 'all' ||
      log.modulo.toLowerCase().includes(moduleFilter.toLowerCase());

    const actionMatch =
      actionFilter === 'all' ||
      log.Code.toLowerCase().includes(actionFilter.toLowerCase());

    const timeMatch = checkTimeFilter(log.fecha, timeFilter);

    return moduleMatch && actionMatch && timeMatch;
  });
}

function checkTimeFilter(fecha: string, filter: TimeFilter): boolean {
  if (filter === 'all') return true;

  const logDate = new Date(fecha);
  const now = new Date();

  if (filter === 'today') {
    return (
      logDate.getDate() === now.getDate() &&
      logDate.getMonth() === now.getMonth() &&
      logDate.getFullYear() === now.getFullYear()
    );
  }

  if (filter === 'week') {
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    return logDate >= weekAgo;
  }

  return true;
}
