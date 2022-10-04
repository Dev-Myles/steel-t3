import { Level, ProjectType } from '@prisma/client';
import z from 'zod';

const cardLinks = z.object({
  github: z?.string(),
  website: z?.string(),
});

export const createCardSchema = z.object({
  private: z.string(),
  name: z.string().min(2),
  projectType: z.nativeEnum(ProjectType),
  level: z.nativeEnum(Level),
  openSource: z.string(),
  description: z.string(),
  uses: z.string(),
  tags: z.array(z.string()),
  links: cardLinks,
});

export const createCardDataSchema = z.object({
  creatorId: z.string(),
  private: z.boolean(),
  name: z.string().min(2),
  projectType: z.nativeEnum(ProjectType),
  level: z.nativeEnum(Level),
  openSource: z.boolean(),
  description: z.string(),
  uses: z.string(),
  tags: z.array(z.string()),
  links: cardLinks,
});

export const editCardSchema = z.object({
  id: z.string(),
  private: z.string(),
  name: z.string().min(2),
  projectType: z.nativeEnum(ProjectType),
  level: z.nativeEnum(Level),
  openSource: z.string(),
  description: z.string(),
  uses: z.string(),
  tags: z.array(z.string()),
  links: cardLinks,
});

export const editCardDataSchema = z.object({
  id: z.string(),
  private: z.boolean(),
  name: z.string().min(2),
  projectType: z.nativeEnum(ProjectType),
  level: z.nativeEnum(Level),
  openSource: z.boolean(),
  description: z.string(),
  uses: z.string(),
  tags: z.array(z.string()),
  links: cardLinks,
});

export type EditCardDataSchema = z.TypeOf<typeof editCardDataSchema>;
export type EditCardSchema = z.TypeOf<typeof editCardSchema>;

export type CreateCardDataSchema = z.TypeOf<typeof createCardDataSchema>;
export type CreateCardSchema = z.TypeOf<typeof createCardSchema>;
