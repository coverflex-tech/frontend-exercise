defmodule BackendWeb.UsersController do
  use BackendWeb, :controller

  alias Backend.Services.Users

  def show(conn, %{"id" => id}) do
    case Users.find(id) do
      {:ok, user} -> json(conn, %{user: user})
      _ -> put_status(conn, 404) |> json(%{error: :not_found})
    end
  end
end
