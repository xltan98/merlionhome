package com.nus.iss.miniprojectbackend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Users {
    private String id;
    private String name;
    private String phone;
    private String email;
    private String role;
    

    @Override
    public String toString() {
        return "Shop [id=" + id + ", name=" + name + ", phone=" + phone + ", email=" + email 
                + "]";
    }

}
