'use client'
import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import { EmiratesWithLocations } from '@/constants/advertise'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SelectElement from '@/components/forms/elements/select-element'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  emirate: z.string({
    required_error: 'Please select a Emirate!',
  }),
  location: z.string({
    required_error: 'Please select a Location!',
  }),
  building_name: z.string({
    required_error: "Please enter your Building name!"
  }),
  floor: z.string({
    required_error: "Please enter your floor"
  }),
  street: z.string({
    required_error: "Please enter Street number"
  }),
  unit_number: z.string({
    required_error: "Please enter Unit number"
  }),
  landmark: z.string({
    required_error: "Please enter a landmark"
  }),
})

interface Props {
  onSave: (step: string, values: any) => void
}

const LocationDetailsForm = ({ onSave }: Props) => {

  const router = useRouter();

  // @ts-ignore
  const location_details: z.infer<typeof formSchema> = JSON.parse(localStorage.getItem("advertise/location-details"))

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emirate: location_details?.emirate ?? "",
      location: location_details?.location ?? "",
      building_name: location_details?.building_name ?? "",
      floor: location_details?.floor ?? "",
      street: location_details?.street ?? "",
      unit_number: location_details?.unit_number ?? "",
      landmark: location_details?.landmark ?? ""
    }
  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave("location-details", values)
    router.push(`/advertise/amenities-details`)
  }

  const Emirates = Object.keys(EmiratesWithLocations)
  const selectedEmirate = form.watch("emirate")

  let Locations: { label: string, value: string }[] = [];

  if (selectedEmirate) {
    // @ts-ignore
    Locations = EmiratesWithLocations[selectedEmirate]
  }

  // @ts-ignore
  const basicDetails = JSON.parse(localStorage.getItem("advertise/basic-details"))

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-96 space-y-4 p-4 shadow-md"
      >

        <FormField
          name={"emirate"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emirate</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Emirates.map((option, i) => (
                    <SelectItem key={i} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <SelectElement name='location' label='Location' options={Locations} placeholder={!selectedEmirate ? "Please select emirate first" : "Please select a location"} disabled={!selectedEmirate} />

        <InputElement name="building_name" label={'Building / Cluster Name'} />
        <InputElement name="floor" label={'Floor'} />
        <InputElement name="street" label={'Street'} />
        <InputElement name="unit_number" label={'Unit Number'} />
        <InputElement name="landmark" label={'Landmark'} />

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
        <Button type='button' onClick={() => router.push(`/advertise/property-details?categoryType=${basicDetails.category}`)} className="w-full">
          Go Back
        </Button>
      </form>
    </Form>
  )
}

export default LocationDetailsForm