export const REQUIRED_FIELD_RULE = (required: boolean) => ({
  required: required,
  message: `Obavezno polje`,
});

export const EMAIL_FIELD_RULE = {
  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: `Neispravna email adresa`,
};
