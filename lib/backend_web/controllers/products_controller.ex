defmodule BackendWeb.ProductsController do
  use BackendWeb, :controller

  alias Backend.Services.Products

  def index(conn, _params) do
    case Products.catalog() do
      {:ok, products} -> json(conn, %{products: products})
      {:error, error} -> put_status(conn, 400) |> json(%{error: error})
    end
  end
end
