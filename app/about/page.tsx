import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              RentDeals
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-blue-600">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          About RentDeals
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What We Do
          </h2>
          <p className="text-gray-600 mb-4">
            RentDeals helps renters discover apartment move-in specials and deals that they might otherwise miss.
            We aggregate special offers like &quot;8 weeks free&quot; or &quot;2 months free rent&quot; from apartments.com
            and other sources, making it easy to find and compare the best deals in your area.
          </p>
          <p className="text-gray-600">
            Our platform automatically calculates the <strong>effective rent</strong> for each deal, showing you
            exactly how much you&apos;ll save over the course of your lease.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Are Move-In Specials?
          </h2>
          <p className="text-gray-600 mb-4">
            Move-in specials are promotional offers from apartment communities designed to attract new tenants.
            These deals can save you thousands of dollars on your lease. Common types include:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>
              <strong>Free Weeks/Months:</strong> The most common type. If you see &quot;8 weeks free on a 12-month lease,&quot;
              you don&apos;t pay rent for 8 weeks, but the discount is usually spread across all 12 months as a lower monthly rate.
            </li>
            <li>
              <strong>Reduced Deposits:</strong> Lower or completely waived security deposits.
            </li>
            <li>
              <strong>Gift Cards:</strong> Move-in bonuses, gift cards, or other incentives.
            </li>
            <li>
              <strong>Waived Fees:</strong> Application fees, administrative fees, or pet fees waived.
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Do Apartments Offer These Deals?
          </h2>
          <p className="text-gray-600 mb-4">
            Apartment communities offer move-in specials for several reasons:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>To fill vacant units quickly during slower rental seasons</li>
            <li>To compete with other properties in the area</li>
            <li>To attract tenants to newly built or renovated properties</li>
            <li>To reach occupancy targets set by property managers</li>
          </ul>
          <p className="text-gray-600 mt-4">
            These deals are legitimate and can result in significant savings for renters who know where to look for them.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Use RentDeals
          </h2>
          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">1. Search Your City</h3>
              <p>Enter your city name on the homepage to see all available move-in specials.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">2. Filter and Sort</h3>
              <p>
                Use our filters to narrow down by bedrooms and price range. Sort by biggest savings, lowest rent,
                deals ending soon, or newest additions.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">3. Review Deal Details</h3>
              <p>
                Each deal card shows the regular rent, effective rent after the deal, total savings,
                and other important details.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">4. Contact the Property</h3>
              <p>
                Click &quot;View Deal&quot; to go directly to the apartments.com listing. Contact the property
                to verify the deal and schedule a tour.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">5. Sign Up for Alerts</h3>
              <p>
                Subscribe to email alerts to be notified when new deals are added in your area.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Important Disclaimer
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Always verify deals directly with the property.</strong> Deals can change or expire without notice.
            </li>
            <li>
              RentDeals is not affiliated with apartments.com or any apartment community listed on this site.
            </li>
            <li>
              We provide information for convenience only. Always read the lease terms carefully before signing.
            </li>
            <li>
              Deal availability may be subject to credit approval, move-in dates, unit availability, and other terms.
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Is RentDeals free to use?</h3>
              <p className="text-gray-600">
                Yes! RentDeals is completely free for renters. We never charge to search for or view deals.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">How do you calculate effective rent?</h3>
              <p className="text-gray-600">
                We parse the deal description (e.g., &quot;8 weeks free&quot;) and calculate how that discount
                spreads across a 12-month lease. For example, if regular rent is $2,000/month and you get
                8 weeks free, you pay for 10 months instead of 12, giving you an effective monthly rate of
                ~$1,667/month.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Are these deals guaranteed?</h3>
              <p className="text-gray-600">
                No. Deals can change or expire at any time. Always verify the current offer with the property
                before making any commitments.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">How often are deals updated?</h3>
              <p className="text-gray-600">
                We regularly add new deals. Sign up for email alerts to be notified when deals are added in your area.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Can I submit a deal I found?</h3>
              <p className="text-gray-600">
                Not yet, but we&apos;re working on this feature! For now, deals are added manually by our team.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Do you cover my city?</h3>
              <p className="text-gray-600">
                We&apos;re constantly expanding. If we don&apos;t have deals in your city yet, sign up for email alerts
                and we&apos;ll notify you when deals become available.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Start Searching for Deals
          </Link>
        </div>
      </div>
    </div>
  );
}
