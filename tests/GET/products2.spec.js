// @ts-check
const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const ajv = new Ajv.default();
const productsSchema = require('../schemas/products.json')

const validate = ajv.compile(productsSchema);

test.use({
  baseURL: 'https://api.test.my.flowpay.io',
  extraHTTPHeaders: {
    'Accept': 'application/json',
    'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlY5cGo1N21jWE1UVmdWdHh0M2VnNSJ9.eyJodHRwczovL2FwaS50ZXN0LnBhcnRuZXIuZmxvd3BheS5pby9wYXJ0bmVyX2NvZGUiOiJTaG9wdGV0IiwiaXNzIjoiaHR0cHM6Ly9mbG93cGF5LXRlc3QuZXUuYXV0aDAuY29tLyIsInN1YiI6IlFFNFZLbUVTa1dWU1lRbERWT3hTMWNlVEt4UTVzQldaQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2FwaS50ZXN0LnBhcnRuZXIuZmxvd3BheS5pbyIsImlhdCI6MTcxNjQ0NjU2NSwiZXhwIjoxNzE2NTMyOTY1LCJzY29wZSI6ImFwaV9wYXJ0bmVyIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiUUU0VkttRVNrV1ZTWVFsRFZPeFMxY2VUS3hRNXNCV1oiLCJwZXJtaXNzaW9ucyI6WyJhcGlfcGFydG5lciJdfQ.MmYR1FbU8BoU-630xRJ4lNZN-SXQPss0lwZuceSsS-Z-OuUTUkhzAUhqOqXjpch3VkK3h-WgLvfSNk9a6_OgzYgFnQHN2m6ADNCf9XSFCpPWuPwL2UWbDsI7SKn9_Nh5iGdp3dyXVshf4AkoLdIhga_refdy7olkxHOvGXsLHbM5fIHFHHmNM7xwK2Oivbu2sKC2ZeQ9sdzDduHp-tIv_bqQL-wAVPfU3rDMAH8slnre5LyK0lcMftBAWEt9ipLLbMi0izBJ2j4QPyg4-k0kh1n4Fx0FJormSj44Yhye9YPV_S58tNIEyDV0akEYJYGXrsJdHYrJTUJs6j6Grq1Wzw'
  }
})

test.describe('GET /products', () => {
  test('should return list of products', async ({ request }) => {
    const response = await request.get('/partner-api/v1/products');
    const responseData = await response.json();

    const valid = validate(responseData);
    if (!valid) {
      console.log(validate.errors);
    }

    expect(valid).toBe(true);
  })
})