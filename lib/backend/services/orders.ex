defmodule Backend.Services.Orders do
  alias Ecto.Multi
  alias Backend.Repo
  alias Backend.Models.{Order, User}
  alias Backend.Services.{Products, Users}

  def create(%{items: items, user_id: user_id}) do
    with {:ok, user} <- Users.find(user_id),
         {:ok, products} <- Products.catalog() do

      order_products = Enum.filter(products, &(&1.id in items))
      total = Enum.reduce(order_products, 0, &(&2 + &1.price))
      updated_balance = user.data.balance - total

      cond do
        length(order_products) == 0 ->
          {:error, :products_not_found}

        overlapping_products?(user.data.product_ids, items) ->
          {:error, :products_already_purchased}

        updated_balance < 0 ->
          {:error, :insuficient_balance}

        true ->
          order_params = %{user_id: user_id, total: total, items: order_products}
          user_params = %{balance: updated_balance, product_ids: user.data.product_ids ++ items}

          Multi.new()
          |> Multi.insert(:order, Order.changeset(%Order{order_id: UUID.uuid4()}, %{data: order_params}))
          |> Multi.update(:user, User.changeset(%User{user_id: user_id}, %{data: user_params}))
          |> Repo.transaction()
          |> case do
            {:ok, %{order: order}} -> {:ok, order}
            err -> err
          end
      end
    else
      err -> err
    end
  end

  defp overlapping_products?(list, new_list) do
    Enum.any?(list, fn x -> Enum.member?(new_list, x) end)
  end
end
