

const Badge = ({ label, colorClass }) => {
  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold text-white ${colorClass}`}
    >
      {label}
    </span>
  );
}

export default Badge