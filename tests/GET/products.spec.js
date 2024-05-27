// @ts-check
const { test, expect } = require('@playwright/test');

test.use({
  baseURL: 'https://api.test.my.flowpay.io',
  extraHTTPHeaders: {
    'Accept': 'application/json',
    'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlY5cGo1N21jWE1UVmdWdHh0M2VnNSJ9.eyJodHRwczovL2FwaS50ZXN0LnBhcnRuZXIuZmxvd3BheS5pby9wYXJ0bmVyX2NvZGUiOiJTaG9wdGV0IiwiaXNzIjoiaHR0cHM6Ly9mbG93cGF5LXRlc3QuZXUuYXV0aDAuY29tLyIsInN1YiI6IlFFNFZLbUVTa1dWU1lRbERWT3hTMWNlVEt4UTVzQldaQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2FwaS50ZXN0LnBhcnRuZXIuZmxvd3BheS5pbyIsImlhdCI6MTcxNjI4NzY3MSwiZXhwIjoxNzE2Mzc0MDcxLCJzY29wZSI6ImFwaV9wYXJ0bmVyIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiUUU0VkttRVNrV1ZTWVFsRFZPeFMxY2VUS3hRNXNCV1oiLCJwZXJtaXNzaW9ucyI6WyJhcGlfcGFydG5lciJdfQ.Yli_ueDx8dZoNTnZwh4zlXvV0GBMgsTHnf70hSMCrcXHz3ulOjFWnPZfqz-DIZC-txHsrl-dzU5mzosNHZ5ICw9sXZ4PYsKpHyBxsjUze0QL7vMa-jw-7d5115P84dB_uiCrCbzIywfsSv1A8S2bUrew9gljsuyBnQWeIbcfQJf-zWTqEgE0bkJcxJoQf9JPCw3gYCKxawR3Bs12f_uuspJNzuMxSEsm1E1AOmpUbHUGWIUaWTOdlEqaDdXIofxdIdmejTEaHXlZAwwxlJAGwaGEnRtrdr3m_KnNEtKzhkrFsC40ySYaPuDZ6btimY9ubAMVqjWz4Fz1cucej1M0Ug'
  }
})

test('GET the /products catalogue', async ({ request }) => {
  const products = await request.get('/partner-api/v1/products')
  expect(products.ok()).toBeTruthy(); // expect 200 OK

  let response = await products.json()

  expect(response).toHaveLength(4); // 4 products
  expect(response[0]).toEqual(expect.objectContaining({
    type: 'M1',
    countries: ["CZ", "SK"],
    currencies: ["CZK", "EUR"],
    installmentCount: 1,
    prolongationEnabled: true,
    postponeEnabled: false,
    maxPostponeLength: 0,
    maxProlongationLength: 2,
    interestRateMultiplier: 1,
    postponeFeeMultiplier: 0,
    prolongationFeeMultiplier: 1,
    baloon: true
  }))
});