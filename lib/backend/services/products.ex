defmodule Backend.Services.Products do
  alias Backend.Models.Product

  def catalog do
    {:ok, [
      %Product{
        id: "netflix",
        name: "Netflix",
        price: 40
      },
      %Product{
        id: "spotify",
        name: "Spotify",
        price: 40
      },
      %Product{
        id: "worten",
        name: "Worten 20% Discount",
        price: 20
      },
      %Product{
        id: "tap",
        name: "TAP Airlines 12% Discount",
        price: 60
      },
      %Product{
        id: "health-insurance",
        name: "Health Insurance",
        price: 250
      },
      %Product{
        id: "equipment-insurance",
        name: "Personal Equipment Insurance",
        price: 60
      },
      %Product{
        id: "expensive-product",
        name: "Expensive Product",
        price: 400
      }
    ]}
  end
end
