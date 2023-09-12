package com.nus.iss.miniprojectbackend.exceptions;

public class PaymentException extends Exception {
    
    public PaymentException() {}

    public PaymentException(String msg) {
        super(msg);
    }
}
