import { productionOrders, productionStages, staffMembers } from "./production-data";

const apiBaseUrl = process.env.NEXT_PUBLIC_ERP_API_URL ?? "https://api.theduel.in/api/v1";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    }
  });

  if (!response.ok) {
    throw new Error(`ERP API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const productionApi = {
  request,
  async getBoard() {
    return {
      stages: productionStages,
      orders: productionOrders,
      staff: staffMembers
    };
  }
};
