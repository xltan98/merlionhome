package com.nus.iss.miniprojectbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class PredictionRes {

  Integer floorAreaSqm;
  Integer year;
  String message;
  Double predictionValue;

    
}
