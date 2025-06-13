/* eslint-disable @typescript-eslint/no-explicit-any */
import { SaleModel } from "@/models";
import { ENV } from "@/utils";

async function getAll(): Promise<SaleModel[]> {
  const url = `${ENV.API_URL}/sales`;
  const response = await fetch(url);

  if (response.status !== 200) throw response;

  return await response.json();
}

async function create(data: any): Promise<SaleModel> {
  const url = `${ENV.API_URL}/sales`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, params);

  if (response.status !== 200) throw response;

  return await response.json();
}

async function update(saleId: string, data: any): Promise<SaleModel> {
  const url = `${ENV.API_URL}/sales/${saleId}`;
  const params = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, params);

  if (response.status !== 200) throw response;

  return await response.json();
}

async function remove(saleId: string): Promise<void> {
  const url = `${ENV.API_URL}/sales/${saleId}`;
  const params = {
    method: "DELETE",
  };

  const response = await fetch(url, params);

  if (response.status !== 200) throw response;
}

export const saleCtrl = {
  getAll,
  create,
  update,
  remove,
};
