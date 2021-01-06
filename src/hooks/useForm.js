import { useState } from 'react';

export const useForm = initialState => {

  const [ data, setData ] = useState(initialState);

  const handlerChange = e => {
    setData({
      ...data,
      [e.target.name] : e.target.value
    });
  }

  return [
    data,
    handlerChange
  ]

}