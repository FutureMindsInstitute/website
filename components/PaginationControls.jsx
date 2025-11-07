import Button from '@/components/ui/Button';

export default function PaginationControls({
  page,
  totalPages,
  limit,
  onChangePage,
  onChangeLimit,
  limits = [5, 10, 25, 50],
}) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onChangePage(1)}
          disabled={!canPrev}
        >
          First
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onChangePage(page - 1)}
          disabled={!canPrev}
        >
          Prev
        </Button>
        <span className="text-sm text-gray-700">
          Page {page} of {Math.max(totalPages || 1, 1)}
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onChangePage(page + 1)}
          disabled={!canNext}
        >
          Next
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onChangePage(totalPages)}
          disabled={!canNext}
        >
          Last
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-700">Items per page</label>
        <select
          value={limit}
          onChange={(e) => onChangeLimit(Number(e.target.value))}
          className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        >
          {limits.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
    </div>
  );
}


