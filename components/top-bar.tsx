export function TopBar() {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-2 text-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-gray-600">Fair Medical - Buying and Selling Used Medical Equipment</div>
        <div className="flex gap-6">
          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
            ▸ ENGLISH
          </a>
          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
            ▸ FAQ
          </a>
          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
            ▸ Sitemap
          </a>
        </div>
      </div>
    </div>
  )
}
