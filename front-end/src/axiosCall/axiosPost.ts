import axios from "axios";
import { headers } from "../headers/headers";
import { BACK_END_URL } from "../config";

export async function postData<Payload>(dataSource: string, payload: Payload) {
  const response = await axios.post(`${BACK_END_URL}/${dataSource}/`, payload, {
    headers,
  });
  return response;
}
