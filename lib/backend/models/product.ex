defmodule Backend.Models.Product do
  @derive Jason.Encoder
  defstruct [:id, :name, :price]
end
