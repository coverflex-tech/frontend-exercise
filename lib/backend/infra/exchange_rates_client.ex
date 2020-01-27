defmodule Backend.Infra.ExchangeRatesClient do
  use Tesla

  plug Tesla.Middleware.BaseUrl, "https://api.coindesk.com/v1"
  plug Tesla.Middleware.JSON

  def history(start_date, end_date) do
    get("/bpi/historical/close.json?start=#{start_date}&end=#{end_date}")
  end
end
