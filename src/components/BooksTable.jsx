export default function BooksTable({
  books,
  loading,
  canViewCostPrice,
  canEditBooks,
  onCostPriceClick,
  onEditClick,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-4 py-3">
                Title
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-4 py-3">
                Author
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-4 py-3">
                Retail Price
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-4 py-3">
                Stock
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 py-16">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                    <span className="text-sm">Loading books...</span>
                  </div>
                </td>
              </tr>
            ) : books.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-gray-400 py-16 text-sm"
                >
                  No books found.
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr
                  key={book.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {book.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{book.author}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {book.currency} {parseFloat(book.retail_price).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{book.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2 justify-end">
                      {canViewCostPrice && (
                        <button
                          onClick={() => onCostPriceClick(book)}
                          className="text-xs text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-400 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          View cost price
                        </button>
                      )}
                      {canEditBooks && (
                        <button
                          onClick={() => onEditClick(book)}
                          className="text-xs text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
