defmodule Backend.Models.Submission do
  use Ecto.Schema

  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: false}

  @derive {Jason.Encoder, only: [:id, :data, :inserted_at]}

  schema "submissions" do
    field :data, :map

    timestamps()
  end

  def changeset(model, params \\ nil) do
    model
    |> cast(params, [:data])
  end
end
