package com.nus.iss.miniprojectbackend.utils;

import java.io.StringReader;
import java.util.List;

import org.bson.Document;
import org.springframework.stereotype.Component;

import com.nus.iss.miniprojectbackend.models.Listing;
import com.nus.iss.miniprojectbackend.models.ListingAppointment;
import com.nus.iss.miniprojectbackend.models.PredictionPayload;
import com.nus.iss.miniprojectbackend.models.UsersGoal;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

@Component
public class ListingUtil {

    public static Listing toListing(Document d){
        Listing l = new Listing();
        l.setUserId(d.getString("userId"));
        l.setUploadId(d.getString("uploadId"));
        l.setAddress(d.getString("address"));
        l.setFlatType(d.getString("flatType"));
        l.setFloorAreaSqm(d.getInteger("floorAreaSqm"));
        l.setPostalCode(d.getInteger("postalCode"));
        l.setPrice(d.getDouble("price"));
        l.setRemainingLeaseYear(d.getInteger("remainingLeaseYear"));
        l.setStorey(d.getInteger("storey"));
        l.setDescription(d.getString("description"));
        List<String> images = d.getList("images", String.class);
        l.setImages(images);

        return l;
    }

    public static JsonObject toJson(Listing l) {
        JsonObjectBuilder jsonBuilder = Json.createObjectBuilder()
            .add("uploader", l.getUserId())
            .add("uploadId", l.getUploadId())
            .add("address", l.getAddress())
            .add("flatType", l.getFlatType())
            .add("floorAreaSqm", l.getFloorAreaSqm())
            .add("postalCode", l.getPostalCode())
            .add("price", l.getPrice())
            .add("remainingLeaseYear", l.getRemainingLeaseYear())
            .add("storey", l.getStorey())
            .add("description",l.getDescription());

       
        if (l.getImages() != null) {
            jsonBuilder.add("images", Json.createArrayBuilder(l.getImages()));
        }

        return jsonBuilder.build();
    }

    public static JsonObject userAppToJson(ListingAppointment la){
         return Json.createObjectBuilder()
         .add("appointmentId",la.getAppointmentId())
         .add("agentId",la.getAgentId())
        .add("customerId",la.getCustomerId())
        .add("address",la.getAddress())
        .add("date",la.getDate())
        .add("time",la.getTime())
        .add("status",la.getStatus())
        .add("uploadId",la.getUploadId())
        
        .build();

    }

    // public static ListingAppointment toListingAppointment(String payload){
    //     JsonObject pObj=Json.createReader(new StringReader(payload)).readObject();

    //     ListingAppointment la = new ListingAppointment();

    //     la.setAddress(pObj.getString("address"));
    //     la.setAgentId(pObj.getString(""));

    //     ppl.setFlatModelCode(Integer.parseInt(pObj.getString("flatModelCode")));
    //     ppl.setFlatTypeCode(Integer.parseInt(pObj.getString("flatTypeCode")));
    //     ppl.setFloorAreaSqm(pObj.getJsonNumber("floorAreaSqm").intValue());
    //     ppl.setRemainingLeaseYear(pObj.getJsonNumber("remainingLeaseYear").intValue());
    //     ppl.setStoreyRangeCode(Integer.parseInt(pObj.getString("storeyRangeCode")));
    //     ppl.setTownCode(Integer.parseInt(pObj.getString("townCode")));
    //     ppl.setYear(pObj.getJsonNumber("year").intValue());

    //     return ppl;
    // }

    
}
