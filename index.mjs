// https://markets.newyorkfed.org/static/docs/markets-api.html#/Reference%20Rates/get_api_rates_secured__ratetype__last__number___format_
const RATE = "sofr";
const RATE_TYPE = "secured";
const RATE_URL = `https://markets.newyorkfed.org/api/rates/${RATE_TYPE}/${RATE}/last/1.json`;

const CACHE_TIME = 3600 * 1000; // 1H

let cachedItem = {};

export const handler = async (event) => {
  try {
    let data;
    // If data is cached, use it
    if (cachedItem.value && cachedItem.expiresOn > Date.now()) {
      data = cachedItem.value;

      // If not, fetch it from newyorkfed
    } else {
      const res = await fetch(RATE_URL);
      if (res.ok) {
        const resData = await res.json();
        data = resData;

        if (!data.refRates[0]) {
          throw "Missing data";
        }

        // Cache the data
        setCachedData(data.refRates[0]);
      } else {
        throw "Unknown error";
      }
    }

    return createResponse(200, data);
  } catch (e) {
    return createResponse(500, e);
  }
};

const createResponse = (statusCode, body) => {
  return { statusCode, body: JSON.stringify(body) };
};

const setCachedData = (val) => {
  cachedItem = {
    expiresOn: Date.now() + CACHE_TIME,
    value: val,
  };
};
