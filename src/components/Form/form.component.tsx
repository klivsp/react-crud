'use client';

import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { formFields } from '../../common/common-functions';
import { registrationSchema } from '@/common/common-functions';
import Button from '../Button/button.component';
import CustomInput from '../Input/input.component';

interface FormProps {
  buttons?: any;
  addUsers?: any;
  user?: any;
  editUser?: any;
}

export const RegistrationForm = forwardRef(({ buttons, addUsers, user, editUser }: FormProps, ref) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      address: '',
      username: '',
      city: '',
      email: '',
      zipCode: '',
      phone: '',
      useGooglePlaces: false,
      latitude: '',
      longitude: '',
    },
    mode: 'onChange',
  });

  const useGooglePlaces = watch('useGooglePlaces');

  useEffect(() => {
    reset(
      user ?? {
        name: '',
        address: '',
        username: '',
        city: '',
        email: '',
        zipCode: '',
        phone: '',
        useGooglePlaces: false,
        latitude: '',
        longitude: '',
      }
    );
  }, [user]);

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      reset({
        name: '',
        address: '',
        username: '',
        city: '',
        email: '',
        zipCode: '',
        phone: '',
        useGooglePlaces: false,
        latitude: '',
        longitude: '',
      });
    },
  }));

  function onSubmit(data: z.infer<typeof registrationSchema>) {
    if (user) {
      editUser?.(user.id, data);
    } else {
      addUsers?.(data);
    }
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="formGrid">
        {formFields.map((field) => {
          if (field.condition && !field.condition(watch())) return null;

          return (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label={field.label}
                  type={field.type}
                  value={value}
                  onChange={onChange}
                  placeholder={field.placeholder}
                  required={!!field.required}
                />
              )}
            />
          );
        })}

        {/* Checkbox for "Use Google Places" */}
        <div className="checkboxContainer">
          <label className="checkboxLabel">
            <input type="checkbox" {...control.register('useGooglePlaces')} className="checkbox" />
            <span className="checkboxText">Use Google Location</span>
          </label>
        </div>

        {/* Conditional rendering of Latitude and Longitude fields */}
        {useGooglePlaces && (
          <>
            <Controller
              name="latitude"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomInput label="Latitude" type="text" value={value} onChange={onChange} placeholder="Latitude" />
              )}
            />
            <Controller
              name="longitude"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomInput label="Longitude" type="text" value={value} onChange={onChange} placeholder="Longitude" />
              )}
            />
          </>
        )}
      </div>

      {/* Buttons */}
      {buttons?.map((button: any, index: number) => (
        <Button key={index} placeholder={button.text} type={button.type} className="save-button" />
      ))}
    </form>
  );
});
