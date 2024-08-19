export type Result<T, Data> =
  | {
      status: "init";
    }
  | {
      status: "success";
      data: T extends undefined ? Data : T | Data;
    }
  | {
      status: "error";
      errorMessage: string;
    }
  | {
      status: "loading";
    };
