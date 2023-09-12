package com.nus.iss.miniprojectbackend.services;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import com.nus.iss.miniprojectbackend.models.PredictionPayload;
import com.nus.iss.miniprojectbackend.models.PredictionRes;
import com.nus.iss.miniprojectbackend.utils.PredictionUtil;

import jakarta.json.Json;
import jakarta.json.JsonObject;
@Service
public class UserService {

    //   public PredictionRes getPrediction(PredictionPayload ppl){
    //     String predictionUrl="https://miniprojectapi.up.railway.app/";

    //      RequestEntity<String> req=RequestEntity.post(predictionUrl)
    //     .contentType(MediaType.APPLICATION_JSON)
    //     .accept(MediaType.APPLICATION_JSON)
    //     .body(PredictionUtil.toJson(ppl));

    //     RestTemplate template= new RestTemplate();

    //     ResponseEntity<String> resp= template.exchange(req,String.class);

    //     JsonObject messageObject=Json.createReader(new StringReader(resp.getBody())).readObject();

    //     PredictionRes pr = new PredictionRes();

    //     pr.setFloorAreaSqm(messageObject.getInt("floorAreaSqm"));
    //     pr.setMessage(messageObject.getString("message"));
    //     pr.setPredictionValue(messageObject.getJsonNumber("predictedValue").doubleValue());
    //     pr.setYear(messageObject.getInt("year"));

    //     return pr;


    // }

     public String getPrediction(PredictionPayload ppl){
        String predictionUrl="https://miniprojectapi.up.railway.app/";

         RequestEntity<String> req=RequestEntity.post(predictionUrl)
        .contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.APPLICATION_JSON)
        .body(PredictionUtil.toJson(ppl));

        RestTemplate template= new RestTemplate();

        ResponseEntity<String> resp=null;

        try{
        
        resp= template.exchange(req,String.class);

        JsonObject messageObject=Json.createReader(new StringReader(resp.getBody())).readObject();

        String message = resp.getBody().toString();

        return message;
    
        }catch(Exception e){
            return "Error occurred: " + e.getMessage();
        }


    }
    
}
