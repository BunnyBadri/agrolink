"use client";

export default function Layout({ children }) {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen bg-[#f8f9fb] text-gray-900">

      {/* Sidebar */}
      <aside className="w-56 border-r border-gray-200 bg-white flex flex-col">
        <div className="px-6 py-5 text-lg font-semibold tracking-tight">
          AgroLink
        </div>

        <nav className="px-3 space-y-1 text-sm">
          <a href="/dashboard/farmer" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
            Dashboard
          </a>
          <a href="/dashboard/buyer" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
            Marketplace
          </a>
        </nav>

        <button
          onClick={logout}
          className="mt-auto m-3 text-sm px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-100"
        >
          Logout
        </button>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6">
          <span className="text-sm text-gray-500">Dashboard</span>
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </header>

        {/* Content */}
        <main className="p-8 overflow-auto">
          {children}
        </main>

      </div>
    </div>
  );
}