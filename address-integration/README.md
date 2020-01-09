# address-integration

Use Lob to verify incoming address data. The data will come in the following `JSON` format:
```json
{
  "address_line_1": "41 Elizabeth",
  "address_line_2": "Ste 500",
  "address_city": "New Yrok",
  "address_state": "New York",
  "address_postal_code": "10013",
  "address_country_code": "USA"
}
```
Your code should take a `JSON` object in the above format, send the data to Lob in the format Lob expects, and return the Lob-improved data in the same format as the input.

This repo comes with the HTTP request library `request` pre-installed. Feel free to add any other dependencies as needed.

You'll need to add a `.env` file in the root directory with a `LOB_KEY` environment variable in order to make requests to Lob. Your interviewers will provide you with this (you might need to remind them though).

Lob API documentation: https://lob.com/docs

### Bonus 1
Add a cache so that we don't have to make the same request to Lob more than once.

### Bonus 2
Add tests!
