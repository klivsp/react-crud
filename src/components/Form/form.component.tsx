import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./form.style.css";
import * as z from "zod";
import { formFields } from "../../common/common-functions";
import { registrationSchema } from "@/common/common-functions";
import Button from "../Button/button.component";

interface FormProps {
  buttons?: any;
  addUsers?: any;
  user?: any;
  editUser?: any;
}

export function RegistrationForm({
  buttons,
  addUsers,
  user,
  editUser,
}: FormProps) {
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      address: "",
      username: "",
      city: "",
      email: "",
      zipCode: "",
      phone: "",
      useGooglePlaces: false,
      latitude: "",
      longitude: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset(user);
    } else {
      form.reset({
        name: "",
        address: "",
        username: "",
        city: "",
        email: "",
        zipCode: "",
        phone: "",
        useGooglePlaces: false,
        latitude: "",
        longitude: "",
      });
    }
  }, [user, form]);

  function onSubmit(data: z.infer<typeof registrationSchema>) {
    if (user) {
      editUser?.(user.id, data); // Update existing user
    } else {
      addUsers?.(data); // Create new user
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="form">
      <div className="formGrid">
        {formFields.map((field: any) => {
          if (field.condition && !field.condition(form.getValues())) {
            return null;
          }

          return (
            <div key={field.name} className="formField">
              <label className="label" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                {...form.register(field.name)}
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className="input"
              />
              {form.formState.errors[
                field.name as keyof typeof form.formState.errors
              ] && (
                <span className="error">
                  {
                    form.formState.errors[
                      field.name as keyof typeof form.formState.errors
                    ]?.message
                  }
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="checkboxContainer">
        <label className="checkboxLabel">
          <input
            type="checkbox"
            {...form.register("useGooglePlaces")}
            className="checkbox"
          />
          <span className="checkboxText">Use Google Location</span>
        </label>
      </div>

      {buttons &&
        buttons.map((button: any, index: number) => (
          <Button
            key={index}
            placeholder={button.name}
            type={button.type}
            className="save-button"
          />
        ))}
    </form>
  );
}
