package com.nus.iss.miniprojectbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nus.iss.miniprojectbackend.exceptions.UserException;
import com.nus.iss.miniprojectbackend.models.UserSaving;
import com.nus.iss.miniprojectbackend.models.UserSavingTotal;
import com.nus.iss.miniprojectbackend.models.Users;
import com.nus.iss.miniprojectbackend.models.UsersGoal;
import com.nus.iss.miniprojectbackend.repositories.UserRepository;
import com.nus.iss.miniprojectbackend.services.UserService;
import com.nus.iss.miniprojectbackend.utils.ControllerUtil;
import com.nus.iss.miniprojectbackend.utils.PredictionUtil;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;


@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService uSvc;

    @Autowired
    UserRepository uRepo;

    private ObjectMapper objMapper=new ObjectMapper();

    @PostMapping(path="/predict")
    public ResponseEntity<String> predictionapi(@RequestBody String payload){

        String message =uSvc.getPrediction(PredictionUtil.toPayload(payload)) ;

        return ResponseEntity.ok(message);

    }
   
      @GetMapping(path="/open/{userId}")
    public ResponseEntity<String>getUserDetails(@PathVariable String userId) throws JsonProcessingException{

       try{
        Users u= uRepo.getUserDetails(userId);
        return ControllerUtil.ok(objMapper.writeValueAsString(u));
       }catch(UserException e){
            return ControllerUtil.badRequest("invalid user id");
       }
        
        
    }


    @GetMapping(path="/open/new")
    public ResponseEntity<String> isNewUser(@RequestParam(name="id") String userId){
        return ControllerUtil.ok(Json.createObjectBuilder().add("is_new",!uRepo.isValidUser(userId)));
        
    }

    @PostMapping(path="/settinggoal")
    public ResponseEntity<String> setgoal(@RequestBody String goal){
        UsersGoal g=PredictionUtil.toUsersGoal(goal);
        Integer id=uRepo.insertUserGoal(g);

        return ControllerUtil.ok(Json.createObjectBuilder().add("homeId",id));

    }

    @GetMapping(path="/getgoal/{userId}")
    public ResponseEntity<String>getGoal(@PathVariable String userId){

        JsonArrayBuilder ja=Json.createArrayBuilder();
        List<UsersGoal>ugl=uRepo.findHomeById(userId);

        for(UsersGoal ug:ugl){
            
            ja.add(PredictionUtil.UsersGoalToJson(ug));
        }

        return ControllerUtil.ok(ja.build().toString());


    }

    @DeleteMapping(path="/deletegoal/{homeId}")
    public ResponseEntity<String>deleteGoal(@PathVariable Integer homeId){

        uRepo.deleteHomeById(homeId);

        return ControllerUtil.ok(Json.createObjectBuilder().add("deletedId",homeId));
    }

    @PostMapping(path="/save")
    public ResponseEntity<String>insertSaving(@RequestBody String payload){
        UserSaving us=PredictionUtil.stringToUserSaving(payload);
        Integer id=uRepo.insertUserSaving(us);

        return ControllerUtil.ok(Json.createObjectBuilder().add("saveId",id).build());
    }

    @GetMapping(path="/save/{userId}")
    public ResponseEntity<String>getTotalSaving(@PathVariable String userId){
        UserSavingTotal ust=uRepo.getTotalSaving(userId);
        JsonObject jo=PredictionUtil.totalToJson(ust);


        return ControllerUtil.ok(jo);
    }

    @GetMapping(path="/save/get/{userId}")
    public ResponseEntity<String>getSavingForChart(@PathVariable String userId){
        List<UserSaving> usl=uRepo.getUserSaving(userId);

        JsonArrayBuilder ja=Json.createArrayBuilder();

        for(UserSaving us:usl){
            JsonObject o= PredictionUtil.savingToJson(us);
            ja.add(o);
        }
        
        return ControllerUtil.ok(ja.build().toString());
    }





    
}
