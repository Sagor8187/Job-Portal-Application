import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { IoCheckmarkCircleSharp } from 'react-icons/io5'
import { HiOutlineMail, HiOutlineReceiptTax } from 'react-icons/hi'
import { FiShoppingBag, FiCopy } from 'react-icons/fi'
import { FaArrowRight, FaCreditCard } from 'react-icons/fa6'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  // Retrieving full session info including line items and payment intent details
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent.payment_method']
  })

  const status = session?.status
  const customerEmail = session?.customer_details?.email
  const orderId = session?.payment_intent?.id || session_id.replace('cs_test_', 'ORD-')
  
  // Dynamic pricing calculation (Stripe amounts are in cents)
  const totalAmount = (session?.amount_total / 100).toFixed(2)
  const currency = session?.currency?.toUpperCase() || 'USD'
  
  // Get last 4 digits of card if available dynamically
  const cardBrand = session?.payment_intent?.payment_method?.card?.brand || 'Card'
  const cardLast4 = session?.payment_intent?.payment_method?.card?.last4 || '••••'

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-50/50 px-4 py-12 antialiased">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-100 p-6 sm:p-8 text-center border border-slate-100/80">
          
          {/* Animated Success Header */}
          <div className="flex justify-center mb-5">
            <div className="p-3 bg-emerald-50 rounded-full animate-pulse">
              <IoCheckmarkCircleSharp className="w-14 h-14 text-emerald-500" />
            </div>
          </div>

          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 mb-2 border border-emerald-100">
            Payment Successful
          </span>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Thank you for your order!
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Your transaction was completed successfully.
          </p>

          {/* Dynamic Invoice / Order Summary Box */}
          <div className="mt-6 bg-slate-50 border border-slate-100 rounded-2xl p-5 text-left space-y-4">
            
            {/* Amount Paid */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Amount Paid</span>
              <span className="text-xl font-bold text-slate-900">
                {currency === 'USD' ? '$' : `${currency} `}{totalAmount}
              </span>
            </div>

            {/* Dynamic Transaction Info */}
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs sm:text-sm">Order ID</span>
                <span className="font-mono text-xs text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 max-w-[180px] truncate">
                  {orderId}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs sm:text-sm">Payment Method</span>
                <span className="text-slate-700 text-xs sm:text-sm flex items-center gap-1.5 capitalize font-medium">
                  <FaCreditCard className="text-slate-400" />
                  {cardBrand} ends in {cardLast4}
                </span>
              </div>
            </div>

          </div>

          {/* Email Notifications Segment */}
          <div className="mt-5 flex items-start gap-3 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl p-4 text-left">
            <HiOutlineMail className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p className="font-medium text-slate-800">Confirmation sent to your inbox</p>
              <p className="text-indigo-600 font-medium break-all mt-0.5">{customerEmail}</p>
            </div>
          </div>

          {/* Dynamic Support/Help Link */}
          <p className="text-xs text-slate-400 my-6">
            Have issues with this payment? Contact{' '}
            <a 
              href="mailto:support@yourdomain.com" 
              className="text-slate-600 underline font-medium hover:text-indigo-600 transition-colors"
            >
              support@yourdomain.com
            </a>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/" 
              className="flex-1 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 active:bg-slate-950 transition-all gap-2 shadow-sm"
            >
              <FiShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
            
            <Link 
              href="/dashboard/orders" 
              className="flex-1 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 active:bg-slate-100 transition-all gap-1.5"
            >
              Track Order
              <FaArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>

        </div>
      </section>
    )
  }

  return null
}