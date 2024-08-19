import { getData } from "./axiosGet";
import { postData } from "./axiosPost";
import { putData } from "./axiosPut";
import { Result } from "./axiosTypes";
type Helper<T> =
  | {
      dataSource: string;
    } & (
      | {
          fetchType: "post";
          payload: T;
        }
      | {
          fetchType: "get";
          queryParam: string;
        }
      | {
          fetchType: "put";
          queryParam: string;
          payload: T;
        }
    );
type OptionalGeneric<T = undefined> = T | T[] | undefined;

export async function axiosHelperFunction<T = undefined, Data = undefined>(
  fetchCall: Helper<OptionalGeneric<T>>
): Promise<Result<T, Data>> {
  const { dataSource, fetchType } = fetchCall;
  let response;

  try {
    switch (fetchType) {
      case "get": {
        const { queryParam } = fetchCall;
        response = await getData(dataSource, queryParam);
        break;
      }
      case "post": {
        const payload = fetchCall.payload;
        response = await postData(dataSource, payload);
        break;
      }
      case "put": {
        const { payload, queryParam } = fetchCall;
        response = await putData(dataSource, payload, queryParam);
        break;
      }
      default: {
        throw new Error("Invalid fetch type");
      }
    }

    if (response) {
      return {
        status: "success",
        data: response.data,
      };
    } else {
      return {
        status: "error",
        errorMessage: "No data found",
      };
    }
  } catch (error) {
    return {
      status: "error",
      //@ts-ignore
      errorMessage: error.message,
    };
  }
}
