'use client';

import React, { useState } from 'react'
import { Button, Callout, TextArea, TextField, ThemePanel } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

// interface IssueForm {
//     title: String
//     description: String
// }
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setError('An unexpected error occurred.');
        }
    });

    return (

        <div className='max-w-xl' onSubmit={onSubmit}>
            {error && (<Callout.Root color="red" className='mb-5'>
                <Callout.Icon>
                    <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>)}

            <form className='space-y-3'>

                <TextField.Root placeholder="Title" {...register('title')} />
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>

                <TextArea placeholder="Description" {...register('description')} />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                
                {/* <ThemePanel/> */}
                <Button disabled={isSubmitting}>Submit new issue{isSubmitting && <Spinner />}</Button>
            </form>
        </div>

    )
}

export default NewIssuePage