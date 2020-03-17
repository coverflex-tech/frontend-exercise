defmodule Backend.Services.Users do
  alias Backend.Repo
  alias Backend.Models.User

  def find(id) do
    Repo.get(User, id)
    |> case do
      nil ->
        # create new user when id not found
        %User{user_id: id, data: %User.UserData{}}
        |> Repo.insert()

      user -> {:ok, user}
    end
  end
end
