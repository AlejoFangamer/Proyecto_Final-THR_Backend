export function validateSchema(Schema,input) {
  return Schema.safeParse(input);
}

export function validatePartialSchema(Schema,input) {
  return Schema.partial().safeParse(input);
}
