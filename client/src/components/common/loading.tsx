// app/components/Loading.tsx
export default function Loading() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
        <p className="ml-4 text-lg text-gray-700">Loading...</p>
      </div>
    );
  }