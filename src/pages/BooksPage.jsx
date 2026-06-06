import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import client from '../api/client'
import CostPriceModal from '../components/CostPriceModal'

export default function BooksPage() {
  const { user, hasPermission, logout } = useAuth()
  const [books, setBooks] = useState([])
  const [meta, setMeta] = useState(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const canViewCostPrice = hasPermission('books.cost_price.view')
  const canEditBooks = hasPermission('books.update')

  const [costPriceBook, setCostPriceBook] = useState(null)

  const fetchBooks = async (p = 1) => {
    setLoading(true)
    setError('')
    try {
      const res = await client.get('/api/books', { params: { page: p, per_page: 15 } })
      setBooks(res.data.data)
      setMeta(res.data.meta)
    } catch (err) {
      setError('Failed to load books. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks(page)
  }, [page])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-900">Books</h1>
          <p className="text-sm text-gray-500">Logged in as {user?.name}</p>
        </div>
        <button
          onClick={logout}
          className="text-sm text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-300 px-3 py-1.5 rounded-lg transition-colors"
        >
          Sign out
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6 flex items-center justify-between">
            {error}
            <button onClick={() => fetchBooks(page)} className="underline ml-4">Retry</button>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-4 py-3">Title</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-4 py-3">Author</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-4 py-3">Retail Price</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-4 py-3">Stock</th>
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
                  <td colSpan={5} className="text-center text-gray-400 py-16 text-sm">
                    No books found.
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{book.title}</td>
                    <td className="px-4 py-3 text-gray-600">{book.author}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {book.currency} {parseFloat(book.retail_price).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{book.stock}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                       {canViewCostPrice && (
  <button
    onClick={() => setCostPriceBook(book)}
    className="text-xs text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-400 px-3 py-1.5 rounded-lg transition-colors"
  >
    View cost price
  </button>
)}
                        {canEditBooks && (
                          <button className="text-xs text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 px-3 py-1.5 rounded-lg transition-colors">
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

        {/* Pagination */}
        {meta && meta.last_page > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Page {meta.current_page} of {meta.last_page} — {meta.total} books
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={meta.current_page === 1}
                className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={meta.current_page === meta.last_page}
                className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

      </div>
      {costPriceBook && (
  <CostPriceModal
    book={costPriceBook}
    onClose={() => setCostPriceBook(null)}
  />
)}
    </div>
  )
}