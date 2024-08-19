import axios from "axios";
import { headers } from "../headers/headers";
import { BACK_END_URL } from "../config";

export async function getData<T>(dataSource: string, queryParam: string) {
  const response = await axios.get<T>(
    `${BACK_END_URL}/${dataSource}/${queryParam}`,
    {
      headers,
    }
  );
  return response;
}
