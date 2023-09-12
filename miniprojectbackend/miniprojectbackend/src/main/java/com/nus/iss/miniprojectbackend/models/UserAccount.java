package com.nus.iss.miniprojectbackend.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAccount {
    private String id;
    private String name;
    private String phone;
    private String email;
    private String password;
    private String role;

    @Override
    public String toString() {
        return "ShopAccount [id=" + id + ", name=" + name + ", phone=" + phone + ", email=" + email + ", address="+ ", password=" + password + "]";
    }
}
