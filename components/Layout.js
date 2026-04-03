"use client";

export default function Layout({ children }) {
  const logout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen bg-[#f3f7f3] dark:bg-[#0f172a] text-gray-900 dark:text-white">

      {/* Sidebar */}
      <aside className="w-60 bg-white dark:bg-[#111827] border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="px-6 py-5 text-lg font-semibold">
          🌾 AgroLink
        </div>

        <nav className="px-3 space-y-2 text-sm">
          <a href="/dashboard/farmer" className="block px-3 py-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900">
            Farmer Dashboard
          </a>

          <a href="/dashboard/buyer" className="block px-3 py-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900">
            Marketplace
          </a>
        </nav>

        <button
          onClick={logout}
          className="mt-auto m-3 px-3 py-2 border rounded-lg text-sm hover:bg-red-100 dark:hover:bg-red-900"
        >
          Logout
        </button>
      </aside>

      {/* Content */}
      <div className="flex-1 p-8 overflow-auto">
        {children}
      </div>
    </div>
  );
}