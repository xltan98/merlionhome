package com.nus.iss.miniprojectbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserSavingTotal {

    String userId;
    Double totalSaving;
    
}
