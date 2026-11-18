export default function StatCard({
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-lg border border-[#E8EAE5] bg-white p-5">

      <p className="text-xs font-medium text-[#858B85]">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#252B28]">
        {value}
      </h2>

      {description && (
        <p className="mt-2 text-xs text-[#858B85]">
          {description}
        </p>
      )}

    </div>
  );
}