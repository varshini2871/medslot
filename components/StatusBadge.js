export default function StatusBadge({ status }) {
  const styles = {
    Confirmed: "bg-[#EDF3EF] text-[#315C4C]",
    Completed: "bg-[#EAF2EA] text-[#47765B]",
    Pending: "bg-[#F5F0E5] text-[#967337]",
    Cancelled: "bg-[#F8ECEB] text-[#B94B4B]",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-[11px] font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}