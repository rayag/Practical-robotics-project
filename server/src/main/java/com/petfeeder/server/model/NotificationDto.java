package com.petfeeder.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NotificationDto {
    private String title;
    private String content;
    private String target;
}
