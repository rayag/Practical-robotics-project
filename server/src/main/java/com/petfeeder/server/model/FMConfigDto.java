package com.petfeeder.server.model;

import lombok.Data;

@Data
public class FMConfigDto {
    /**
     * The time between feeding
     */
    private long sleepTime;
}
