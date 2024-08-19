type ResponseError = {
  errorData: { message?: string };
};

type ResponseSuccess = {
  successData: any;
};

type ResponseFail = {
  failData: string;
};

type Response = {
  ok: boolean;
  code?: number;
  message?: string;
  data?: any;
};

export const responseError = ({ errorData }: ResponseError): Response => {
  return {
    ok: false,
    code: 500,
    message: `Error: ${errorData.message || "Unknown error"}`,
    data: errorData,
  };
};

export const responseSuccess = ({ successData }: ResponseSuccess): Response => {
  return {
    ok: true,
    code: 200,
    message: "Success.",
    data: successData,
  };
};

export const responseFail = ({ failData }: ResponseFail): Response => {
  return {
    ok: false,
    code: 400,
    message: `${failData} is required.`,
  };
};

export const responseCreate = ({ successData }: ResponseSuccess): Response => {
  return {
    ok: true,
    code: 201,
    message: "Created Successfully.",
    data: successData,
  };
};

export const responseUpdate = ({ successData }: ResponseSuccess): Response => {
  return {
    ok: true,
    code: 204,
    message: "Updated Successfully.",
    data: successData,
  };
};
