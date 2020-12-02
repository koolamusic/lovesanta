import React from 'react';
import { FormPageHeader } from '@components/layouts';
import { SelectField, InputField } from '@components/fields';
import { MainBox, SubmitButton, MainFlex } from '@components/index';
import { useForm } from 'react-hook-form';
import { IProjectFormProps } from '@lib/interfaces';

export default function View(props: IProjectFormProps): JSX.Element {
    const { register, handleSubmit } = useForm();
    const { useFormStep } = props;

    const fieldOptions = {
        employees: ['1 - 10', '11 - 50', '51 - 100', '100 - 1000', '1000+'],
        countries: ['Ghana', 'Kenya', 'South Africa'],
        stakeholders: ['HP Foundation', 'Ashesi', 'Meltwater'],
    };

    const onSubmit = (data: any) => {
        console.warn(JSON.stringify(data));
        // Triger form submission and switch to the next component
        useFormStep({ __step__: 'indicator', stakeholder: data });
    };
    return (
        <MainFlex flexDirection="column" width="100%">
            <FormPageHeader
                formHeading="Define Project Stakeholders"
                formSubHeading="Define the stakeholders for this project"
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField register={register} label="Budget" placeholder="$ 0" name="name" type="number" />
                <SelectField
                    ref={register}
                    label="Stakeholders"
                    options={fieldOptions.stakeholders}
                    placeholder=""
                    name="type"
                />

                <SelectField
                    ref={register}
                    label="Implementation Location"
                    options={fieldOptions.countries}
                    placeholder="Select Location"
                    name="country"
                />

                {/* === form input subsection  === */}
                <MainBox mt="12">
                    <SubmitButton mt="4" withIcon buttonName="Add Stakeholders" />
                </MainBox>
            </form>
        </MainFlex>
    );
}
