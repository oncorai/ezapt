import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import EmailCapture from '@/components/EmailCapture';
import { getStats } from '@/lib/deals';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const stats = await getStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              EzApt
            </Link>
            <div className="flex gap-6">
              <Link href="/about" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-blue-600">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Find Apartment Deals Worth $1,000s
            <br />
            <span className="text-blue-600">That Others Miss</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover move-in specials and free rent deals on apartments that most renters never find.
            Save thousands on your next lease.
          </p>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {stats.totalDeals}
            </div>
            <div className="text-gray-600">Deals Found</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              ${stats.averageSavings.toLocaleString()}
            </div>
            <div className="text-gray-600">Average Savings</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {stats.citiesCovered}
            </div>
            <div className="text-gray-600">Cities Covered</div>
          </div>
        </div>

        {/* Email Capture - Top */}
        <div className="mb-16">
          <EmailCapture />
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Search Your City</h3>
              <p className="text-gray-600">
                Enter your city to see all available move-in specials in your area.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Compare Deals</h3>
              <p className="text-gray-600">
                See the effective rent and total savings for each deal, all calculated for you.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Save Thousands</h3>
              <p className="text-gray-600">
                Contact the property directly to claim your deal and save big on your lease.
              </p>
            </div>
          </div>
        </div>

        {/* What Are Move-In Specials */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Are Move-In Specials?
          </h2>
          <p className="text-gray-600 mb-4">
            Move-in specials are promotional offers from apartment communities designed to attract new renters.
            Common deals include:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li><strong>Free Weeks/Months:</strong> &quot;8 weeks free&quot; means you don&apos;t pay rent for 8 weeks of your lease</li>
            <li><strong>Reduced Deposits:</strong> Lower or waived security deposits</li>
            <li><strong>Gift Cards:</strong> Move-in bonuses or gift cards</li>
            <li><strong>Waived Fees:</strong> Application or administrative fees waived</li>
          </ul>
          <p className="text-gray-600">
            These deals can save you <strong>$1,000-$5,000+</strong> on your annual rent, but they&apos;re often buried
            in listings or only mentioned in fine print. EzApt finds them for you.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-16">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Why Trust EzApt?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">✓</span>
              <div>
                <strong>Always Free:</strong> We never charge renters to search or view deals
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">✓</span>
              <div>
                <strong>Up-to-Date:</strong> Deals are verified and updated regularly
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">✓</span>
              <div>
                <strong>No Bias:</strong> We show all deals equally, no paid placements
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">✓</span>
              <div>
                <strong>Direct Links:</strong> We link you straight to the official listings
              </div>
            </div>
          </div>
        </div>

        {/* Email Capture - Bottom */}
        <div className="mb-8">
          <EmailCapture />
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-200">
          <p className="mb-2">
            EzApt is not affiliated with Apartments.com. All deals are subject to availability and verification.
          </p>
          <p>
            Always verify deal details directly with the property before making any commitments.
          </p>
          <div className="mt-4">
            <Link href="/about" className="text-blue-600 hover:underline">
              Learn More About EzApt
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
