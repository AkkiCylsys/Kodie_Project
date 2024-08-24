import axios from "axios";
import { Config } from "../../../Config";

export const getTenantAllDetailsService = async TenantAllDetailsData => {
    try {
      const url = Config.BASE_URL;
      const TenantAllDetails_url = url + 'get_tenant_all_details';
      console.log('TenantAllDetails...', TenantAllDetails_url);
      const response = await axios.post(TenantAllDetails_url, TenantAllDetailsData);
      return response?.data;
    } catch (error) {
      console.log('error in TenantAllDetails url..', error);
    }
  };
  