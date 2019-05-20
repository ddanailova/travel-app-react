import React from 'react';

const isAdminValidation = (!localStorage.getItem('adminRoleId'))?false:localStorage.getItem('isAdmin');

const defaultUserState = { 
    username:localStorage.getItem('username') || null,
    userId:localStorage.getItem('userId') || null,
    isAdmin:isAdminValidation || false,
    updateUser(){}
};

const { Consumer: UserConsumer, Provider: UserProvider} = React.createContext(defaultUserState);

export {UserConsumer, UserProvider, defaultUserState};