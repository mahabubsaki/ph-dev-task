import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Login from '../app/_components/Login';



describe('Login Component testcases', () => {
    it("If props is login then Login text shouldn be in the component", () => {


        render(<Login type='login' />);
        const targetElem = screen.getByText('Login');
        expect(targetElem).toBeInTheDocument();


    });

    it("If props is signup then Login text shouldn't be in the component", () => {

        render(<Login type='signup' />);
        const targetElem = screen.queryByText('Login');
        expect(targetElem).not.toBeInTheDocument();
    });

    it("Button should be disabled if isPending is true", () => {

        render(<Login isPending={true} type='login' />);
        const targetElem = screen.getByRole('button', { name: 'Login' });
        expect(targetElem).toBeDisabled();
    });


    it("Button should be enabled if isPending is false", () => {

        render(<Login isPending={false} type='login' />);
        const targetElem = screen.getByRole('button', { name: 'Login' });
        expect(targetElem).toBeEnabled();
    });

    it("Register button should be visible if type is login", () => {

        render(<Login type='login' />);
        const targetElem = screen.getByText('Register');
        expect(targetElem).toBeInTheDocument();
    });

    it("Register button should not be visible if type is signup", () => {

        render(<Login type='signup' />);
        const targetElem = screen.queryByText('Register');
        expect(targetElem).not.toBeInTheDocument();
    });

    it("Clicking on Register button should change the type to signup", () => {

        const setType = jest.fn();

        render(<Login type='login' setType={setType} />);

        const registerButton = screen.getByRole('button', { name: /register/i });
        fireEvent.click(registerButton);


        expect(setType).toHaveBeenCalledWith('signup');
    });










});
