package com.nus.iss.miniprojectbackend.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.nus.iss.miniprojectbackend.models.SendGridEmail;
import com.nus.iss.miniprojectbackend.repositories.EmailRepository;


@Service
public class EmailService {
    @Autowired 
    EmailRepository eRepo;

    public String sendEmail(SendGridEmail email) throws IOException {

        System.out.println(">>> Sent Verification Email");

        String verifyEmail = eRepo.sendEmail(email);
        
        return verifyEmail;

        
        
    }
    
    
}
