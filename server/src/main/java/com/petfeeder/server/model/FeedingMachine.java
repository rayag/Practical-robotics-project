package com.petfeeder.server.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties("owner")
public class FeedingMachine {
    public enum IntervalType { MINS, HOURS, DAYS };

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fm_id")
    private long id;

    private String name;

    private String ip = "87.246.8.12";

    private String photoPath = "assets/img/dog.jpeg";

    @Column(unique = true)
    private String mac = "";

    private long sleepTime;

    private IntervalType intervalType = IntervalType.MINS;

    private String videoPort = "8000";

    private String serverPort = "8001";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    public void setOwner(User owner) {
        this.owner = owner;
        owner.getFeedingMachines().add(this);
    }

    public long calcSleepTime() {
        switch (this.intervalType) {
            case MINS: return sleepTime * 60;
            case HOURS: return sleepTime * 3600;
            case DAYS: return sleepTime * 3600 * 24;
            default: return 0;
        }
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public User getOwner() {
        return owner;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac;
    }

    public long getSleepTime() {
        return sleepTime;
    }

    public void setSleepTime(long sleepTime) {
        this.sleepTime = sleepTime;
    }

    public String getServerPort() {
        return serverPort;
    }

    public void setServerPort(String serverPort) {
        this.serverPort = serverPort;
    }

    public String getVideoPort() {
        return videoPort;
    }

    public void setVideoPort(String videoPort) {
        this.videoPort = videoPort;
    }

    public IntervalType getIntervalType() {
        return intervalType;
    }

    //public void setIntervalType(int intervalType) {
   //     this.intervalType = IntervalType.values()[intervalType];
    //}

    public void setIntervalType(IntervalType intervalType) {
        this.intervalType = intervalType;
    }
}
