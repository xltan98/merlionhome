package com.nus.iss.miniprojectbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PredictionPayload {

    Integer year;
    Integer townCode;
    Integer flatTypeCode;
    Integer storeyRangeCode;
    Integer floorAreaSqm;
    Integer flatModelCode;
    Integer remainingLeaseYear;
    

    
}
