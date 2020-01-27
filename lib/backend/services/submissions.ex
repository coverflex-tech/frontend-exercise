defmodule Backend.Services.Submissions do
  alias Backend.Repo
  alias Backend.Models.Submission
  alias Backend.Services.ExchangeRates

  use Timex

  def find(id) do
    Repo.get(Submission, id)
    |> case do
      nil -> {:error, :not_found}
      submission -> {:ok, submission}
    end
  end

  def create(params) do
    calculate(params.amount, params.currency, params.date)
    |> case do
      {:ok, result} ->
        %Submission{id: UUID.uuid4()}
        |> Submission.changeset(%{data: result})
        |> Repo.insert()

      err -> err
    end
  end

  def report do
    {:ok, Repo.all(Submission)}
  end

  defp calculate(crypto_amount, currency, date) do
    start_date = Timex.parse!(date, "%Y-%m-%d", :strftime) |> Timex.to_date()
    end_date = Timex.today()

    ExchangeRates.history(start_date, end_date)
    |> case do
      {:ok, rates} ->
        start_rate = List.first(rates) |> elem(1) |> Decimal.new()
        end_rate = List.last(rates) |> elem(1) |> Decimal.new()
        start_dollars = Decimal.mult(Decimal.new(crypto_amount), start_rate)
        end_dollars = Decimal.mult(Decimal.new(crypto_amount), end_rate)
        delta_dollars = Decimal.sub(start_dollars, end_dollars)

        {:ok, %{
          start_amount: crypto_amount,
          start_currency: currency,
          start_date: start_date,
          start_rate: start_rate,
          start_dollars: start_dollars,
          end_date: end_date,
          end_rate: end_rate,
          end_dollars: end_dollars,
          delta_dollars: delta_dollars,
        }}

      err -> err
    end
  end
end
