import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import * as z from "zod";

export const registrationSchema = z.object({
  name: z.string(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  city: z.string(),
  email: z.string().email("Invalid email address"),
  zipCode: z.string(),
  phone: z.string(),
  useGooglePlaces: z.boolean().default(false),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

export const getBaseApiUrl = () => {
  return import.meta.env.VITE_REACT_APP_API;
};

export const baseQuery = () =>
  fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}`,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

export type FormField = {
  name: keyof z.infer<typeof registrationSchema>;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  condition?: (values: z.infer<typeof registrationSchema>) => boolean;
};

export const formFields: FormField[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Full Name",
    required: true,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Address",
    required: true,
  },
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Username",
    required: true,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "City",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    name: "zipCode",
    label: "Zip Code",
    type: "text",
    placeholder: "Zip Code",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Nr",
    type: "tel",
    placeholder: "Phone Nr",
    required: true,
  },
  {
    name: "latitude",
    label: "Latitude",
    type: "text",
    placeholder: "Latitude",
    condition: (values) => values.useGooglePlaces,
  },
  {
    name: "longitude",
    label: "Longitude",
    type: "text",
    placeholder: "Longitude",
    condition: (values) => values.useGooglePlaces,
  },
];
