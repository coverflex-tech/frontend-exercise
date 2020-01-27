defmodule BackendWeb.SubmissionsController do
  use BackendWeb, :controller

  alias Backend.Services.Submissions

  def create(conn, %{"submission" => %{"amount" => amount, "date" => date}}) do
    case Submissions.create(%{amount: amount, currency: "BTC", date: date}) do
      {:ok, submission} -> json(conn, %{submission: submission})
      {:error, error} -> put_status(conn, 400) |> json(%{error: error})
    end
  end

  def show(conn, %{"id" => id}) do
    case Submissions.find(id) do
      {:ok, submission} -> json(conn, %{submission: submission})
      _ -> put_status(conn, 404) |> json(%{error: :not_found})
    end
  end

  def index(conn, _params) do
    case Submissions.report() do
      {:ok, report} -> json(conn, %{report: report})
      {:error, error} -> put_status(conn, 400) |> json(%{error: error})
    end
  end
end
