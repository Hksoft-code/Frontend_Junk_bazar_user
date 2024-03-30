import React from 'react';

const  ErrorMessage = ({ errorMessage })=> {
  return (
    <p className="text-red-500  font-medium text-sm py-1">
      {errorMessage.length ? errorMessage : null}
    </p>
  );
}

export default ErrorMessage;
