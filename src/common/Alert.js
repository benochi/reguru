import React from "react";

//Alert component for any errors, LoginForm, SignUpForm, ProfileForm -> Alert. 
function Alert({ type = "danger", messages = [] }) {

  return (
      <div className={`alert-${type}`} role="alert">
        {messages.map(error => (
            <p className="AlertMessage" key={error}>
              {error}
            </p>
        ))}
      </div>
  );
}

export default Alert;