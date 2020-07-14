package com.petfeeder.server.dao;

import com.petfeeder.server.model.FeedingMachine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedingMachinesRepository extends JpaRepository<FeedingMachine, Long> {
    FeedingMachine findById(long id);

    FeedingMachine findByMac(String mac);

    FeedingMachine deleteById(long id);
}
