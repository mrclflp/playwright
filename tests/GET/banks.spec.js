// @ts-check
const { test, expect } = require('@playwright/test');

test.use({
  baseURL: 'https://api.dev.my.flowpay.io',
  extraHTTPHeaders: {
    'Accept': 'application/json',
    'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBKUXoxNE9HZ1JNdTh2b2VCOW9BaiJ9.eyJodHRwczovL2FwaS5kZXYuYWRtaW4ubXkuZmxvd3BheS5pby9yb2xlcyI6WyJBZG1pbiJdLCJpc3MiOiJodHRwczovL2Zsb3dwYXktZGV2LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMDQ3ODk0Njk2MTYyNDAwMTMxMyIsImF1ZCI6WyJodHRwczovL2FwaS5kZXYuYWRtaW4ubXkuZmxvd3BheS5pbyIsImh0dHBzOi8vZmxvd3BheS1kZXYuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcxNjI4OTk1MywiZXhwIjoxNzE2Mzc2MzUzLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiUGRSeFI5QkNYbWN2UnYxcmlIdUM1UU5RVXhvRVB5dU8iLCJwZXJtaXNzaW9ucyI6WyJhZG1pbiJdfQ.Y7rN1p8asV3nNK-mQPGiIlfZgwxv8PZYzq6AOnOXceZmUF8Afq3cOFrChPO8IEXHY8QqRDOw6GNx7OiQBbtBITrsU7-kG8OZh0_kg_D6EOv4HrCMAzJrxmuJmrwbh7fhGathe4KJOwHWOrc2UUo1Gw4bWeBN_vRPk5e9FdHRqIq6MmSmv5y91bVvRFj1tFCvD-SkxeN_CEQbSKm1wyOxWulbQbW5yKhWl2FpBH10ogqbIU95Y77A97tqTIUFhRPqHWhD4keJk-B9qvlFrFtyS4IwL-CeYp0wHTBQtiQPUUJrgaz9cl4Rul8Sk7rilnITaoCKTLXevUpTMHhD0zd0Ow'
  }
})

test('GET the /banks', async ({ request }) => {
  const response = await request.get('/api-admin/v1/banks')
  expect(response.ok).toBeTruthy();

  let banks = await response.json();

  const banks_sk = (countryCode, psdSupport) => {
    return banks.filter(bank => bank.country === countryCode && bank.psdSupported === psdSupport)
  }

  const SK_banks = banks_sk('SK', true)

  console.log(SK_banks,SK_banks.length)
})