const axios=require('axios')

const getExchangeRate= async (from,to) => {
  try {
    const res= await axios.get(`https://api.fixer.io/latest?base=${from}`);
    const rate= res.data.rates[to];
    if(rate) return rate
    else{throw new Error();}
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}`)
  }

}

const getCountries=async (currencyCode) => {
  try {
    const res= await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return res.data.map((c) => {
        return c.name;
      })
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}`)
  }

}

const convertCurrency=(from,to,amount) => {
  let countries;
  return getCountries(to).then((tcountries) => {
    countries=tcountries
    return getExchangeRate(from,to);
  }).then((rate) => {
    const exchangedAmount=amount*rate;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in: ${countries.join(', ')}`
  })
};
const convertCurrencyAlt = async (from,to,amount) => {
  const countries= await getCountries(to);
  const rate= await getExchangeRate(from,to);
  const eA=amount*rate;
  return `${amount} ${from} is worth ${eA} ${to}. ${to} can be used in: ${countries.join(', ')}`

}



 convertCurrencyAlt('USD','EUR',100).then((c) => {
   console.log(c);
 }).catch((e) => {
   console.log(e.message);
 })
