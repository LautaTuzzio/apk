import { useState } from 'react';
import { Database, RefreshCw } from 'lucide-react';
import { FilterButton } from './components/FilterButton';
import { LogCard } from './components/LogCard';
import { useLogs } from './hooks/useLogs';
import {
  filterLogs,
  ModuleFilter,
  ActionFilter,
  TimeFilter,
} from './utils/filters';

function App() {
  const { logs, loading, error, refetch } = useLogs();
  const [moduleFilter, setModuleFilter] = useState<ModuleFilter>('all');
  const [actionFilter, setActionFilter] = useState<ActionFilter>('all');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');

  const filteredLogs = filterLogs(logs, moduleFilter, actionFilter, timeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">Registros del Sistema</h1>
            </div>
            <button
              onClick={refetch}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Módulo</h2>
              <div className="flex flex-wrap gap-2">
                <FilterButton
                  label="Todos"
                  active={moduleFilter === 'all'}
                  onClick={() => setModuleFilter('all')}
                />
                <FilterButton
                  label="Materias"
                  active={moduleFilter === 'materias'}
                  onClick={() => setModuleFilter('materias')}
                />
                <FilterButton
                  label="Profesores"
                  active={moduleFilter === 'profesores'}
                  onClick={() => setModuleFilter('profesores')}
                />
                <FilterButton
                  label="Alumnos"
                  active={moduleFilter === 'alumnos'}
                  onClick={() => setModuleFilter('alumnos')}
                />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Acción</h2>
              <div className="flex flex-wrap gap-2">
                <FilterButton
                  label="Todas"
                  active={actionFilter === 'all'}
                  onClick={() => setActionFilter('all')}
                />
                <FilterButton
                  label="Crear"
                  active={actionFilter === 'create'}
                  onClick={() => setActionFilter('create')}
                />
                <FilterButton
                  label="Actualizar"
                  active={actionFilter === 'update'}
                  onClick={() => setActionFilter('update')}
                />
                <FilterButton
                  label="Eliminar"
                  active={actionFilter === 'delete'}
                  onClick={() => setActionFilter('delete')}
                />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Tiempo</h2>
              <div className="flex flex-wrap gap-2">
                <FilterButton
                  label="Todo el tiempo"
                  active={timeFilter === 'all'}
                  onClick={() => setTimeFilter('all')}
                />
                <FilterButton
                  label="Hoy"
                  active={timeFilter === 'today'}
                  onClick={() => setTimeFilter('today')}
                />
                <FilterButton
                  label="Esta semana"
                  active={timeFilter === 'week'}
                  onClick={() => setTimeFilter('week')}
                />
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p className="font-semibold">Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Mostrando <span className="font-semibold">{filteredLogs.length}</span> de{' '}
              <span className="font-semibold">{logs.length}</span> registros
            </div>

            {filteredLogs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                No se encontraron registros que coincidan con los filtros seleccionados
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredLogs.map((log) => (
                  <LogCard key={log.id} log={log} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
