package com.nus.iss.miniprojectbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.nus.iss.miniprojectbackend.models.PredictionPayload;
import com.nus.iss.miniprojectbackend.services.UserService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;

@SpringBootApplication
public class MiniprojectbackendApplication implements CommandLineRunner {

    @Autowired
    UserService uSvc;

    public static void main(String[] args) {
        SpringApplication.run(MiniprojectbackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        PredictionPayload ppl = new PredictionPayload();
        ppl.setYear(2023);
        ppl.setFlatModelCode(1);
        ppl.setFlatTypeCode(1);
        ppl.setFloorAreaSqm(80);
        ppl.setRemainingLeaseYear(50);
        ppl.setStoreyRangeCode(1);
        ppl.setTownCode(1);

     
        System.out.print( uSvc.getPrediction(ppl));
    }
}