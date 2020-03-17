defmodule Backend.Repo.Migrations.CreateModels do
  use Ecto.Migration

  def change do
    create table(:orders, primary_key: false) do
      add :order_id, :uuid, primary_key: true
      add :data, :map
      timestamps()
    end

    create table(:users, primary_key: false) do
      add :user_id, :string, primary_key: true
      add :data, :map
      timestamps()
    end
  end
end
