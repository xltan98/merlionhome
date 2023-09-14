package com.nus.iss.miniprojectbackend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Repository;

import com.nus.iss.miniprojectbackend.exceptions.UserException;
import com.nus.iss.miniprojectbackend.models.UserAccount;
import com.nus.iss.miniprojectbackend.models.UserSaving;
import com.nus.iss.miniprojectbackend.models.UserSavingTotal;
import com.nus.iss.miniprojectbackend.models.Users;
import com.nus.iss.miniprojectbackend.models.UsersGoal;

import static com.nus.iss.miniprojectbackend.repositories.DBQueries.*;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Users getUserDetails(String userId) throws UserException {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_USER_GET_DETAILS, userId.toLowerCase());

        if (rs.next()) {
            Users s = new Users(
                    rs.getString("id"),
                    rs.getString("name"),
                    rs.getString("phone"),
                    rs.getString("email"),
                    rs.getString("role"));
            return s;
        }

        throw new UserException("No such user found!");
    }

    public void updateUserDetails(Users s) throws UserException {
        try {
            jdbcTemplate.update(SQL_USER_UPDATE_DETAILS, s.getName(), s.getPhone(), s.getEmail(),
                    s.getId());
        } catch (DataAccessException e) {
            throw new UserException(e.getMessage());
        }
    }

    public boolean isValidUser(String userId) {
        try {
            if (getUserDetails(userId) != null) {
                return true;
            } else {
                return false;
            }
        } catch (UserException e) {
            return false;
        }
    }

    public void save(UserAccount acc) {
        jdbcTemplate.update(SQL_INSERT_USER, acc.getId(), acc.getName(), acc.getPhone(), acc.getEmail(),
                 acc.getPassword(),acc.getRole());
    }

    public void changePassword(String userId, String newPassword) {
        jdbcTemplate.update(SQL_USER_CHANGE_PASSWORD, newPassword, userId);
    }

    public UserAccount findFirstById(String username) {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_USER_GET_DETAILS, username.toLowerCase());

        if (rs.next()) {
            return new UserAccount(
                    rs.getString("id"),
                    rs.getString("name"),
                    rs.getString("phone"),
                    rs.getString("email"),
                    rs.getString("password"),
                    rs.getString("role"));
        }
        return null;
    }
  
    public Integer insertUserGoal(UsersGoal g){

         KeyHolder generatedKeyHolder = new GeneratedKeyHolder();

          PreparedStatementCreator psc = new PreparedStatementCreator(){

            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
               PreparedStatement ps=con.prepareStatement(SQL_INSERT_IDEAL_HOME,new String[]{"id"});
               ps.setString(1,g.getUserId());
               ps.setInt(2,g.getYear());
               ps.setString(3, g.getTown());
               ps.setString(4, g.getFlatType());
               ps.setString(5, g.getStoreyRange());
               ps.setInt(6,g.getFloorAreaSqm());
               ps.setString(7, g.getFlatModel());
               ps.setInt(8,g.getRemainingLeaseYear());
               ps.setDouble(9, g.getPredictedValue());
               return ps;
            }};

            jdbcTemplate.update(psc,generatedKeyHolder);
            Integer iReturnValue = generatedKeyHolder.getKey().intValue();
        return iReturnValue;
        
    }

    public List<UsersGoal> findHomeById(String userId){
        List<UsersGoal> ugl= new ArrayList<>();

        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_FIND_HOME_BY_ID,userId);
        
        while(rs.next()){
            UsersGoal ug = new UsersGoal();
            ug.setId(rs.getInt("id"));
            ug.setUserId(rs.getString("user_id"));
            ug.setYear(rs.getInt("year"));
            ug.setTown(rs.getString("town"));
            ug.setFlatType(rs.getString("flat_type"));
            ug.setStoreyRange(rs.getString("storey_range"));
            ug.setFloorAreaSqm(rs.getInt("floor_area_sqm"));
            ug.setFlatModel(rs.getString("flat_model"));
            ug.setRemainingLeaseYear(rs.getInt("remaining_lease"));
            ug.setPredictedValue(rs.getDouble("predicted_value"));

            ugl.add(ug);
        }

        return ugl;
    }

    public void deleteHomeById(Integer homeId){
        jdbcTemplate.update(SQL_DELETE_IDEAL_HOME_BY_ID,homeId);

    }

     public Integer insertUserSaving(UserSaving us){

         KeyHolder generatedKeyHolder = new GeneratedKeyHolder();

          PreparedStatementCreator psc = new PreparedStatementCreator(){

            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
               PreparedStatement ps=con.prepareStatement(SQL_INSERT_SAVING,new String[]{"id"});
               ps.setString(1,us.getUserId());
               ps.setString(2,us.getSaveDate());
               ps.setDouble(3, us.getSaving());
              
               return ps;
            }};

            jdbcTemplate.update(psc,generatedKeyHolder);
            Integer iReturnValue = generatedKeyHolder.getKey().intValue();
        return iReturnValue;
        
    }


    public UserSavingTotal getTotalSaving(String userId){
          SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_GET_TOTAL_SAVING, userId);

        if (rs.next()) {
            UserSavingTotal ust= new UserSavingTotal(
                rs.getString("user_id"),
                rs.getDouble("total_savings")
            );

            return ust;
            
        }

        return null;

    }

    public List<UserSaving> getUserSaving(String userId){
        List<UserSaving> usl=new ArrayList<>();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_FIND_SAVING_ID,userId);

        while(rs.next()){
            UserSaving us = new UserSaving();
            us.setUserId(rs.getString("user_id"));
            us.setSaveDate(rs.getString("save_date"));
            us.setSaving(rs.getDouble("saving"));

            usl.add(us);
        }

        return usl;
    }


   


    
}
