export type Result<T> =
  | {
      status: "init";
    }
  | {
      status: "success";
      data: T;
    }
  | {
      status: "error";
      errorMessage: string;
    }
  | {
      status: "loading";
    };
