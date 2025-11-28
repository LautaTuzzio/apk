import { Calendar, Code, FileText } from 'lucide-react';
import { Log } from '../lib/supabase';

interface LogCardProps {
  log: Log;
}

export function LogCard({ log }: LogCardProps) {
  const formattedDate = new Date(log.fecha).toLocaleString('es-AR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getActionColor = (code: string) => {
    const lowerCode = code.toLowerCase();
    if (lowerCode.includes('create')) return 'text-green-700 bg-green-50';
    if (lowerCode.includes('update')) return 'text-blue-700 bg-blue-50';
    if (lowerCode.includes('delete')) return 'text-red-700 bg-red-50';
    return 'text-gray-700 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col space-y-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-gray-600">
            <FileText className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">{log.modulo}</span>
          </div>
          <span
            className={`px-2 py-1 rounded-md text-xs font-semibold ${getActionColor(log.Code)}`}
          >
            {log.Code}
          </span>
        </div>

        <p className="text-gray-800 text-sm leading-relaxed">{log.log}</p>

        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
