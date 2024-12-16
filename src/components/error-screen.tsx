import { AlertCircle } from 'lucide-react';

interface ErrorScreenProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorScreen({
  message = 'Ocorreu um erro ao carregar os dados.',
  onRetry,
}: ErrorScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-lg text-gray-700 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
