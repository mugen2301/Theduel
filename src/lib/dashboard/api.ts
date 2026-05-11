import {
  artworkApprovals,
  dashboardOrders,
  dashboardUser,
  invoices,
  productionJobs,
  savedDesigns
} from "./mock-data";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://api.theduel.in/api/v1";

export type ApiClientOptions = {
  token?: string;
};

async function request<T>(path: string, options: RequestInit & ApiClientOptions = {}): Promise<T> {
  const { token, headers, ...requestOptions } = options;
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...requestOptions,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const dashboardApi = {
  request,
  async getMe() {
    return dashboardUser;
  },
  async getOrders() {
    return dashboardOrders;
  },
  async getArtworkApprovals() {
    return artworkApprovals;
  },
  async getProductionJobs() {
    return productionJobs;
  },
  async getInvoices() {
    return invoices;
  },
  async getSavedDesigns() {
    return savedDesigns;
  }
};
