package com.nus.iss.miniprojectbackend.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Listing {
    String uploadId;
    String userId;
    List<String> images;
    String address;
    Integer postalCode;
    Integer storey;
    Integer floorAreaSqm;
    String flatType;
    Integer remainingLeaseYear;
    Double price;
    String description;
    
}
