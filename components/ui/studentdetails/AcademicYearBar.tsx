"use client";

import AnimatedCard from "../common/AnimatedCard";

export default function AcademicYearBar({
  academicYear,
  isEditing,
  onEdit,
  onCancel,
  onSave,
}: {
  academicYear: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <AnimatedCard className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="text-green-600">📅</span>
        <select
          disabled
          value={academicYear}
          className="border rounded-lg px-3 py-2 text-sm bg-gray-50"
        >
          <option>{academicYear}</option>
        </select>
      </div>

      {!isEditing ? (
        <button
          onClick={onEdit}
          className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm"
        >
          ✏️ Edit Details
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg text-sm bg-gray-500 text-white"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-5 py-2 rounded-lg text-sm bg-green-600 text-white"
          >
            Save Changes
          </button>
        </div>
      )}
    </AnimatedCard>
  );
}
