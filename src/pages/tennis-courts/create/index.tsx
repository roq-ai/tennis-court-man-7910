import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTennisCourt } from 'apiSdk/tennis-courts';
import { Error } from 'components/error';
import { tennisCourtValidationSchema } from 'validationSchema/tennis-courts';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';
import { TennisCourtInterface } from 'interfaces/tennis-court';

function TennisCourtCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TennisCourtInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTennisCourt(values);
      resetForm();
      router.push('/tennis-courts');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TennisCourtInterface>({
    initialValues: {
      name: '',
      availability: false,
      price: 0,
      company_id: (router.query.company_id as string) ?? null,
    },
    validationSchema: tennisCourtValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Tennis Court
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl
            id="availability"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.availability}
          >
            <FormLabel htmlFor="switch-availability">Availability</FormLabel>
            <Switch
              id="switch-availability"
              name="availability"
              onChange={formik.handleChange}
              value={formik.values?.availability ? 1 : 0}
            />
            {formik.errors?.availability && <FormErrorMessage>{formik.errors?.availability}</FormErrorMessage>}
          </FormControl>
          <FormControl id="price" mb="4" isInvalid={!!formik.errors?.price}>
            <FormLabel>Price</FormLabel>
            <NumberInput
              name="price"
              value={formik.values?.price}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('price', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.price && <FormErrorMessage>{formik.errors?.price}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'tennis_court',
  operation: AccessOperationEnum.CREATE,
})(TennisCourtCreatePage);
