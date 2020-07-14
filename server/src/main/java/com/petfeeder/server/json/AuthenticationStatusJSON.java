package com.petfeeder.server.json;

public class AuthenticationStatusJSON {
    public enum Status {
        OK,
        wrong_pass,
        missing
    };
    public Status authentacated;
}
