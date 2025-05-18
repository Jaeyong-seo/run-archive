export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="inline-block rounded-2xl bg-black/30 px-4 py-2 mb-6">
              <span className="text-primary font-medium">Beta</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight">
              Run Archive
              <span className="inline-block ml-2 transition-transform hover:scale-110 duration-200">🏃‍♂️</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-sm mx-auto">
              Transform your Garmin activities into beautiful running memories
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Paste your Garmin activity link..."
                className="w-full max-w-md bg-black border border-gray-700 rounded-xl 
                         px-4 py-3 text-foreground placeholder-gray-500
                         focus:outline-none focus:border-primary focus:ring-1 
                         focus:ring-primary/30 transition-all duration-200"
              />
            </div>
            <button 
              className="w-full bg-primary text-black rounded-full font-semibold 
                       px-6 py-3 transition-all duration-200
                       hover:bg-orange-500 hover:shadow-lg hover:shadow-primary/20 
                       active:transform active:scale-[0.98]"
            >
              Import Activity
            </button>
          </div>

          {/* Footer Section */}
          <div className="text-center space-y-6">
            <p className="text-sm text-gray-500">
              One run at a time, build your running story
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
