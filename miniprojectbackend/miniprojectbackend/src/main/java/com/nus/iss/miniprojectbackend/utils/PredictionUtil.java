package com.nus.iss.miniprojectbackend.utils;

import java.io.StringReader;
import java.time.LocalDate;

import org.springframework.stereotype.Component;

import com.nus.iss.miniprojectbackend.models.PredictionPayload;
import com.nus.iss.miniprojectbackend.models.UserSaving;
import com.nus.iss.miniprojectbackend.models.UserSavingTotal;
import com.nus.iss.miniprojectbackend.models.UsersGoal;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

@Component
public class PredictionUtil {

    public static String toJson(PredictionPayload ppl){
        return Json.createObjectBuilder()
        .add("year",ppl.getYear())
        .add("town_code",ppl.getTownCode())
        .add("flat_type_code",ppl.getFlatTypeCode())
        .add("storey_range_code",ppl.getStoreyRangeCode())
        .add("floor_area_sqm",ppl.getFloorAreaSqm())
        .add("flat_model_code",ppl.getFlatModelCode())
        .add("remaining_lease_year",ppl.getRemainingLeaseYear())
        .build().toString();
    }

    public static PredictionPayload toPayload(String payload){
        JsonObject pObj=Json.createReader(new StringReader(payload)).readObject();

        PredictionPayload ppl = new PredictionPayload();

        ppl.setFlatModelCode(Integer.parseInt(pObj.getString("flatModelCode")));
        ppl.setFlatTypeCode(Integer.parseInt(pObj.getString("flatTypeCode")));
        ppl.setFloorAreaSqm(pObj.getJsonNumber("floorAreaSqm").intValue());
        ppl.setRemainingLeaseYear(pObj.getJsonNumber("remainingLeaseYear").intValue());
        ppl.setStoreyRangeCode(Integer.parseInt(pObj.getString("storeyRangeCode")));
        ppl.setTownCode(Integer.parseInt(pObj.getString("townCode")));
        ppl.setYear(pObj.getJsonNumber("year").intValue());

        return ppl;

    }
    public static UsersGoal toUsersGoal(String payload){
         JsonObject pObj=Json.createReader(new StringReader(payload)).readObject();

        UsersGoal ug= new UsersGoal();
        ug.setUserId(pObj.getString("userId"));
        ug.setFlatModel(pObj.getString("flatModelCode"));
        ug.setFlatType(pObj.getString("flatTypeCode"));
        ug.setFloorAreaSqm(pObj.getJsonNumber("floorAreaSqm").intValue());
        ug.setRemainingLeaseYear(pObj.getJsonNumber("remainingLeaseYear").intValue());
        ug.setStoreyRange(pObj.getString("storeyRangeCode"));
        ug.setTown(pObj.getString("townCode"));
        ug.setYear(pObj.getJsonNumber("year").intValue());
        ug.setPredictedValue(pObj.getJsonNumber("predictedValue").doubleValue());

        return ug;

    }

    public static JsonObject UsersGoalToJson(UsersGoal ug){
         return Json.createObjectBuilder()
         .add("userId",ug.getUserId())
         .add("id",ug.getId())
        .add("year",ug.getYear())
        .add("town",ug.getTown())
        .add("flatType",ug.getFlatType())
        .add("storeyRange",ug.getStoreyRange())
        .add("floorAreaSqm",ug.getFloorAreaSqm())
        .add("flatModel",ug.getFlatModel())
        .add("remainingLeaseYear",ug.getRemainingLeaseYear())
        .add("predictedValue",ug.getPredictedValue())
        .build();

    }
    public static UserSaving stringToUserSaving(String payload){
        JsonObject pObj = Json.createReader(new StringReader(payload)).readObject();
    
        UserSaving us = new UserSaving();
    
        us.setUserId(pObj.getString("userId"));
        us.setSaving(pObj.getJsonNumber("saving").doubleValue());
        us.setSaveDate(LocalDate.now().toString());
        
        return us;
    }

    public static JsonObject totalToJson(UserSavingTotal ust){
        return Json.createObjectBuilder()
        .add("userId",ust.getUserId())
        .add("totalSaving",ust.getTotalSaving())
        .build();

    }

    public static JsonObject savingToJson(UserSaving us){
        return Json.createObjectBuilder()
        .add("userId",us.getUserId())
        .add("saveDate",us.getSaveDate())
        .add("saving",us.getSaving())
        .build();
    }
    



    }

