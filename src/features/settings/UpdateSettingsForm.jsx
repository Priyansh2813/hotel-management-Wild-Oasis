/* eslint-disable no-unused-vars */

import { useEditSetting } from "./useEditSetting";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerRoom,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isEditing, editSetting } = useEditSetting();
  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;

    editSetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerRoom}
          onBlur={(e) => handleUpdate(e, "maxGuestPerRoom")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
