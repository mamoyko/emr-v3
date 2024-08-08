interface FNObjectLevelOneToArrayProps {
  toTransformData: {
    [key: string]: {
      value: string;
      title: string;
    };
  };
}

export const FNObjectLevelOneToArray = ({
  toTransformData,
}: FNObjectLevelOneToArrayProps) => {
  const objectToArray = (data: any) => {
    return Object.values(data);
  };

  return objectToArray(toTransformData);
};
