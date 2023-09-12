package com.nus.iss.miniprojectbackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.nus.iss.miniprojectbackend.models.UserAccount;
import com.nus.iss.miniprojectbackend.models.Users;
import com.nus.iss.miniprojectbackend.repositories.UserRepository;





@Service
public class AuthService {
    
    @Autowired
    private UserRepository uRepo;

    public Users createNewUser(UserAccount acc) {
        acc.setPassword(new BCryptPasswordEncoder().encode(acc.getPassword()));
        uRepo.save(acc);
        
        return new Users(
            acc.getId(),
            acc.getName(),
            acc.getPhone(),
            acc.getEmail(),
            acc.getRole()
        );
    }
    
    public void changePassword(String userId, String newPassword) {
        uRepo.changePassword(userId, new BCryptPasswordEncoder().encode(newPassword));
    }
}
