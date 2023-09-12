package com.nus.iss.miniprojectbackend.services.jwt;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nus.iss.miniprojectbackend.models.UserAccount;
import com.nus.iss.miniprojectbackend.repositories.UserRepository;



@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository shopRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAccount user = shopRepo.findFirstById(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found.");
        }
        return new User(user.getId(), user.getPassword(), new ArrayList<>());
    }
    
}
