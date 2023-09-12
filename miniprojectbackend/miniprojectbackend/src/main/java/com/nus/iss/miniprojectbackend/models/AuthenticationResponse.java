package com.nus.iss.miniprojectbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationResponse {
    
    private String jwt;
    private String UserId;

}
