import Link from "next/link";

export default function NavBar() {
  return (
    <header className="bg-card sticky top-0 z-10 shadow-sm">
      <div className="max-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link href="" className="text-primary text-2xl font-bold">
          bugbook
        </Link>
      </div>
    </header>
  );
}
