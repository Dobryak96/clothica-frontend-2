export interface GoodPrice { value: number; currency: string; }
export interface GoodFeedback { _id: string; user: string; rating: number; comment: string; createdAt: string; }
export interface Good { _id: string; name: string; category: string; image: string; price: GoodPrice; size: string[]; description: string; prevDescription?: string; characteristics?: Record<string, string>; gender: 'women' | 'man' | 'unisex'; feedbacks: GoodFeedback[]; rating: number; reviewsCount: number; colors?: string[]; }
