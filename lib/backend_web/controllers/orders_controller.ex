defmodule BackendWeb.OrdersController do
  use BackendWeb, :controller

  alias Backend.Services.Orders

  def create(conn, %{"order" => %{"items" => items, "user_id" => user_id}}) do
    case Orders.create(%{items: items, user_id: user_id}) do
      {:ok, order} -> json(conn, %{order: order})
      {:error, error} -> put_status(conn, 400) |> json(%{error: error})
    end
  end
end
