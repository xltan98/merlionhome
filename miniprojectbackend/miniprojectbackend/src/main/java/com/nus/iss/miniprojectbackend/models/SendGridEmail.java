package com.nus.iss.miniprojectbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SendGridEmail {

    
    public String sender;
    public String recipient;
    
    public String name;

    
}
