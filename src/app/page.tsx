import Config from "./components/config";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="text-xl font-bold p-4 bg-gray-100 rounded shadow-md mt-10">
        Riley Super Awesome Config Editor
      </header>
      <main className="flex flex-col items-center sm:items-start flex-grow">
        <Config />
      </main>
      <footer className="text-sm text-gray-500">
        © 2023 Riley Love. All rights reserved.
      </footer>
    </div>
  );
}
