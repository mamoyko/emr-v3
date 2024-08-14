type ResponseHandlerParams = {
  success: boolean;
  successCode?: number;
  successMessage?: string;
  errorCode?: number;
  errorMessage?: string;
  data?: any;
  errorData?: any;
};

export const handleResponse = ({
  success,
  successCode = 200,
  successMessage = "Operation completed successfully.",
  errorCode = 500,
  errorMessage = "An error occurred.",
  data = null,
  errorData = null,
}: ResponseHandlerParams) => {
  if (success) {
    return {
      ok: true,
      code: successCode,
      message: successMessage,
      data,
    };
  } else {
    return {
      ok: false,
      code: errorCode,
      message: errorMessage,
      data: errorData,
    };
  }
};
