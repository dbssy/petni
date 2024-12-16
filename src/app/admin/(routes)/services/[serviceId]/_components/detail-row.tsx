interface DetailRowProps {
  label: string;
  value: string | number;
}

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200">
      <span className="font-medium">{label}:</span>
      <strong>{value}</strong>
    </div>
  );
}
