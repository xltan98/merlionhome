package com.nus.iss.miniprojectbackend.controller;



import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.services.kms.model.DisabledException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nus.iss.miniprojectbackend.models.AuthenticationRequest;
import com.nus.iss.miniprojectbackend.models.AuthenticationResponse;
import com.nus.iss.miniprojectbackend.models.SendGridEmail;
import com.nus.iss.miniprojectbackend.models.UserAccount;
import com.nus.iss.miniprojectbackend.models.Users;
import com.nus.iss.miniprojectbackend.services.AuthService;
import com.nus.iss.miniprojectbackend.services.EmailService;
import com.nus.iss.miniprojectbackend.services.jwt.UserDetailsServiceImpl;
import com.nus.iss.miniprojectbackend.utils.JwtUtil;

import static com.nus.iss.miniprojectbackend.utils.ControllerUtil.*;
import jakarta.json.Json;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;



@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService svc;

    @Autowired
    private AuthenticationManager authMgr;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private EmailService mailSvc;

    @Autowired
    private JwtUtil jwtUtil;

    private ObjectMapper objMapper = new ObjectMapper();

    @PostMapping("/signup")
    public ResponseEntity<String> createNewUser(@RequestBody UserAccount acc) throws IOException {
        // receive username, email, role, password
        // return success
        Users s = svc.createNewUser(acc);
        SendGridEmail email = new SendGridEmail();
        email.setName(acc.getName());
        email.setRecipient(acc.getEmail());
      

        mailSvc.sendEmail(email);

        if (s == null) {
            return badRequest("User creation unsuccessful.");
        }
        try {
            return created(objMapper.writeValueAsString(s));
        } catch (JsonProcessingException e) {
            return internalServerError("Error producing json.");
        }
    }

    @PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authReq,
            HttpServletResponse response)
            throws BadCredentialsException, DisabledException, UsernameNotFoundException, IOException {
        try {
            authMgr.authenticate(new UsernamePasswordAuthenticationToken(authReq.getId(), authReq.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password.");
        } catch (DisabledException e) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User does not exist.");
            return null;
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authReq.getId());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());
        return new AuthenticationResponse(jwt,userDetails.getUsername());
    }


    @PatchMapping(path = "/change-password", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateShopPassword(@RequestBody Map<String, String> payload)
            throws BadCredentialsException, DisabledException, UsernameNotFoundException, IOException {
        try {
            authMgr.authenticate(
                    new UsernamePasswordAuthenticationToken(payload.get("userId"), payload.get("oldPassword")));
        } catch (BadCredentialsException e) {
            return badRequest("Old password is incorrect.");
        } catch (DisabledException e) {
            return badRequest("User does not exist.");
        }

        svc.changePassword(payload.get("userId"), payload.get("newPassword"));

        return ok(Json.createObjectBuilder().add("status", "success"));
    }

    // @PostMapping("/logout")
    // public ResponseEntity<String> logoutShop() {
    //     // clear JWT
    //     return ok("{}");
    // }

    @GetMapping("/validate-login")
    public ResponseEntity<String> validateLogin(HttpServletRequest request) {
        return ok(Json.createObjectBuilder()
                .add("isLoggedIn", true)
                .add("userId", jwtUtil.extractUsername(request)));
    }

    // @GetMapping("/info")
    // public ResponseEntity<String>getRole(@PathVariable String userId){
        
    //     return 
    // }
}
