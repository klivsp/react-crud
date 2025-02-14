import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./form.style.css";
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

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      componentRestrictions: { country: "al" },
    },
    debounce: 300,
  });

  const useGooglePlaces = form.watch("useGooglePlaces");

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        address: user.address.street,
        city: user.address.city,
        zipCode: user.address.zipcode,
        username: user.username,
        email: user.email,
        phone: user.phone,
        useGooglePlaces: user.useGooglePlaces || false,
        latitude: user.address.geo?.lat || "",
        longitude: user.address.geo?.lng || "",
      });
    }
  }, [user, form]);

  async function handleSelect(address: string) {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);

    form.setValue("address", address);
    form.setValue("latitude", lat.toString());
    form.setValue("longitude", lng.toString());
  }

  function onSubmit(data: z.infer<typeof registrationSchema>) {
    if (user) {
      editUser?.(user.id, {
        address: {
          street: data.address,
          city: data.city,
          zipcode: data.zipCode,
          geo: { lat: data.latitude, lng: data.longitude },
        },
        email: data.email,
        name: data.name,
        phone: data.phone,
        username: data.username,
      });
    } else {
      addUsers?.(data);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="form">
      <div className="form-grid">
        {formFields.map((field) => {
          if (field.name === "latitude" || field.name === "longitude") {
            if (!useGooglePlaces) return null;
          }

          if (field.name === "address") {
            return (
              <div key={field.name} className="form-field">
                <label className="label" htmlFor={field.name}>
                  {field.label}
                </label>
                <input
                  {...form.register(field.name)}
                  id={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  className="input"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  disabled={!ready}
                />
                {status === "OK" && (
                  <ul className="suggestions">
                    {data.map((suggestion) => (
                      <li
                        key={suggestion.place_id}
                        onClick={() => handleSelect(suggestion.description)}
                      >
                        {suggestion.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          }

          return (
            <div key={field.name} className="form-field">
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
              {form.formState.errors[field.name] && (
                <span className="error">
                  {form.formState.errors[field.name]?.message}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="checkbox-container">
        <label className="checkbox-label">
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
