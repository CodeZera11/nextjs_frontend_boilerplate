'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import { advertiseSteps, callPreferences } from '@/constants/advertise'
import RadioGroupElement from '@/components/forms/elements/radio-group-element'
import { useRouter } from 'next/navigation'
import { AdvertiseKeys } from '@/constants/local-storage-keys'

const formSchema = z.object({
    call_preference: z.string({
        required_error: "Please select a call preference!"
    })
})

interface Props {
    onSave: (step: string, values: any) => void
}

const CallPreferenceForm = ({ onSave }: Props) => {

    const router = useRouter();

    const storedValue = localStorage.getItem(AdvertiseKeys.CALL_PREFERENCE);

    const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    const handlePreferenceChange = (value: string) => {
        form.setValue("call_preference", value)
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        onSave(AdvertiseKeys.CALL_PREFERENCE, values)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4 p-4"
            >
                <RadioGroupElement
                    handleChange={handlePreferenceChange}
                    name="call_preference"
                    label={'How would you prefer to handle inquiries from potential leads interested in this advertisement?'}
                    className='items-start gap-4 flex-col'
                    options={callPreferences}
                />

                <Button type="submit" className="w-full">
                    Save and Continue
                </Button>
                <Button type='button' variant="outline" onClick={() => router.push(advertiseSteps.PROJECT_STATUS)} className="w-full">
                    Go Back
                </Button>
            </form>
        </Form>
    )
}

export default CallPreferenceForm