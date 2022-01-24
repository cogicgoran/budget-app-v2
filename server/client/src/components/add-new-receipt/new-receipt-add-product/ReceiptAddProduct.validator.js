import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required"),
  category: Yup.string()
    .required("Required"),
  price: Yup.number()
    .min(0)
    .required("Required")
});

export default validationSchema;