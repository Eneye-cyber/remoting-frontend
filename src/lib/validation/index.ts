import { Group, Status } from "@/types/types.index";
import * as z from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
      }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters.", }),
    password_confirmation: z.string().min(6, { message: "Password must be at least 6 characters.", }),
  }).superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ['password_confirmation']
      });
    }
  });

  export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters.", }),
  })


// ============================================================
// POST
// ============================================================
export const PostBookValidation = z.object({
  title: z.string().min(2, { message: "Minimum 2 characters." }).max(100, { message: "Maximum title length is 100 characters" }),
  description: z.string().min(80, { message: "Minimum 80 characters." }).max(2200, { message: "Maximum description length is 2200 characters" }),
  published_at: z.string().date(),
  cover_image: z.any().refine((file) => file instanceof File, "Cover image is required"),
  book_file: z.any().optional().refine((file) => file instanceof File || file === undefined, "Book must be a file"),
  status: z.custom<Status>(),
  author_id: z.string().optional(),
});

export const PostAuthorValidation = z.object({
  first_name: z.string().min(2, { message: "Minimum 2 characters." }).max(100, { message: "Maximum title length is 100 characters" }),
  last_name: z.string().min(2, { message: "Minimum 2 characters." }).max(100, { message: "Maximum description length is 100 characters" }),
  slug: z.string(),
  profile_image: z.any().refine((file) => file instanceof File, "File is required"),
  biography: z.string().min(80, { message: "Minimum 2 characters." }).max(2200, { message: "Maximum description length is 2200 characters" }),
});

export const EditBookValidation = z.object({
  title: z.string().min(2, { message: "Minimum 2 characters." }).max(100, { message: "Maximum title length is 100 characters" }),
  description: z.string().min(80, { message: "Minimum 80 characters." }).max(2200, { message: "Maximum description length is 2200 characters" }),
  published_at: z.string().date(),
  status: z.custom<Status>(),
  author_id: z.string().optional(),
});

export const EditAuthorValidation = z.object({
  first_name: z.string().min(2, { message: "Minimum 2 characters." }).max(100, { message: "Maximum title length is 100 characters" }),
  last_name: z.string().min(2, { message: "Minimum 2 characters." }).max(100, { message: "Maximum description length is 100 characters" }),
  biography: z.string().min(80, { message: "Minimum 2 characters." }).max(2200, { message: "Maximum description length is 2200 characters" }),
});

export const UploadFileValidation = z.object({
  group: z.custom<Group>(),
  image: z.any().optional().refine((file) => file instanceof File || file === undefined, "Image must be a file"),
  book: z.any().optional().refine((file) => file instanceof File || file === undefined, "Book must be a file"),
}).refine((data) => data.image instanceof File || data.book instanceof File, {
  message: "Either image or book must be provided",
  path: ["image"], 
});
