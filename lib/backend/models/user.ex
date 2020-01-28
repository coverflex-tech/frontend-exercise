defmodule Backend.Models.User do
  use Ecto.Schema

  import Ecto.Changeset

  @primary_key {:user_id, :string, autogenerate: false}

  @derive {Jason.Encoder, only: [:user_id, :data, :inserted_at]}

  schema "users" do
    embeds_one :data, UserData, primary_key: false do
      @derive Jason.Encoder
      field :balance, :integer, default: 500
      field :product_ids, {:array, :string}, default: []
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
    |> cast(params, [:balance, :product_ids])
  end
end
