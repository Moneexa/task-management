import axios from "axios";
import { headers } from "../headers/headers";
import { BACK_END_URL } from "../config";

export async function putData<Payload>(
  dataSource: string,
  payload: Payload,
  queryParam: string
) {
  const response = await axios.put(
    `${BACK_END_URL}/${dataSource}/${queryParam}`,
    payload,
    {
      headers,
    }
  );
  return response;
}
