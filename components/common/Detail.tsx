const Detail = ({
  label,
  horizontal = true,
  children,
}: {
  label: string;
  horizontal?: boolean;
  children: React.ReactNode;
}) => (
  <div
    className={`flex ${
      horizontal ? "items-center" : "flex-col items-start mb-1"
    }`}
  >
    <div className="flex mr-2 text-gray-600">
      <div>{label}</div>
      <div>:</div>
    </div>
    <div>{children}</div>
  </div>
);

export default Detail;
