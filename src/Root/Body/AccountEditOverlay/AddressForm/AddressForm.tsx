import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons';
import { FormGroup } from '@blueprintjs/core/lib/esm/components/forms/formGroup';
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup';
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './AddressForm.module.scss';

type Inputs = {
  example: string;
  exampleRequired: string;
};

export type FormData = {
  address: string;
};

export const AddressForm: React.FC<{
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  address: string;
  isCancelable: boolean;
}> = ({ onSubmit, onCancel, address, isCancelable }) => {
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          label="Your wallet address"
          labelFor="address"
        >
          <InputGroup
            id="address"
            placeholder="Placeholder text"
            name="address"
            defaultValue={address}
            inputRef={register({ required: true })}
            className={styles.addressInputGroup}
          />
        </FormGroup>

        <Button type="submit">Save</Button>
        {isCancelable && (
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </form>
    </div>
  );
};
