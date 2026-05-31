import { DefaultOptionType } from "antd/es/select";

export const handleSearchOptions = (
  input: string,
  option: DefaultOptionType | undefined,
) => {
  return ((option?.label ?? "") as string).toLowerCase().includes(
    input.toLowerCase(),
  );
};
