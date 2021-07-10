import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
    },
    field: {
        width: "100%",
    }
}));

export function OrderForm({editOrder = null, onSubmit = console.log, isSubmitting = false }) {
    const { formState: { errors }, handleSubmit, control, register } = useForm({
        defaultValues: editOrder ? {
            firstName:    editOrder.firstName,
            lastName:     editOrder.lastName,
            country:      editOrder.country,
            phone:        editOrder.phone,
            city:         editOrder.city,
            address:      editOrder.address,
            address2:     editOrder.address2,
            email:        editOrder.email,
            deliveryType: editOrder.delivery,
            dontCallMe:   editOrder.dontCallMe,
            comment:      editOrder.comment,
        } : {},
    })

    //console.log(register("test"));

    const classes = useStyles();

    const submit = (values) => {
        // e.preventDefault();
        onSubmit(values);
        // console.log(values);
    };

    return (
        <Box className={classes.root} mx="auto">
            <Paper>
                <Box p={3}>
                    <form onSubmit={handleSubmit(submit)}>
                        <Typography variant="h6">{'Оформление заказа'}</Typography>
                        <Box mt={3}>
                            <Controller
                                name="firstName"
                                control={control}
                                rules={{ required: "This field is required." }}
                                render={({ field }) => (
                                    <TextField
                                        inputProps={field}
                                        className={classes.field}
                                        error={!!errors.firstName}
                                        label="FirstName"
                                        helperText={errors.firstName?.message}
                                        disabled={isSubmitting}
                                    />
                                )}
                            />
                        </Box>
                        <Box mt={1}>
                            <Controller
                                name="lastName"
                                control={control}
                                rules={{ required: "This field is required." }}
                                render={({ field }) => (
                                    <TextField
                                        inputProps={field}
                                        className={classes.field}
                                        error={!!errors.lastName}
                                        label="LastName"

                                        helperText={errors.lastName?.message}
                                        disabled={isSubmitting}
                                    />
                                )}
                            />
                        </Box>
                        <Box mt={1}>
                            <InputLabel htmlFor="select">Country</InputLabel>
                            <Controller
                                name="country"
                                control={control}
                                rules={{ required: "This field is required." }}

                                render={({ field }) => (
                                    <NativeSelect id="select" inputProps={field}>
                                        <option value="Ukraine">Ukraine</option>
                                        <option value="Poland">Poland</option>
                                        <option value="Italy">Italy</option>
                                    </NativeSelect>
                                )}
                            />
                        </Box>
                        <Box mt={1}>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: "This field is required.",
                                    validate: (value) => {
                                        if (!/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value)) {
                                            return "Please provide correct phone number";
                                        }
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        inputProps={field}
                                        className={classes.field}
                                        error={!!errors.phone}
                                        label="Phone"

                                        helperText={errors.phone?.message}
                                        disabled={isSubmitting}
                                    />
                                )}
                            />
                        </Box>

                        <Box mt={1}>
                            <Controller
                                name="city"
                                control={control}
                                rules={{ required: "This field is required."}}
                                render={({ field }) => (
                                    <TextField
                                        inputProps={field}
                                        className={classes.field}
                                        error={!!errors.city}
                                        label="City"

                                        helperText={errors.city?.message}
                                        disabled={isSubmitting}
                                    />
                                )}
                            />
                        </Box>

                        <Box mt={1}>
                            <Controller
                                name="address"
                                control={control}
                                rules={{ required: "This field is required." }}
                                render={({ field }) => (
                                    <TextField
                                        inputProps={field}
                                        className={classes.field}
                                        error={!!errors.address}
                                        label="Address"

                                        helperText={errors.address?.message}
                                        disabled={isSubmitting}
                                    />
                                )}
                            />
                        </Box>

                        <Box mt={1}>
                            <Controller
                                name="address2"
                                control={control}
                                rules={{ }}
                                render={({ field }) => (
                                    <TextField
                                        inputProps={field}
                                        className={classes.field}
                                        error={!!errors.address2}
                                        label="Address2"

                                        helperText={errors.address2?.message}
                                        disabled={isSubmitting}
                                    />
                                )}
                            />
                        </Box>

                        <Box mt={1}>
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: "This field is required.",
                                    validate: (value) => {
                                        if (!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)) {
                                            return "Please provide correct email";
                                        }
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        inputProps={field}
                                        className={classes.field}
                                        error={!!errors.email}
                                        label="Email"

                                        helperText={errors.email?.message}
                                        disabled={isSubmitting}
                                    />
                                )}
                            />
                        </Box>

                        <Box mt={1}>
                            <label htmlFor="delivery">Delivery</label>
                              <Controller
                                      rules={{ required: true }}
                                      control={control}
                                      defaultValue="post"
                                      name="delivery"
                                      render={({ name, value }) => (
                                        <RadioGroup
                                          value={value}

                                        >
                                          <FormControlLabel
                                            value="post"
                                            control={<Radio />}
                                            label="Почтовая служба"
                                          />

                                            <FormControlLabel
                                                value="own"
                                                control={<Radio />}
                                                label="Самовывоз"
                                            />

                                        </RadioGroup>
                                      )}
                                    />



                        </Box>

                        <Box mt={1}>

                            <Controller
                                control={control}
                                name="dontCallMe"
                                render={({
                                             field: { onChange, onBlur, value, name, ref },
                                             fieldState: { invalid, isTouched, isDirty, error },
                                             formState,
                                         }) => (
                                    <Checkbox
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        checked={value}
                                        inputRef={ref}
                                    />
                                )}
                            />
                            <label htmlFor="dontCallMe">Do not call me</label>
                        </Box>

                        <Box mt={1}>


                                    <TextareaAutosize
                                        maxRows={4}
                                        name="comments"
                                        aria-label="maximum height"
                                        placeholder="Maximum 4 rows"
                                        defaultValue=""
                                    />
                                



                        </Box>





                        {
                            /*  multiline
                                rows={5} */
                        }
                        <Box mt={4}>
                            <Button component={Link} disabled={isSubmitting} to="/cart">Отмена</Button>
                            <Button type="submit"  disabled={isSubmitting}>{ "Продолжить"}</Button>
                        </Box>
                    </form>
                </Box>
            </Paper>
        </Box>
    );
}

OrderForm.propTypes = {
    /*
    editPost: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        body: PropTypes.string,
    }),
     */
    onSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
};