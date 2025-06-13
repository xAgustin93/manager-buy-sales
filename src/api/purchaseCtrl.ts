import { PurchaseModel } from "@/models";
import { ENV } from "@/utils";

async function getAll(
  hiddeNoStock?: boolean | undefined
): Promise<PurchaseModel[]> {
  const url = `${ENV.API_URL}/purchases?hiddeNoStock=${hiddeNoStock}`;
  const response = await fetch(url);

  if (response.status !== 200) throw response;

  return await response.json();
}

async function remove(purchaseId: string): Promise<void> {
  const url = `${ENV.API_URL}/purchases/${purchaseId}`;
  const params = {
    method: "DELETE",
  };
  const response = await fetch(url, params);

  if (response.status !== 200) throw response;
}

async function create(data: any): Promise<PurchaseModel> {
  const url = `${ENV.API_URL}/purchases`;
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

async function update(purchaseId: string, data: any): Promise<PurchaseModel> {
  const url = `${ENV.API_URL}/purchases/${purchaseId}`;
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

export const purchasesCtrl = {
  getAll,
  remove,
  create,
  update,
};
