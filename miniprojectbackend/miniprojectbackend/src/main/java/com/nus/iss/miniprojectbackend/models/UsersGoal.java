package com.nus.iss.miniprojectbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UsersGoal {
    Integer id;
    String userId;
    Integer year;
    String town;
    String flatType;
    String storeyRange;
    Integer floorAreaSqm;
    String flatModel;
    Integer remainingLeaseYear;
    Double predictedValue;

    
}
