/**
 * Reflects AttributeType from your Prisma schema.
 */
export type AttributeType = 'STRING' | 'NUMBER' | 'BOOLEAN' | 'SELECT';

export interface AttributeDefinition {
  key: string; // Used for JSONB storage
  label: string; // Human-readable UI label
  type: AttributeType;
  isRequired: boolean;
  options?: string[]; // Only for SELECT type
}

export interface CategoryBlueprint {
  id: string;
  slug: string;
  name: string;
  attributes: AttributeDefinition[]; // Rules for the listing form
}

export interface CreateCategoryDto {
  name: string;
  attributes: Omit<AttributeDefinition, 'id'>[]; // Payload to create a new category
}
