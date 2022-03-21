import axios, { AxiosInstance } from "axios";
import config from "config";
import { assertDefined } from "../utils/error-utils";
import { paths } from "../../api-schema/auth-service-api-schema";

export class AuthService {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: config.get("AUTH_SERVICE_ENDPOINT"),
    });
  }

  setAccessorKey() {
    assertDefined(process.env.AUTH_SERVICE_CREATOR, "AUTH_SERVICE_CREATOR");
    this.axiosInstance.defaults.headers.common["X-API-Key"] = process.env.AUTH_SERVICE_CREATOR;
  }

  setCreatorKey() {
    assertDefined(process.env.AUTH_SERVICE_CREATOR, "AUTH_SERVICE_CREATOR");
    this.axiosInstance.defaults.headers.common["X-API-Key"] = process.env.AUTH_SERVICE_CREATOR;
  }

  getCustomerList = async () => {
    this.setAccessorKey();
    const { data } = await this.axiosInstance.get<paths["/customers"]["get"]["responses"]["200"]["schema"]>(`/v1/customers`);
    return data;
  };

  createNewClient = async (name: string) => {
    this.setCreatorKey();
    const r = await this.axiosInstance.post<paths["/customers"]["post"]["responses"]["200"]["schema"]>(`/v1/customers`, { name });
    return r.data;
  };

  getAllKeys = async (clientId: string) => {
    this.setAccessorKey();
    const { data } = await this.axiosInstance.get<paths["/customers/keys"]["get"]["responses"]["200"]["schema"]>(
      `/v1/customers/keys`,
      {
        data: { clientId },
      }
    );
    return data;
  };

  generateNewCredentials = async (clientId: string) => {
    this.setCreatorKey();
    const { data } = await this.axiosInstance.post<paths["/customers/keys"]["post"]["responses"]["200"]["schema"]>(
      `/v1/customers/keys`,
      {
        clientId,
      }
    );
    return data;
  };

  revokeCredentials = async (clientID: string, uuid: string) => {
    this.setCreatorKey();
    const { data } = await this.axiosInstance.delete<paths["/customers/keys"]["delete"]["responses"]["200"]["schema"]>(
      `/v1/customers/keys`,
      {
        data: { clientID, uuid },
      }
    );
    return data;
  };
}

export const authService: AuthService = new AuthService();
