type InfoChipProps = {
  label: string;
  value?: string | null;
};

export function InfoChip({ label, value }: InfoChipProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm">
      <span>{label}</span>
      {value ? <span className="font-bold">{value}</span> : null}
    </div>
  );
}
