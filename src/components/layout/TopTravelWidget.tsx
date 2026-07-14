const partnerParams =
  "%7B%22refParam%22%3A%22tpo%22%2C%22refId%22%3A%220eab29e48cc34db78221192d7-740943%22%2C%22refParam2%22%3A%22tpo_bid%22%2C%22refId2%22%3A%22c15407d4%22%2C%22refx2s6d%22%3A%22localhost%3A3021%2F%22%7D";

export function TopTravelWidget() {
  return (
    <section className="border-b border-gray-100 bg-white" aria-label="Transfer search">
      <form
        action="//kiwitaxi.com/en/product-search"
        target="_blank"
        method="post"
        className="mx-auto grid max-w-6xl gap-3 px-4 py-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto] md:items-end md:px-6"
      >
        <input type="hidden" name="cur" value="USD" />
        <input type="hidden" name="frontend_search[country]" value="" />
        <input
          type="hidden"
          name="frontend_search[partner_url_params]"
          value={partnerParams}
        />

        <label className="grid gap-1.5 text-xs font-semibold text-gray-600" htmlFor="meeting-location">
          From
          <input
            id="meeting-location"
            name="frontend_search[placefrom]"
            className="h-11 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            maxLength={128}
            placeholder="City, airport or train station..."
            autoComplete="off"
          />
        </label>

        <div className="hidden h-11 items-center text-gray-400 md:flex" aria-hidden="true">
          &lt;-&gt;
        </div>

        <label className="grid gap-1.5 text-xs font-semibold text-gray-600" htmlFor="destination-location">
          To
          <input
            id="destination-location"
            name="frontend_search[placeto]"
            className="h-11 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            maxLength={128}
            placeholder="City, airport or train station..."
            autoComplete="off"
          />
        </label>

        <button
          className="h-11 rounded-md bg-red-600 px-5 text-sm font-bold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
          type="submit"
        >
          Find Transfer
        </button>
      </form>
    </section>
  );
}
