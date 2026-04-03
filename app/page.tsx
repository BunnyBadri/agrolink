export default function Home() {
  return (
    <div className="h-screen bg-[#f8f9fb] flex items-center justify-center">
      
      <div className="text-center">
        
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">
          AgroLink
        </h1>

        <p className="text-gray-500 mb-8">
          A simple marketplace connecting farmers and buyers
        </p>

        <div className="flex gap-4 justify-center">
          
          <a
            href="/login"
            className="px-5 py-2 rounded-lg bg-black text-white text-sm hover:opacity-90"
          >
            Login
          </a>

          <a
            href="/register"
            className="px-5 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100"
          >
            Register
          </a>

        </div>

      </div>

    </div>
  );
}