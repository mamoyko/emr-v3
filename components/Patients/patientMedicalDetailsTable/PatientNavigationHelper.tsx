interface FNtransformObjectToArrayProps {
  toTransformData: {
    [key: string]: {
      value: string;
      title: string;
    };
  };
}

export const FNtransformObjectToArray = ({
  toTransformData,
}: FNtransformObjectToArrayProps) => {
  const objectToArray = (data: any) => {
    return Object.values(data);
  };

  return objectToArray(toTransformData);
};
