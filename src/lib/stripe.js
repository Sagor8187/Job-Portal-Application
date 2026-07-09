import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const  PLAN_PRICE_ID ={
    'seeker_pro':"price_1TrFLwRsZgEM4plwVuGsTUBf",
    'seeker_premium':'price_1TrGNBRsZgEM4plwFmPqFKIU',
    'recruiter_growth':'price_1TrGOHRsZgEM4plwiHQEFP2y',
    'recruiter_enterprise':'price_1TrGPmRsZgEM4plwOnUEOpMh'
}