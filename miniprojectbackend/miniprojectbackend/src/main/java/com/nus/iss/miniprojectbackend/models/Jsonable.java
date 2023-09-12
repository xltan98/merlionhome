package com.nus.iss.miniprojectbackend.models;

import jakarta.json.JsonObject;

public interface Jsonable {
    public JsonObject toJson();
}
