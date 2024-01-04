/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { isCreating, createCabinMutate } = useCreateCabin();
  const { isEditing, editCabinMutate } = useEditCabin();
  const isWorking = isEditing || isCreating;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  function onSubmit(data) {
    console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    console.log(image);
    if (isEditSession) {
      editCabinMutate(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabinMutate(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }
  function onError(err) {
    console.log(err);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This Field is Required",
          })}
        />
      </FormRow>

      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Field is Required",
            min: {
              value: 1,
              message: "Capacity Should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This Field is Required",
            min: {
              value: 1,
              message: "Capacity Should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This Field is Required",
            validate: (value) => {
              value <= getValues().regularPrice ||
                "Discount should be less than Regular Price";
            },
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          {...register("description", {
            required: "This Field is Required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This Field is Required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : " Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
