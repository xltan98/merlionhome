package com.nus.iss.miniprojectbackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ListingAppointment {
    Integer appointmentId;
    String agentId;
    String customerId;
    String date;
    String time;
    String address;
    String status;
    String uploadId;

    
}
