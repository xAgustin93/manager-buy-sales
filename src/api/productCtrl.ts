/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENV } from "@/utils";
import { ProductModel } from "@/models";

async function getAll(): Promise<ProductModel[]> {
  const url = `${ENV.API_URL}/products`;
  const response = await fetch(url);

  if (response.status !== 200) throw response;

  return await response.json();
}

async function create(product: any): Promise<ProductModel> {
  const url = `${ENV.API_URL}/products`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  };
  const response = await fetch(url, params);

  if (response.status !== 200) throw response;

  return await response.json();
}

async function update(productId: string, values: any): Promise<void> {
  const url = `${ENV.API_URL}/products/${productId}`;
  const params = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  };

  const response = await fetch(url, params);

  if (response.status !== 200) throw response;

  return await response.json();
}

async function remove(productId: string): Promise<void> {
  const url = `${ENV.API_URL}/products/${productId}`;
  const params = {
    method: "DELETE",
  };
  const response = await fetch(url, params);

  if (response.status !== 200) throw response;
}

export const productCtrl = {
  getAll,
  create,
  update,
  remove,
};
