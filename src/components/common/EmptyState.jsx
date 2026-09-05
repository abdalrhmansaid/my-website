export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      {Icon && (
        <div className="w-14 h-14 rounded-full bg-surface-2 flex items-center justify-center mb-4">
          <Icon size={26} className="text-secondary" />
        </div>
      )}
      <h3 className="font-display font-bold text-lg text-primary mb-1">{title}</h3>
      {description && <p className="text-sm text-secondary max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
