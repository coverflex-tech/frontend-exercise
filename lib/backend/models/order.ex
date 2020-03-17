defmodule Backend.Models.Order do
  use Ecto.Schema

  import Ecto.Changeset

  @primary_key {:order_id, :binary_id, autogenerate: false}

  @derive {Jason.Encoder, only: [:order_id, :data, :inserted_at]}

  schema "orders" do
    embeds_one :data, OrderData, primary_key: false do
      @derive Jason.Encoder
      field :user_id
      field :items, {:array, :map}
      field :total, :integer
    end

    timestamps()
  end

  def changeset(model, params \\ nil) do
    model
    |> cast(params, [])
    |> cast_embed(:data, with: &data_changeset/2)
  end

  def data_changeset(model, params \\ nil) do
    model
    |> cast(params, [:user_id, :items, :total])
  end
end
