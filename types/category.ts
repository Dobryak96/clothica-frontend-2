export interface Category { _id: string; name: string; image?: string; createdAt: string; updatedAt: string; }
export interface CategoriesResponse { page: number; perPage: number; totalItems: number; totalPages: number; categories: Category[]; }
