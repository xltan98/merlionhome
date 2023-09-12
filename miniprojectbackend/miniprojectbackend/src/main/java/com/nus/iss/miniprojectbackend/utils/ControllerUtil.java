package com.nus.iss.miniprojectbackend.utils;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import com.nus.iss.miniprojectbackend.models.Jsonable;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;


public class ControllerUtil {

    public static ResponseEntity<String> ok(String body) {
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(body);
    }

    public static ResponseEntity<String> ok(JsonObject body) {
        return ok(body.toString());
    }

    public static ResponseEntity<String> ok(JsonObjectBuilder body) {
        return ok(body.build());
    }

    public static ResponseEntity<String> created(String body) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(body);
    }

    public static ResponseEntity<String> created(JsonObjectBuilder body) {
        return created(body.build().toString());
    }

    public static ResponseEntity<String> notFound(String message) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(generateJsonMsgString("message", message));
    }

    public static ResponseEntity<String> internalServerError(String message) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentType(MediaType.APPLICATION_JSON)
                .body(generateJsonMsgString("message", message));
    }

    public static ResponseEntity<String> badRequest(String message) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(generateJsonMsgString("message", message));
    }

    public static ResponseEntity<String> forbidden(String message) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .contentType(MediaType.APPLICATION_JSON)
                .body(generateJsonMsgString("message", message));
    }

    public static <T extends Jsonable> JsonArrayBuilder generateJsonArray(List<T> array) {
        JsonArrayBuilder ab = Json.createArrayBuilder();
        array.forEach(a -> ab.add(a.toJson()));
        return ab;
    }

    public static String generateJsonMsgString(String key, String value) {
        return Json.createObjectBuilder()
                .add(key, value)
                .build().toString();
    }

    public static <T> boolean hasResults(List<T> result) {
        if (result == null || result.size() == 0) {
            return false;
        }
        return true;
    }

    public static <T> boolean hasResult(T result) {
        if (result == null) {
            return false;
        }
        return true;
    }
}
