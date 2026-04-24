export interface Employee {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "employee";
}

export interface Assignment {
  _id: string;
  review?: {
    _id: string;
    title: string;
    description?: string;
  } | null;
  reviewId: {
    _id: string;
    title: string;
    description: string;
  } | null;
  reviewer?: {
    _id: string;
    name: string;
    email: string;
  };
  reviewerId: {
    _id: string;
    name: string;
    email: string;
  };
  reviewee?: {
    _id: string;
    name: string;
    email: string;
  };
  revieweeId: {
    _id: string;
    name: string;
    email: string;
  };
  feedback?: {
    rating?: number;
    comment?: string;
    createdAt?: string;
  } | null;
  status: "pending" | "completed";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Review {
  _id: string;
  title: string;
  description: string;
  createdBy?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}