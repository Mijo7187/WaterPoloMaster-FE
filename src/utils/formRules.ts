import type { RuleRender } from "antd/es/form";

type FieldName = string | number | (string | number)[];

export const REQUIRED_FIELD_RULE = (required: boolean) => ({
  required: required,
  message: `Obavezno polje`,
});

export const EMAIL_FIELD_RULE = {
  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: `Neispravna email adresa`,
};

// Validator koji sprečava da dva polja imaju istu vrednost
// (npr. domaćin i gost ne smeju biti isti klub).
export const DIFFERENT_FROM_FIELD_RULE = (
  otherFieldName: FieldName,
  message = "Ne sme biti isto",
): RuleRender => {
  return ({ getFieldValue }) => ({
    validator(_, value: unknown) {
      const otherValue: unknown = getFieldValue(otherFieldName);
      if (value == null || otherValue == null || value !== otherValue) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(message));
    },
  });
};
