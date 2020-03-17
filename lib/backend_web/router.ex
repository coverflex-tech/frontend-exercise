defmodule BackendWeb.Router do
  use BackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", BackendWeb do
    pipe_through :api

    resources "/products", ProductsController, only: [:index]
    resources "/users", UsersController, only: [:show]
    resources "/orders", OrdersController, only: [:create]
  end
end
