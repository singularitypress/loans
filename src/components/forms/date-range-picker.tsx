export const DateRangePicker = ({
  startDate,
  endDate,
  onChange,
}: {
  startDate: string;
  endDate: string;
  onChange: ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) => void;
}) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ startDate: e.target.value, endDate });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ startDate, endDate: e.target.value });
  };

  return (
    <div className="text-white">
      <label htmlFor="startDate" className="block text-sm font-medium mb-1">
        Start Date
      </label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={handleStartDateChange}
        className="w-full p-2 border rounded"
      />
      <label htmlFor="endDate" className="block text-sm font-medium mt-3 mb-1">
        End Date
      </label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={handleEndDateChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};
