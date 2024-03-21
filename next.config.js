/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "tailwindui.com",
      "res.cloudinary.com"
    ]
  },
  env: {
    RAZORPAY_KEY: 'rzp_test_fBTdgFcJFVMwP1',
    RAZORPAY_SECRET: 'gUwPvY0FK0VeuzR47aOvRgxC'
  }
}

module.exports = nextConfig
