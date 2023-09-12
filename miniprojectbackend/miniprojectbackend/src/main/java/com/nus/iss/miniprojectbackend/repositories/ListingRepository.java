package com.nus.iss.miniprojectbackend.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.core.query.TextQuery;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.nus.iss.miniprojectbackend.exceptions.UserException;
import com.nus.iss.miniprojectbackend.models.Listing;
import com.nus.iss.miniprojectbackend.models.ListingAppointment;
import com.nus.iss.miniprojectbackend.models.UserSaving;
import com.nus.iss.miniprojectbackend.models.Users;
import com.nus.iss.miniprojectbackend.models.UsersGoal;
import static com.nus.iss.miniprojectbackend.repositories.DBQueries.*;

@Repository
public class ListingRepository {

    @Autowired
    MongoTemplate template;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String postUpload(Listing l){

        Document d = new Document()
        .append("uploadId",l.getUploadId())
        .append("userId",l.getUserId())
        .append("address",l.getAddress())
        .append("postalCode",l.getPostalCode())
        .append("flatType",l.getFlatType())
        .append("floorAreaSqm",l.getFloorAreaSqm())
        .append("images",l.getImages())
        .append("remainingLeaseYear",l.getRemainingLeaseYear())
        .append("storey",l.getStorey())
        .append("price",l.getPrice())
        .append("description",l.getDescription());

        template.insert(d,"listing");

        return l.getUploadId();
    }

    public List<Document> getAllListings(int offset, int limit) {
        Criteria c = new Criteria();
    
        Query query = Query.query(c);
        query.with(Sort.by(Sort.Direction.ASC, "price")); 
        query.skip(offset); 
        query.limit(limit);
        List<Document> result = template.find(query, Document.class, "listing");
    
        return result;
    }

    public List<Document> getSearchedListings(String searchText) {
      
        TextCriteria textCriteria = TextCriteria.forDefaultLanguage().matchingAny(searchText);
    
        
        TextQuery textQuery = TextQuery.queryText(textCriteria)
                .sortByScore();
    
        
        List<Document> result = template.find(textQuery, Document.class, "listing");
    
        return result;
    }

    public Document getListingById(String uploadId){
        Criteria c = Criteria.where("uploadId").is(uploadId);

        Query query = Query.query(c);

        List<Document> result = template.find(query,Document.class,"listing");

        return result.get(0);

    }

      public List<Document> getListingByAgentId(String agentId){
        Criteria c = Criteria.where("userId").is(agentId);

        Query query = Query.query(c);

        List<Document> result = template.find(query,Document.class,"listing");

        return result;

    }

    public void deleteListingById(String uploadId) {
        Criteria c = Criteria.where("uploadId").is(uploadId);
    
        Query query = Query.query(c);
    
        template.remove(query, "listing");
    }
    

    public Integer insertUserAppointment(ListingAppointment la){

         KeyHolder generatedKeyHolder = new GeneratedKeyHolder();

          PreparedStatementCreator psc = new PreparedStatementCreator(){

            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
               PreparedStatement ps=con.prepareStatement(SQL_INSERT_LISTING_APPOINTMENT,new String[]{"appointment_id"});
               ps.setString(1,la.getAgentId());
               ps.setString(2,la.getCustomerId());
               ps.setString(3, la.getAddress());
               ps.setString(4, la.getDate());
               ps.setString(5, la.getTime());
                ps.setString(6, la.getStatus());
               ps.setString(7,la.getUploadId());
             
               return ps;
            }};

            jdbcTemplate.update(psc,generatedKeyHolder);
            Integer iReturnValue = generatedKeyHolder.getKey().intValue();
        return iReturnValue;
        
    }

    public List<ListingAppointment> retrieveListingAppointment(String customerId){
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_USER_GET_APPOINTMENT, customerId);
        List<ListingAppointment> lal= new ArrayList<>();
        
       while(rs.next()){
            ListingAppointment la = new ListingAppointment();
            la.setAppointmentId(rs.getInt("appointment_id"));
            la.setAgentId(rs.getString("agent_id"));
            la.setCustomerId(customerId);
            la.setAddress(rs.getString("address"));
            la.setDate(rs.getString("date"));
            la.setTime(rs.getString("time"));
            la.setStatus(rs.getString("status"));
            la.setUploadId(rs.getString("upload_id"));
            

            lal.add(la);
        }

        return lal;
    }

       public List<ListingAppointment> retrieveListingAppointmentAgent(String agentId){
        SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_USER_GET_APPOINTMENT_AGENT, agentId);
        List<ListingAppointment> lal= new ArrayList<>();
        
       while(rs.next()){
            ListingAppointment la = new ListingAppointment();
            la.setAppointmentId(rs.getInt("appointment_id"));
            la.setAgentId(agentId);
            la.setCustomerId(rs.getString("customer_id"));
            la.setAddress(rs.getString("address"));
            la.setDate(rs.getString("date"));
            la.setTime(rs.getString("time"));
            la.setStatus(rs.getString("status"));
            la.setUploadId(rs.getString("upload_id"));
            

            lal.add(la);
        }

        return lal;
    }

    public void deleteAppointmentById(Integer appointmentId){
        jdbcTemplate.update(SQL_DELETE_APPOINTMENT_BY_ID,appointmentId);

    }

    public void updateAppointmentStatus(Integer appointmentId, String newStatus) {
        
        jdbcTemplate.update(SQL_UPDATE_APPOINTMENT_STATUS, newStatus, appointmentId);
    }
    
}


