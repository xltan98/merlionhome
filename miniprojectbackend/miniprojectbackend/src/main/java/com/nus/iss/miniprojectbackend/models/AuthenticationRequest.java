package com.nus.iss.miniprojectbackend.models;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String id;
    private String password;
}
