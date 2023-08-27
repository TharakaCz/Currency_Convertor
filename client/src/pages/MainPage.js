import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MainPage() {
  //state for the form feild
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);

  //Handle submit methord]
  const endpoint = "http://localhost:5000/";
  const passData = async (e) => {
    e.preventDefault();
    const url = `${endpoint}convert`;
    setMessage(true);
    setLoading(true);
    try {
      const respose = await axios.get(url, {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });

      setAmountInTargetCurrency(respose.data);
      setMessage(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  //Get all currencey names
  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const url = `${endpoint}getallcurrencies`;
        const response = await axios.get(url);
        setCurrencyNames(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrencyNames();
  }, []);
  return (
    <div>
      <h1 className="lg:mx-32 text-5xl font-bold text-green-500">
        Convert Your Curruncies Today
      </h1>
      <p className="lg:mx-32 opacity-40 py-6">
        Welcome to "Convert Currencies Today"! this application allows you to
        easily convert currencies based on the latest exchange rates. Whether
        you're planing a trip, managing your finances, or simply curious about
        the value of your money in different currencies, this tool is here to
        help.
      </p>
      <div className="mt-5 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={passData}>
            <div className="mb-4">
              <label
                htmlFor={date}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date :
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                id={date}
                name={date}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={sourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Source Currency :
              </label>
              <input
                onChange={(e) => setSourceCurrency(e.target.value)}
                type="text"
                list="sourceCurrencyList"
                name={sourceCurrency}
                value={sourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
              <datalist id="sourceCurrencyList">
                <option value="">Select source currency</option>
                {/* Default empty option */}
                {Object.keys(currencyNames).map((currency) => (
                  <option className="p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </datalist>
            </div>

            <div className="mb-4">
              <label
                htmlFor={targetCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Target Currency :
              </label>
              <input
                onChange={(e) => setTargetCurrency(e.target.value)}
                type="text"
                list="targetCurrencyList"
                name={targetCurrency}
                value={targetCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
              <datalist id="targetCurrencyList">
                <option>Amount source currency</option>
                {/* Default empty option */}
                {Object.keys(currencyNames).map((currency) => (
                  <option className="p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </datalist>
            </div>

            <div className="mb-4">
              <label
                htmlFor={amountInSourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount Source Currency :
              </label>
              <input
                onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                type="text"
                id={amountInSourceCurrency}
                name={amountInSourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md">
              Get Target Currency
            </button>
          </form>
        </section>
      </div>
      {!loading ? (
        <section className="mt-5 text-center text-xl">
          {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equal to{" "}
          <span className="text-green-500 font-bold">
            {" "}
            {amountInTargetCurrency}
          </span>{" "}
          in {currencyNames[targetCurrency]}
        </section>
      ) : null}
      {!message ? null : (
        <p className="text-center text-xl text-green-500 mt-5">
          Processing ...
        </p>
      )}
    </div>
  );
}
