package com.nus.iss.miniprojectbackend.services;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nus.iss.miniprojectbackend.models.Listing;
import com.nus.iss.miniprojectbackend.models.ListingAppointment;
import com.nus.iss.miniprojectbackend.repositories.ListingRepository;
import com.nus.iss.miniprojectbackend.repositories.S3Repository;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@Service
public class ListingService {

    @Autowired
    S3Repository sRepo;

    @Autowired
    ListingRepository lRepo;

    public Listing save(String payload,MultipartFile[] imgFile) throws IOException{
       
        List<String>imgList=new ArrayList<>(); 
        for(MultipartFile i:imgFile){
            String mediaType=i.getContentType();
            InputStream is = i.getInputStream();

            String id= sRepo.saveImage(i);
            imgList.add(id);
        }

        JsonObject o=Json.createReader(new StringReader(payload)).readObject();

        Listing l = new Listing();
        l.setAddress(o.getString("address"));
        l.setFlatType(o.getString("flatType"));
        l.setFloorAreaSqm(o.getInt("floorAreaSqm"));
        l.setImages(imgList);
        l.setPostalCode(o.getInt("postalCode"));
        l.setPrice(o.getJsonNumber("price").doubleValue());
        l.setRemainingLeaseYear(o.getInt("remainingLeaseYear"));
        l.setStorey(o.getInt("storey"));
        l.setUploadId(UUID.randomUUID().toString().substring(0,8));
        l.setUserId(o.getString("uploader"));
        l.setDescription(o.getString("description"));



        return l;


    }

    public String upload(String payload,MultipartFile[] imgFile) throws IOException{
        Listing l= save(payload,imgFile);
        String uploadId=lRepo.postUpload(l);

        return uploadId;
    }

    public Integer insertListingAppointment(String payload){
         JsonObject pObj=Json.createReader(new StringReader(payload)).readObject();

        ListingAppointment la = new ListingAppointment();

        la.setAddress(pObj.getString("address"));
        la.setAgentId(pObj.getString("agentId"));
        // la.setAppointmentId(UUID.randomUUID().toString().substring(0, 8));
        la.setCustomerId(pObj.getString("customerId"));
        la.setStatus(pObj.getString("status"));
        la.setDate(pObj.getString("date"));
        la.setTime(pObj.getString("time"));
        la.setUploadId(pObj.getString("uploadId"));

        

        return lRepo.insertUserAppointment(la);

    }

    



    
}
