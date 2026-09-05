export default function StatCard({ icon: Icon, label, value, tone = 'default' }) {
  const toneClasses = {
    default: 'text-[var(--color-brand)] bg-[var(--color-brand)]/10',
    brass: 'text-[var(--color-brass)] bg-[var(--color-brass)]/15',
    danger: 'text-[var(--color-danger)] bg-[var(--color-danger)]/10',
  };
  return (
    <div className="bg-surface border border-themed rounded-xl p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${toneClasses[tone]}`}>
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-secondary truncate">{label}</p>
        <p className="font-display font-bold text-xl text-primary">{value}</p>
      </div>
    </div>
  );
}
