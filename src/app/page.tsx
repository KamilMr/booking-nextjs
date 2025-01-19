"use client";
import Link from "next/link";

const LandingPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full flex justify-end p-4 bg-gray-100">
        <Link href="/login" className="text-blue-600 hover:underline">
          Zaloguj się
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow bg-gray-50 text-center p-8">
        <h1 className="text-3xl font-bold mb-4">ProsteZapisy.pl</h1>
        <p className="text-gray-700 mb-6">
          Szybka i wygodna rezerwacja wizyt u specjalistów. Sprawdź wolne
          terminy i zarezerwuj online.
        </p>
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Umów się teraz
        </Link>
      </section>

      {/* General Info */}
      <section className="bg-white p-8 md:p-16">
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3 text-center">
          <div className="shadow p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Łatwa obsługa</h2>
            <p className="text-gray-600 text-sm">
              Zarezerwuj wizytę w kilku prostych krokach.
            </p>
          </div>
          <div className="shadow p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">
              Automatyczne powiadomienia
            </h2>
            <p className="text-gray-600 text-sm">
              Otrzymuj przypomnienia o zbliżającej się wizycie.
            </p>
          </div>
          <div className="shadow p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Dostępność 24/7</h2>
            <p className="text-gray-600 text-sm">
              Rezerwuj wizyty o dowolnej porze dnia.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 p-6 text-center">
        <p className="text-gray-600 text-sm">
          Kontakt: kontakt@prostezapisy.pl
        </p>
      </footer>
    </main>
  );
};

export default LandingPage;
