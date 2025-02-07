export const LoadingDots = () => {
  return (
    <div className="fade-in absolute top-0 left-0 z-50 h-screen w-full animate-in rounded-3xl bg-black bg-opacity-20 duration-1000">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 transform">
        <div className="flex h-screen items-center justify-center space-x-2 dark:invert">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 animate-bounce rounded-full bg-blue-400 bg-opacity-50 [animation-delay:-0.3s]" />
          <div className="h-8 w-8 animate-bounce rounded-full bg-blue-400 bg-opacity-50 [animation-delay:-0.15s]" />
          <div className="h-8 w-8 animate-bounce rounded-full bg-blue-400 bg-opacity-50" />
        </div>
      </div>
    </div>
  );
};
