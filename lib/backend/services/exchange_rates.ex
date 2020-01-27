defmodule Backend.Services.ExchangeRates do
  def history(start_date, end_date) do
    Backend.Infra.ExchangeRatesClient.history(start_date, end_date)
    |> case do
      {:ok, res} -> {:ok, transform(Jason.decode!(res.body))}
      {:error, err} -> {:error, err}
    end
  end

  defp transform(%{"bpi" => rates}) do
    rates
    |> Enum.sort()
  end
end
