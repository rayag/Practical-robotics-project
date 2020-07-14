package com.petfeeder.server.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.petfeeder.server.model.NotificationDto;

public class FCMService {
    public String sendPushNotification(NotificationDto notificationDto) {
        Message message = Message.builder()
                .setToken(notificationDto.getTarget())
                .setNotification(new Notification(notificationDto.getTitle(),
                        notificationDto.getContent()))
                .putData("content", notificationDto.getTitle())
                .putData("body", notificationDto.getContent()).build();

        String response = null;
        try {
            response = FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException e) {
            System.out.println(e);
        }

        return response;
    }
}
