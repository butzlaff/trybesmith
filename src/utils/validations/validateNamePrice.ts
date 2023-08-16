import validateProduct from './schema';

interface KeysObjectToValidate {
  name?: string;
  price?: string;
}

export interface ResponseJoi {
  status: 'INVALID_DATA' | 'FORMAT_NOT_ACCEPTABLE';
  message: string;
} 

const validateDataName = (keysObjectToValidate: KeysObjectToValidate) : ResponseJoi | false => {
  const { error } = validateProduct.validate(keysObjectToValidate);
  if (error && error.details[0].type === 'any.required') {
    return { status: 'INVALID_DATA', message: error.message };
  }
  if (error) {
    return { status: 'FORMAT_NOT_ACCEPTABLE', message: error.message };
  }
  return false;
};

export default validateDataName;