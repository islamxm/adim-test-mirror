import {z} from 'zod';
import { LessonSchema } from '@/entities/lesson/@x/unit';

export const UnitSchema = z.object({
  description: z.string().nullable(),
  explanation: z.string().nullable(),
  icon: z.string().nullable(),
  id: z.number(),
  isFinished: z.boolean(),
  languages: z.array(z.any()),
  lessons: z.array(LessonSchema),
  name: z.string(),
  parent_id: z.number(),
  totalLessons: z.number()
})