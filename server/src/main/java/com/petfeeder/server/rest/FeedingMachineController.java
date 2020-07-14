package com.petfeeder.server.rest;

import com.petfeeder.server.dao.FeedingMachinesRepository;
import com.petfeeder.server.model.FMConfigDto;
import com.petfeeder.server.model.FeedingMachine;
import com.petfeeder.server.model.NotificationDto;
import com.petfeeder.server.model.User;
import com.petfeeder.server.service.FCMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
public class FeedingMachineController {
    @Autowired
    private FeedingMachinesRepository fmRepository;

    @Autowired
    private FCMService fcmService;

    @GetMapping("fm/move/{id}")
    public String move(@PathVariable long id) {
        FeedingMachine fm = this.fmRepository.findById(id);
        final String uri = "http://" + fm.getIp() + ":" + fm.getServerPort() + "/move";
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("Move " + id);
        restTemplate.getForObject(uri, String.class);
        return "ok";
    }

    @GetMapping("fm/config/{mac}")
    public FMConfigDto getConfigurations(@PathVariable String mac) {
        FeedingMachine fm = fmRepository.findByMac(mac);
        if (fm != null) {
            FMConfigDto response = new FMConfigDto();
            response.setSleepTime(fm.getSleepTime());
            return response;
        }

        return null;
    }

    @PostMapping("fm/update")
    public FeedingMachine updateFeedingMachine(@RequestBody FeedingMachine newFm) {
        FeedingMachine fm = this.fmRepository.findById(newFm.getId());
        fm.setName(newFm.getName());
        fm.setIp(newFm.getIp());
        if (newFm.getSleepTime() != fm.getSleepTime()
                || newFm.getIntervalType() != fm.getIntervalType()) {
            newFm.setSleepTime(newFm.calcSleepTime());
            sendConfigurations(newFm);
        }
        this.fmRepository.save(fm);
        return fm;
    }

    private void sendConfigurations(FeedingMachine fm) {
        final String uri = "http://" + fm.getIp() + ":" + fm.getServerPort() + "/setSleepTime";
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForObject(uri, fm, String.class);
    }

    /**
     * Deletes a feeding machine
     * @param id the id of the feeding machine
     */
    @DeleteMapping("/fm/{id}")
    public FeedingMachine deleteFeedingMachine(@PathVariable String id) {
        return this.fmRepository.deleteById(Integer.parseInt(id));
    }

    @PostMapping("/fm/empty/{mac}")
    public void emptyFeeder(@PathVariable String mac) {
        FeedingMachine fm = fmRepository.findByMac(mac);
        System.out.println(fm.getOwner().getFBToken());
        NotificationDto notification = new NotificationDto("Refill needed",
            "You need to refill " + fm.getName(), fm.getOwner().getFBToken());
        System.out.println("Notification " + notification.getTitle());
        System.out.println(notification.getContent());
        fcmService.sendPushNotification(notification);
    }
}
