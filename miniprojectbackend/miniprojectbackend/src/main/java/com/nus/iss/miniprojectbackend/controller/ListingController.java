package com.nus.iss.miniprojectbackend.controller;

import java.io.IOException;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nus.iss.miniprojectbackend.models.Listing;
import com.nus.iss.miniprojectbackend.models.ListingAppointment;
import com.nus.iss.miniprojectbackend.repositories.ListingRepository;
import com.nus.iss.miniprojectbackend.services.ListingService;
import com.nus.iss.miniprojectbackend.utils.ControllerUtil;
import com.nus.iss.miniprojectbackend.utils.ListingUtil;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObjectBuilder;


@RestController
@RequestMapping("/api/listing")
public class ListingController {

    @Autowired
    ListingService lSvc;

    @Autowired
    ListingRepository lRepo;

    @GetMapping(path="/search")
    public ResponseEntity<String>getSearchedListings(@RequestParam String searchword){
       List<Document> dList= lRepo.getSearchedListings(searchword);
        JsonArrayBuilder ja = Json.createArrayBuilder();
       List<Listing> llist= new ArrayList<>();
       for(Document d :dList){
        llist.add(ListingUtil.toListing(d));
       }

       for(Listing l:llist){
        ja.add(ListingUtil.toJson(l));
       }

        return ControllerUtil.ok(ja.build().toString());
       
    }

     @PostMapping(path="/upload",consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> upload(@RequestPart String payload,@RequestPart MultipartFile[] imgFile) throws IOException{
     String uploadId= lSvc.upload(payload, imgFile);

     return ControllerUtil.ok(Json.createObjectBuilder().add("uploadId",uploadId).build().toString());
    
    }

    @GetMapping(path="/show")
    public ResponseEntity<String>getAllListings(@RequestParam Integer limit,@RequestParam Integer offset){
       List<Document> dList= lRepo.getAllListings(offset, limit);
        JsonArrayBuilder ja = Json.createArrayBuilder();
       List<Listing> llist= new ArrayList<>();
       for(Document d :dList){
        llist.add(ListingUtil.toListing(d));
       }

       for(Listing l:llist){
        ja.add(ListingUtil.toJson(l));
       }

        return ControllerUtil.ok(ja.build().toString());
       
    }

    @GetMapping(path="/show/{uploadId}")
    public ResponseEntity<String>getListingById(@PathVariable String uploadId){
        Document d=lRepo.getListingById(uploadId);
        Listing l=ListingUtil.toListing(d);
        
        return ControllerUtil.ok(ListingUtil.toJson(l));

    }

    @PostMapping(path="/appointment")
    public ResponseEntity<String>bookAppointment(@RequestBody String payload){

        Integer appointmentId=lSvc.insertListingAppointment(payload);
        JsonObjectBuilder jo= Json.createObjectBuilder().add("appointmentId",appointmentId);

        return ControllerUtil.ok(jo.build().toString());
    }

    @GetMapping(path="/appointmentagent/{agentId}")
    public ResponseEntity<String>getAgentAppointment(@PathVariable String agentId){
        List<ListingAppointment>lal=lRepo.retrieveListingAppointmentAgent(agentId);

        JsonArrayBuilder ja = Json.createArrayBuilder();

        for(ListingAppointment la :lal){
            ja.add(ListingUtil.userAppToJson(la));
            
        }

        return ControllerUtil.ok(ja.build().toString());

    }

     @DeleteMapping(path="/deleteappointment/{appointmentId}")
    public ResponseEntity<String>deleteGoal(@PathVariable Integer appointmentId){

        lRepo.deleteAppointmentById(appointmentId);

        return ControllerUtil.ok(Json.createObjectBuilder().add("deletedId",appointmentId));
    }

    @GetMapping(path="/appointment/{customerId}")
    public ResponseEntity<String>getCustomerAppointment(@PathVariable String customerId){
        List<ListingAppointment>lal=lRepo.retrieveListingAppointment(customerId);

        JsonArrayBuilder ja = Json.createArrayBuilder();

        for(ListingAppointment la :lal){
            ja.add(ListingUtil.userAppToJson(la));
            
        }

        return ControllerUtil.ok(ja.build().toString());

    }

     @GetMapping(path="/getlisting/{agentId}")
    public ResponseEntity<String>getListingByagentId(@PathVariable String agentId){
        List<Document> dl=lRepo.getListingByAgentId(agentId);
        JsonArrayBuilder ja = Json.createArrayBuilder();
        for(Document d:dl){
        Listing l=ListingUtil.toListing(d);
        ja.add(ListingUtil.toJson(l));
        }
        return ControllerUtil.ok(ja.build().toString());

    }

    @DeleteMapping(path="/deletelisting/{uploadId}")
    public ResponseEntity<String>deleteListingByuploadId(@PathVariable String uploadId){

        lRepo.deleteListingById(uploadId);

        JsonObjectBuilder jo= Json.createObjectBuilder().add("deleted",uploadId);

        return ControllerUtil.ok(jo.build().toString());
    }

    @PutMapping(path="/updateappointment/{appointmentId}")
    public ResponseEntity<String>updateStatusByAppointmentId(@PathVariable Integer appointmentId,@RequestParam String newStatus){

        lRepo.updateAppointmentStatus(appointmentId, newStatus);

        JsonObjectBuilder jo= Json.createObjectBuilder().add("updated",appointmentId);

        return ControllerUtil.ok(jo.build().toString());
    }


    

}
