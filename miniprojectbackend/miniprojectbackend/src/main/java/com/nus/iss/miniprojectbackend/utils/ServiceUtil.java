package com.nus.iss.miniprojectbackend.utils;

import java.util.UUID;

public class ServiceUtil {
    
    public static String generateUUID() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

    public static String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte hashByte : bytes) {
            int intVal = 0xff & hashByte;
            if (intVal < 0x10) {
                sb.append('0');
            }
            sb.append(Integer.toHexString(intVal));
        }
        return sb.toString();
    }
}
