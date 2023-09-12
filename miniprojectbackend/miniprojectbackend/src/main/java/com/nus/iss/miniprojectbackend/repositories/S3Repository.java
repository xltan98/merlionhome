package com.nus.iss.miniprojectbackend.repositories;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;

@Repository
public class S3Repository {
    @Autowired
    private AmazonS3 s3;

    public String saveImage(MultipartFile uploadFile){
        Map<String,String>userData= new HashMap<>();
        userData.put("filename",uploadFile.getOriginalFilename());

        ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentType(uploadFile.getContentType());
		metadata.setContentLength(uploadFile.getSize());
		metadata.setUserMetadata(userData);

        String id= UUID.randomUUID().toString().substring(0, 8);

        try {
			PutObjectRequest putReq = new PutObjectRequest("xinlitan98"
					, "image/%s".formatted(id)
					, uploadFile.getInputStream(), metadata);
			
			putReq = putReq.withCannedAcl(CannedAccessControlList.PublicRead);
			PutObjectResult result = s3.putObject(putReq);
			//System.out.printf(">>>> result: %s\n", result);
		} catch (IOException ex) {
			ex.printStackTrace();
		}
		return id;
    }
    
}
