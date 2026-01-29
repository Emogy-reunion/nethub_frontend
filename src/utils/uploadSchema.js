import { z } from 'zod';


export const UploadFormSchema = z.object({

	name: z
		.string()
		.min(4, "Name must be at least 4 characters")
		.max(50, "Name must be a most 50 characters")
		.trim(),

	group: z.string().min(1, "Group is required"),

	category: z
  		.string()
  		.min(1, "Category is required"),

	price: z.preprocess(
  			(val) => {
    				if (typeof val === "string") return Number(val);
    				return val;
  			},

		z
  		.number({
    			required_error: "Price is required",
    			invalid_type_error: "Price must be a number",
  		})
  		.min(1, "Price must be at least 1")
  		.max(1_000_000, "Price must not exceed 1,000,000"),
	),

	description: z
  		.string()
  		.min(80, "Description must be at least 80 characters")
  		.max(800, "Description must not exceed 800 characters")
  		.trim(),

	features: z
  		.string()
  		.superRefine((val, ctx) => {
    			const lines = val
      			.split("\n")
      			.map(f => f.trim())
      			.filter(Boolean);

    			if (lines.length === 0) {
      			ctx.addIssue({
        			code: z.ZodIssueCode.custom,
        			message: "Enter at least one feature (one per line)",
      			});
      			return;
    		}

    		for (const feature of lines) {
      			if (feature.length > 100) {
        			ctx.addIssue({
          				code: z.ZodIssueCode.custom,
          				message: "Each feature must not exceed 100 characters",
        			});
        		return;
      		}
    	}
  	}),
	

	stock: z.preprocess(
  		(val) => Number(val),
  		z
    		.number({
      				required_error: "Stock is required",
      				invalid_type_error: "Stock must be a number",
		})
    		.int("Stock must be an integer")
    		.min(1, "Stock must be at least 1")
    		.max(1_000_000, "Stock must not exceed 1,000,000")
	),

	discount: z.preprocess(
  		(val) => Number(val),
  		z
    			.number({
      				required_error: "Discount is required",
      				invalid_type_error: "Discount must be a number",
    			})
    			.min(0, "Discount can't be less than 0")
    			.max(100, "Discount can't exceed 100")
	),

	images: z.preprocess(
  			(val) => {
    				if (val instanceof FileList) return Array.from(val);
    				return val;
  			},

		z
    		.array(z.instanceof(File))
    		.min(3, "At least three images are required")
    		.refine(
      			(files) =>
        			files.every(file =>
          			["image/png", "image/jpeg", "image/webp"].includes(file.type)
        		),
      			{ message: "Only PNG, JPG, JPEG, or WEBP images are allowed" }
    		),
	),
});
