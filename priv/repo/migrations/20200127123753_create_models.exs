defmodule Backend.Repo.Migrations.CreateModels do
  use Ecto.Migration

  def change do
    create table(:submissions, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :data, :map
      timestamps()
    end
  end
end
